// game-core.js

// Verifica se há jogador logado
let jogador = localStorage.getItem("usuarioLogadoFarm");
if (!jogador) {
    window.location.href = "index.html";
}

// Estado global do jogo
let pontos = 0;
let vidas = 3;
let rodando = true;

// Objetos globais
let corvos = [];        // <<< ÚNICO array de corvos, usado por todos os arquivos
let fazendeiro = null;
let spawnInterval = null;

// Perde uma vida
function perderVida() {
    if (!rodando) return;

    vidas--;
    atualizarHUD();

    if (vidas <= 0) {
        finalizarJogo();
    }
}

// Finaliza o jogo
function finalizarJogo() {
    rodando = false;

    // Para o spawn dos corvos
    if (spawnInterval) {
        clearInterval(spawnInterval);
        spawnInterval = null;
    }

    // Remove todos os corvos da tela
    corvos.forEach(c => c.remove());
    corvos = [];

    // Salva pontuação e vai para o ranking
    // (usa a função que você já tem no firebase.js)
    salvarPontuacao(jogador, pontos)
        .finally(() => {
            window.location.href = "ranking.html";
        });
}
