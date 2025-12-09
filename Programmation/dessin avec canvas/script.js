const monCanevas = document.getElementById('echoCanvas');
const ctx = monCanevas.getContext('2d');

function dessinerCercle(x, y, rayon, couleur, alpha = 1) {
    ctx.beginPath();
    ctx.arc(x, y, rayon, 0, 2 * Math.PI);
    ctx.fillStyle = couleur;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
}

function dessinerEcho(
    x = monCanevas.width / 2, y = monCanevas.height / 2, maxRayon, nbCercles) {
    let ecart = maxRayon / nbCercles;
    for (let i = 0; i < nbCercles; i++) {
        let rayonActuel = maxRayon - i * ecart;
        let alpha = i / nbCercles;
        dessinerCercle(x, y, rayonActuel, '#00CCFF', alpha);
    }
}

dessinerEcho(monCanevas.width / 2, monCanevas.height / 2, 200, 8);

function lancerAnimation() {
    ctx.clearRect(0, 0, monCanevas.width, monCanevas.height);
    const intensite = document.getElementById('vibrationSelector').value;
    dessinerEcho(monCanevas.width / 2, monCanevas.height / 2, intensite, 8);
}