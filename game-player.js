// game-player.js

let player = null;

function criarPlayer() {
    const cenario = document.getElementById("cenario");
    if (!cenario) return;

    // evita duplicar
    if (player && cenario.contains(player)) return;

    player = document.createElement("img");
    player.id = "player";
    player.src = "fazendeiro.png";

    cenario.appendChild(player);

    // centraliza na parte de baixo
    const largura = cenario.clientWidth;
    const altura = cenario.clientHeight;

    const posX = (largura - 40) / 2;
    const posY = altura - 60;

    player.style.left = posX + "px";
    player.style.top = posY + "px";
}
