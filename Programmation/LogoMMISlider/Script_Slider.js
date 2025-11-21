const slider = document.getElementById("slider");
const img = document.getElementById("logo");
const pourcentage = document.getElementById("pourcentage");

const tailleInitiale = 300;
const minSize = 80;
const maxSize = 1000;

slider.addEventListener("input", () => {
  const nouvelleTaille = parseInt(slider.value);

  if (nouvelleTaille > maxSize) {
    alert("Taille maximale atteinte.");
    slider.value = maxSize;
    return;
  }

  if (nouvelleTaille < minSize) {
    alert("Taille minimale atteinte.");
    slider.value = minSize;
    return;
  }

  img.style.width = nouvelleTaille + "px";
  img.style.height = nouvelleTaille + "px";

  const ratio = Math.round((nouvelleTaille / tailleInitiale) * 100);
  pourcentage.textContent = ratio + "%";
} );
