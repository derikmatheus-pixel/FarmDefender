let jogador = localStorage.getItem("usuarioLogadoFarm");
let pontos = 0;
let vidas = 3;
let spawnInterval = null;

if (!jogador) {
    window.location.href = "index.html";
}

function mostrarHUD() {
    document.getElementById("hudPontos").innerText = "Pontos: " + pontos;
    document.getElementById("hudVidas").innerText = "Vidas: " + vidas;
}

function spawnCriatura() {
    const cenario = document.getElementById("cenario");

    const criatura = document.createElement("img");
    criatura.src = "corvo.png";
    criatura.classList.add("criatura");

    const maxX = cenario.clientWidth - 45;
    const minY = cenario.clientHeight * 0.45;
    const maxY = cenario.clientHeight * 0.90;

    criatura.style.left = Math.random() * maxX + "px";
    criatura.style.top = Math.random() * (maxY - minY) + minY + "px";

    let removida = false; // Controle para não duplicar a remoção

    criatura.onclick = () => {
        if (!removida) {
            removida = true;
            pontos++;
            mostrarHUD();
            criatura.remove();
        }
    };

    cenario.appendChild(criatura);

    // Se NÃO clicar → perde vida
    setTimeout(() => {
        if (!removida) {
            removida = true;
            criatura.remove();
            perderVida();
        }
    }, 1200);
}

function iniciarJogo() {
    mostrarHUD();
    spawnInterval = setInterval(spawnCriatura, 900);
}

function perderVida() {
    vidas--;

    if (vidas < 0) vidas = 0;

    mostrarHUD();

    if (vidas === 0) {
        finalizarJogo();
    }
}

function finalizarJogo() {
    clearInterval(spawnInterval);

    // Garante que o Firebase salve antes de trocar de página
    salvarPontuacao(jogador, pontos).then(() => {
        window.location.href = "ranking.html";
    });
}


function salvarRanking() {
    salvarPontuacao(jogador, pontos); // Salva no Firebase
}

document.getElementById("btnLogout").onclick = () => {
    localStorage.removeItem("usuarioLogadoFarm");
    window.location.href = "index.html";
};

iniciarJogo();

