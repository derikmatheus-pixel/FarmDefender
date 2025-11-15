// game-hud.js

function atualizarHUD() {
    const spanPontos = document.getElementById("hudPontos");
    const spanVidas = document.getElementById("hudVidas");

    if (spanPontos) spanPontos.textContent = "Pontos: " + pontos;
    if (spanVidas) spanVidas.textContent = "Vidas: " + vidas;
}
