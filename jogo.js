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

function spawnCriatura() {
    const criatura = document.createElement("img");
    criatura.src = "corvo.png";
    criatura.classList.add("criatura");

    const maxX = cenario.clientWidth - 45;
    const minY = cenario.clientHeight * 0.3;
    const maxY = cenario.clientHeight - 60;

    const posX = Math.random() * maxX;
    const posY = Math.random() * (maxY - minY) + minY;

    criatura.style.left = posX + "px";
    criatura.style.top = posY + "px";

    criatura.addEventListener("click", function () {
        pontos += 10;
        mostrarHUD();
        criatura.remove();
    });

    cenario.appendChild(criatura);

    setTimeout(function () {
        if (document.body.contains(criatura)) {
            criatura.remove();
            perderVida();
        }
    }, 1500);
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
