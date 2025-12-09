const toggleBtn = document.getElementById('toggle-theme-btn');
const body = document.querySelector('body');

console.log('toggleBtn :', toggleBtn);
console.log('body :', body);

toggleBtn.addEventListener('click', function() {
    console.log('Bouton cliqué');

    body.classList.toggle('dark-theme');
    console.log('changement de thème');
    
    if (body.classList.contains('dark-theme')) {
        toggleBtn.textContent = 'Activer le Mode clair';
        console.log('Il va faire tout noir !');
    } else {
        toggleBtn.textContent = 'Activer le Mode sombre';
        console.log('ta gueule il fait clair');
    }
});
