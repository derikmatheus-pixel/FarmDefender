// Verifica login
const jogador = localStorage.getItem("usuarioLogadoFarm");
if (!jogador) {
    window.location.href = "index.html";
}

// Exibe o nome do jogador
document.getElementById("menuJogador").innerText = jogador;

// botoes
document.getElementById("jogar").onclick = () => {
    window.location.href = "jogo.html";
}

document.getElementById("ranking").onclick = () => {
    window.location.href = "ranking.html";
}

document.getElementById("sair").onclick = () => {
    localStorage.removeItem("usuarioLogadoFarm");
    window.location.href = "index.html";
}
