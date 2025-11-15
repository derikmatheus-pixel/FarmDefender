function loop() {
    if (!rodando) return;
    moverCorvos();
    requestAnimationFrame(loop);
}

function iniciarJogo() {
    atualizarHUD();
    criarFazendeiro();

    spawnInterval = setInterval(spawnCorvo, 1200);
    loop();
}

iniciarJogo();
