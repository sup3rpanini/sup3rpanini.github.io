function envoyerFormulaire() {
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Vérification des champs manquants et format d'email
    const missing = [];
    if (!prenom) missing.push('Prénom');
    if (!nom) missing.push('Nom');
    if (!email) missing.push('E-mail');
    if (!message) missing.push('Message');

    if (missing.length) {
        alert('Veuillez remplir : ' + missing.join(', '));
        return;
    }

    // Vérification basique du format d'email
    // Vérifie que l'email respecte le format basique : caractères@caractères.caractères (sans espaces)
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Adresse e‑mail invalide');
        document.getElementById('email').focus();
        return;
    }

    // Simulation d'envoi
    console.log('Formulaire "envoyé" avec les données suivantes :');
    console.log('Prénom:', prenom);
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Sujet:', document.getElementById('sujet').value);
    console.log('Message:', message);

    // Afficher le message de succès
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.add('show');

    // Réinitialiser le formulaire
    document.getElementById('prenom').value = '';
    document.getElementById('nom').value = '';
    document.getElementById('email').value = '';
    document.getElementById('sujet').value = '';
    document.getElementById('message').value = '';

}

// Ajuste uniquement le conteneur de la visite pour qu'il commence sous le header
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    // cible le conteneur principal de la visite (ajuste le sélecteur si nécessaire)
    const visite = document.querySelector('.visite-container') || document.getElementById('scenes-container') || document.querySelector('a-scene');

    if (!header) return;

    const applyOffset = () => {
    const h = header.offsetHeight;
        if (!visite) return;
        visite.style.marginTop = h + 'px';
        // Make the visite container occupy the remaining viewport height
        visite.style.height = `calc(100vh - ${h}px)`;
    // Ensure the a-scene inside fills the container
    const scene = visite.querySelector('a-scene');
    if (scene) {
      scene.style.width = '100%';
      scene.style.height = '100%';
      // also try to set the internal canvas if present
      const canvas = scene.querySelector('canvas.a-canvas');
      if (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
      }
    }
  };

    if (visite) {
        applyOffset();
        window.addEventListener('resize', applyOffset);
    }

    // Génère un bouton "3 barres" et bascule l'affichage du menu mobile
    (function createMobileNavToggle() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        const container = header.querySelector('.container') || header;
        const nav = header.querySelector('nav');
        const ul = nav ? nav.querySelector('.nav-links') : null;
        if (!ul || !container) return;

        // évite de recréer plusieurs fois
        if (container.querySelector('.nav-toggle')) return;

        const btn = document.createElement('button');
        btn.className = 'nav-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Ouvrir le menu');
        btn.setAttribute('aria-expanded', 'false');

        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            span.className = 'bar';
            btn.appendChild(span);
        }

        // place le bouton à l'opposé du logo (fin du container)
        container.appendChild(btn);

        const openMenu = () => { ul.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); };
        const closeMenu = () => { ul.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (ul.classList.contains('open')) closeMenu(); else openMenu();
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target)) closeMenu();
        });

        // Fermer au redimensionnement (desktop)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });

        // Échap pour fermer
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

        // Fermer le menu à la sélection d'un lien (mobile)
        ul.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
    })();

    // Image modal for index page
    (function initImageModal() {
        const modal = document.getElementById('imageModal');
        if (!modal) return;
        const modalImg = modal.querySelector('.modal-img');
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');

        const openModal = (src, alt) => {
            modalImg.src = src;
            modalImg.alt = alt || '';
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };
        const closeModal = () => {
            modal.setAttribute('aria-hidden', 'true');
            modalImg.src = '';
            document.body.style.overflow = '';
        };

        // attach to images with class .zoomable
        document.querySelectorAll('img.zoomable').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => openModal(img.src, img.alt));
        });

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    })();

    // Filtrage des commerçants (commercants.html)
    (function initCommercantsFilters() {
        const filtersContainer = document.querySelector('.filters');
        if (!filtersContainer) return;
        const buttons = Array.from(filtersContainer.querySelectorAll('.filter-btn'));
        const cards = Array.from(document.querySelectorAll('.commercant-card'));

        const applyFilter = (filter) => {
            cards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    if (card.classList.contains(`commercant-${filter}`)) card.classList.remove('hidden');
                    else card.classList.add('hidden');
                }
            });
        };

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = btn.dataset.filter;
                applyFilter(f);
            });
            // keyboard activation
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
            });
        });
    })();

 //fleche 1-1 entrée halles
  const flecheEntity = document.querySelector('a-image#fleche1-1');
  if (flecheEntity) {
    const goTo = () => { window.location.href = './visite3d-2.html'; };
    flecheEntity.addEventListener('click', goTo);
    flecheEntity.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
  }
  



