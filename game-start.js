// ==========================
// INICIALIZAÇÃO / LOGIN
// ==========================

// Garante que só entra quem estiver logado
window.addEventListener("DOMContentLoaded", function () {
    const jogador = localStorage.getItem("usuarioLogadoFarm");
    if (!jogador) {
        window.location.href = "index.html";
        return;
    }

    // Inicializa referências do game
    Game.init();
});

// Função global para o botão "Iniciar Jogo"
function iniciarJogo() {
    Game.iniciarJogo();
}
