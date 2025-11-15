let jogador = localStorage.getItem("usuarioLogadoFarm");
if (!jogador) window.location.href = "index.html";

let pontos = 0;
let vidas = 3;
let rodando = true;

let corvos = [];
let fazendeiro = null;
let spawnInterval = null;

function perderVida() {
    vidas--;
    atualizarHUD();

    if (vidas <= 0) finalizarJogo();
}

function finalizarJogo() {
    rodando = false;

    clearInterval(spawnInterval);

    corvos.forEach(c => c.remove());
    corvos = [];

    salvarPontuacao(jogador, pontos)
        .finally(() => window.location.href = "ranking.html");
}
