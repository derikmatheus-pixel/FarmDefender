// game-start.js

function loop() {
    if (!rodando) return;

    moverCorvos();      // movimento dos inimigos
    animarCorvos();     // animação dos frames

    requestAnimationFrame(loop);
}

function iniciarJogo() {
    atualizarHUD();
    criarFazendeiro();

    // cria um corvo a cada 1,2s
    spawnInterval = setInterval(spawnCorvo, 1200);

    loop();
}

// Inicia assim que a página carregar
document.addEventListener("DOMContentLoaded", iniciarJogo);
