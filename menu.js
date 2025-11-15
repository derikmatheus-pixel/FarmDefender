document.addEventListener("DOMContentLoaded", function () {
    const jogador = localStorage.getItem("usuarioLogadoFarm");

    if (!jogador) {
        window.location.href = "index.html";
        return;
    }

    const nomeJogador = document.getElementById("nomeJogador");
    nomeJogador.textContent = jogador;
});

function jogar() {
    window.location.href = "jogo.html";
}

function ranking() {
    window.location.href = "ranking.html";
}

function sair() {
    localStorage.removeItem("usuarioLogadoFarm");
    window.location.href = "index.html";
}