//FLECHE 2-1 entrée a l'intérieur
const flecheEntity2 = document.querySelector('a-image#fleche2-1');
  if (flecheEntity2) {
    const goTo = () => { window.location.href = './visite3d-3.html'; };
    flecheEntity2.addEventListener('click', goTo);
    flecheEntity2.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
  }
  

//FLECHE 3-1 dedans 1
const flecheEntity3 = document.querySelector('a-image#fleche3-1');
  if (flecheEntity3) {
    const goTo = () => { window.location.href = './visite3d-4.html'; };
    flecheEntity3.addEventListener('click', goTo);
    flecheEntity3.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
  }

//FLECHE 4-1 bar vins
const flecheEntity4 = document.querySelector('a-image#fleche4-1');
  if (flecheEntity4) {
    const goTo = () => { window.location.href = './visite3d-5.html'; };
    flecheEntity4.addEventListener('click', goTo);
    flecheEntity4.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
  }

//FLECHE 5-1 bar biltoki
const flecheEntity5 = document.querySelector('a-image#fleche5-1');
  if (flecheEntity5) {
    const goTo = () => { window.location.href = './visite3d-6.html'; };
    flecheEntity5.addEventListener('click', goTo);
    flecheEntity5.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
  }

//FLECHE 6-1 1ere diagonale
const flecheEntity6 = document.querySelector('a-image#fleche6-1');
    if (flecheEntity6) {
        const goTo = () => { window.location.href = './visite3d-7.html'; };
        flecheEntity6.addEventListener('click', goTo);
        flecheEntity6.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//FLECHE 7-1 2e diagonale rp poisson
const flecheEntity7 = document.querySelector('a-image#fleche7-1'); 
    if (flecheEntity7) {
        const goTo = () => { window.location.href = './visite3d-8.html'; };
        flecheEntity7.addEventListener('click', goTo);
        flecheEntity7.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });

    }

