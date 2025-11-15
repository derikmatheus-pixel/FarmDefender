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

    // SOMENTE DO MEIO PARA BAIXO
    const minY = cenario.clientHeight * 0.45;
    const maxY = cenario.clientHeight - 60;

    criatura.style.left = Math.random() * maxX + "px";
    criatura.style.top = minY + Math.random() * (maxY - minY) + "px";

    criatura.onclick = () => {
        pontos++;
        mostrarHUD();
        criatura.remove();
    };

    cenario.appendChild(criatura);

    setTimeout(() => {
        if (criatura.parentNode) {
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
    mostrarHUD();

    if (vidas <= 0) {
        finalizarJogo();
    }
}

function finalizarJogo() {
    clearInterval(spawnInterval);
    salvarRanking();
    window.location.href = "ranking.html";
}

function salvarRanking() {
    let lista = JSON.parse(localStorage.getItem("farm_rank")) || [];
    lista.push({ nick: jogador, pontos: pontos });

    lista.sort((a, b) => b.pontos - a.pontos);
    localStorage.setItem("farm_rank", JSON.stringify(lista));
}

document.getElementById("btnLogout").onclick = () => {
    localStorage.removeItem("usuarioLogadoFarm");
    window.location.href = "index.html";
};

iniciarJogo();
