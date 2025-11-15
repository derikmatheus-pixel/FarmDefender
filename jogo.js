let jogador = localStorage.getItem("usuarioLogadoFarm");
let pontos = 0;
let vidas = 3;
let spawnInterval = null;

if (!jogador) {
    window.location.href = "index.html";
}

const hudPontos = document.getElementById("hudPontos");
const hudVidas = document.getElementById("hudVidas");
const cenario = document.getElementById("cenario");

function mostrarHUD() {
    hudPontos.innerText = "Pontos: " + pontos;
    hudVidas.innerText = "Vidas: " + vidas;
}

function spawnCorvo() {
    if (!rodando) return;

    const cenario = document.getElementById("cenario");

    const corvo = document.createElement("img");
    corvo.src = "corvo.png";
    corvo.classList.add("corvo");

    corvo.style.position = "absolute";
    corvo.style.width = "60px"; // <<< TAMANHO CONTROLADO
    corvo.style.height = "auto";

    corvo.style.left = Math.random() * (cenario.clientWidth - 60) + "px";
    corvo.style.top = "-70px";

    corvo.onclick = () => {
        matarCorvo(corvo);
    };

    cenario.appendChild(corvo);
    corvos.push(corvo);
}

function perderVida() {
    vidas--;
    mostrarHUD();
    if (vidas <= 0) {
        finalizarJogo();
    }
}

function iniciarJogo() {
    pontos = 0;
    vidas = 3;
    mostrarHUD();

    if (spawnInterval) {
        clearInterval(spawnInterval);
    }
    spawnInterval = setInterval(spawnCriatura, 1000);
}

function finalizarJogo() {
    if (spawnInterval) {
        clearInterval(spawnInterval);
        spawnInterval = null;
    }

    salvarPontuacao(jogador, pontos);

    setTimeout(function () {
        window.location.href = "ranking.html";
    }, 800);
}

function sairJogo() {
    window.location.href = "menu.html";
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarHUD();
    iniciarJogo();
});

