function AgrandirImage() {
  const img = document.getElementById("logo");
  if (!img) return;

  const currentWidth = img.clientWidth;
  const currentHeight = img.clientHeight;

  const maxwidth = 1200
  const maxHeight = 1200


  if (currentWidth >= maxwidth || currentHeight >= maxHeight) {
    alert("Taille maximale atteinte");
    return;
  }

  const newWidth = Math.min(currentWidth * 1.1, maxwidth);
  const newHeight = Math.min(currentHeight * 1.1, maxHeight);

  img.style.width = newWidth + "px";
  img.style.height = newHeight + "px";
}
function RéduireImage() {
  const img = document.getElementById("logo");
  if (!img) return; 
    const currentWidth = img.clientWidth;
    const currentHeight = img.clientHeight;

    const minWidth = 50;
    const minHeight = 50;

    if (currentWidth <= minWidth || currentHeight <= minHeight) {
        alert("Taille minimale atteinte");
        return;
    }

    const newWidth = currentWidth *0.9;
    const newHeight = currentHeight *0.9;
    img.style.width = newWidth + "px";
    img.style.height = newHeight + "px";
}
function RéinitialiserImage() {
  const img = document.getElementById("logo");
  if (!img) return;
  img.style.width = "300px";
  img.style.height = "300px";
}