//FLECHE 8-1 sortie du fond devant entrée
const flecheEntity8 = document.querySelector('a-image#fleche8-1'); 
    if (flecheEntity8) {
        const goTo = () => { window.location.href = './visite3d-9.html'; };
        flecheEntity8.addEventListener('click', goTo);
        flecheEntity8.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//FLECHE 9-1 boucherie chevaline
const flecheEntity9 = document.querySelector('a-image#fleche9-1'); 
    if (flecheEntity9) {
        const goTo = () => { window.location.href = './visite3d-10.html'; };
        flecheEntity9.addEventListener('click', goTo);
        flecheEntity9.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//FLECHE 10-1 coin boulangerie / tables
const flecheEntity10 = document.querySelector('a-image#fleche10-1'); 
    if (flecheEntity10) {
        const goTo = () => { window.location.href = './visite3d-11.html'; };
        flecheEntity10.addEventListener('click', goTo);
        flecheEntity10.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//FLECHE 11-1 cafés
const flecheEntity11 = document.querySelector('a-image#fleche11-1'); 
    if (flecheEntity11) {
        const goTo = () => { window.location.href = './visite3d-12.html'; };
        flecheEntity11.addEventListener('click', goTo);
        flecheEntity11.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//FLECHE 12-1 les 2 etales vides
const flecheEntity12 = document.querySelector('a-image#fleche12-1'); 
    if (flecheEntity12) {
        const goTo = () => { window.location.href = './visite3d-13.html'; };
        flecheEntity12.addEventListener('click', goTo);
        flecheEntity12.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//FLECHE 13-1 fruit et légumes / etale vide
const flecheEntity13 = document.querySelector('a-image#fleche13-1'); 
    if (flecheEntity13) {
        const goTo = () => { window.location.href = './visite3d-3.html'; };
        flecheEntity13.addEventListener('click', goTo);
        flecheEntity13.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 14-1 fromage a cafés
const flecheEntity22 = document.querySelector('a-image#fleche14-1');
    if (flecheEntity22) {
        const goTo = () => { window.location.href = './visite3d-11.html'; };
        flecheEntity22.addEventListener('click', goTo);
        flecheEntity22.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }



//FLECHES INTERMEDIAIRES

//FLECHE 3-2 de entrée vers jambon
const flecheEntity14 = document.querySelector('a-image#fleche3-2');
  if (flecheEntity14) {
    const goTo = () => { window.location.href = './visite3d-15.html'; };
    flecheEntity14.addEventListener('click', goTo);
    flecheEntity14.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
  }

//fleche 3-3 de entrée vers fruit et légumes / etale vide
const flecheEntity20 = document.querySelector('a-image#fleche3-3');
    if (flecheEntity20) {
        const goTo = () => { window.location.href = './visite3d-13.html'; };
        flecheEntity20.addEventListener('click', goTo);
        flecheEntity20.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });

    }


//FLECHE 9-2 de chevaline a fromage central (gros plan personne)
const flecheEntity15 = document.querySelector('a-image#fleche9-2');
  if (flecheEntity15) {
    const goTo = () => { window.location.href = './visite3d-14.html'; };
    flecheEntity15.addEventListener('click', goTo);
    flecheEntity15.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
  }

//fleche 9-3 de chevaline a sortie du fond
const flecheEntity37 = document.querySelector('a-image#fleche9-3');
    if (flecheEntity37) {
        const goTo = () => { window.location.href = './visite3d-8.html'; };
        flecheEntity37.addEventListener('click', goTo);
        flecheEntity37.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 5-2 de bilkoti a jambon
const flecheEntity16 = document.querySelector('a-image#fleche5-2');
    if (flecheEntity16) {
        const goTo = () => { window.location.href = './visite3d-15.html'; };
        flecheEntity16.addEventListener('click', goTo);
        flecheEntity16.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 11-2 de cafés a fromage central
const flecheEntity21 = document.querySelector('a-image#fleche11-2');
    if (flecheEntity21) {
        const goTo = () => { window.location.href = './visite3d-14.html'; };
        flecheEntity21.addEventListener('click', goTo);
        flecheEntity21.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 14-2 de fromage a chevaline
const flecheEntity23 = document.querySelector('a-image#fleche14-2');
    if (flecheEntity23) {
        const goTo = () => { window.location.href = './visite3d-9.html'; };
        flecheEntity23.addEventListener('click', goTo); 
        flecheEntity23.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 14-3 de fromage a chevaline
const flecheEntity24 = document.querySelector('a-image#fleche14-3');
    if (flecheEntity24) {
        const goTo = () => { window.location.href = './visite3d-15.html'; };
        flecheEntity24.addEventListener('click', goTo); 
        flecheEntity24.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 15-1 de bilkoti a jambon
const flecheEntity17 = document.querySelector('a-image#fleche15-1');
    if (flecheEntity17) {
        const goTo = () => { window.location.href = './visite3d-8.html'; };
        flecheEntity17.addEventListener('click', goTo);
        flecheEntity17.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//F

//fleche 15-2 de jambon à fromage central 
const flecheEntity18 = document.querySelector('a-image#fleche15-2');
    if (flecheEntity18) {
        const goTo = () => { window.location.href = './visite3d-14.html'; };
        flecheEntity18.addEventListener('click', goTo);
        flecheEntity18.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

// mais qu'est ce que c'est que ca?????
const questionEntity = document.querySelector('a-image#question1');
if (questionEntity) {
    const openVideo = () => { window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); };
    questionEntity.addEventListener('click', openVideo);
    questionEntity.addEventListener('touchend', (e) => { e.preventDefault(); openVideo(); }, { passive: false });
    // keyboard activation for accessibility
    questionEntity.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(); }
    });
}

//fleche 15-3 de jambon à entrée à l'intérieur
const flecheEntity19 = document.querySelector('a-image#fleche15-3');
    if (flecheEntity19) {
        const goTo = () => { window.location.href = './visite3d-3.html'; };
        flecheEntity19.addEventListener('click', goTo);
        flecheEntity19.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 13-2 de fruit et légumes à étales vides
const flecheEntity25 = document.querySelector('a-image#fleche13-2');
    if (flecheEntity25) {
        const goTo = () => { window.location.href = './visite3d-12.html'; };
        flecheEntity25.addEventListener('click', goTo);
        flecheEntity25.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 11-3 de cafés à boulangerie + tables
const flecheEntity26 = document.querySelector('a-image#fleche11-3');
    if (flecheEntity26) {
        const goTo = () => { window.location.href = './visite3d-10.html'; };
        flecheEntity26.addEventListener('click', goTo);
        flecheEntity26.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }


//fleche 10-2 de boulangerie + tables à chevaline
const flecheEntity27 = document.querySelector('a-image#fleche10-2');
    if (flecheEntity27) {
        const goTo = () => { window.location.href = './visite3d-9.html'; };
        flecheEntity27.addEventListener('click', goTo);
        flecheEntity27.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 8-2 de sortie du fond a jambon
const flecheEntity28 = document.querySelector('a-image#fleche8-2'); 
    if (flecheEntity28) {
        const goTo = () => { window.location.href = './visite3d-15.html'; };
        flecheEntity28.addEventListener('click', goTo);
        flecheEntity28.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }
    
//fleche 8-3 de sortie du fond a poisson
const flecheEntity29 = document.querySelector('a-image#fleche8-3'); 
    if (flecheEntity29) {
        const goTo = () => { window.location.href = './visite3d-7.html'; };
        flecheEntity29.addEventListener('click', goTo);
        flecheEntity29.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 7-2 de poisson a 1 ere diagonale
const flecheEntity30 = document.querySelector('a-image#fleche7-2'); 
    if (flecheEntity30) {
        const goTo = () => { window.location.href = './visite3d-6.html'; };
        flecheEntity30.addEventListener('click', goTo);
        flecheEntity30.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 6-2 de 1ere diagonale a bilkoti
const flecheEntity31 = document.querySelector('a-image#fleche6-2'); 
    if (flecheEntity31) {
        const goTo = () => { window.location.href = './visite3d-5.html'; };
        flecheEntity31.addEventListener('click', goTo);
        flecheEntity31.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 5-3 de bilkoti a bar a vins
const flecheEntity32 = document.querySelector('a-image#fleche5-3'); 
    if (flecheEntity32) {
        const goTo = () => { window.location.href = './visite3d-4.html'; };
        flecheEntity32.addEventListener('click', goTo);
        flecheEntity32.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 4-2 de bar a vins a dedans 1
const flecheEntity33 = document.querySelector('a-image#fleche4-2');
    if (flecheEntity33) {
        const goTo = () => { window.location.href = './visite3d-3.html'; };
        flecheEntity33.addEventListener('click', goTo);
        flecheEntity33.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 3-4 de dedans 1 à entrée
const flecheEntity34 = document.querySelector('a-image#fleche3-4');
    if (flecheEntity34) {
        const goTo = () => { window.location.href = './visite3d-2.html'; };
        flecheEntity34.addEventListener('click', goTo);
        flecheEntity34.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 2-2 de entrée a entrée halles
const flecheEntity35 = document.querySelector('a-image#fleche2-2');
    if (flecheEntity35) {
        const goTo = () => { window.location.href = './visite3d.html'; };
        flecheEntity35.addEventListener('click', goTo);
        flecheEntity35.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }

//fleche 12-2 de etales vides a cafés
const flecheEntity36 = document.querySelector('a-image#fleche12-2');
    if (flecheEntity36) {
        const goTo = () => { window.location.href = './visite3d-11.html'; };
        flecheEntity36.addEventListener('click', goTo);
        flecheEntity36.addEventListener('touchend', (e) => { e.preventDefault(); goTo(); }, { passive: false });
    }



});
