// game-core.js

let pontos = 0;
let vidas = 3;
let rodando = false;

// loops
let loopMoverCorvos = null;
let loopSpawnCorvos = null;
let loopAnimarCorvos = null;

function iniciarJogo() {
    const cenario = document.getElementById("cenario");
    cenario.innerHTML = "";          // limpa inimigos antigos

    pontos = 0;
    vidas = 3;
    rodando = true;

    criarPlayer();
    atualizarHUD();
    iniciarLoops();
}

function iniciarLoops() {
    pararLoops(); // garante que não tenha duplicado

    loopMoverCorvos = setInterval(moverCorvos, 16);     // ~60 FPS
    loopSpawnCorvos = setInterval(spawnCorvo, 1000);    // 1 corvo/segundo
    loopAnimarCorvos = setInterval(animarCorvos, 120);  // animação
}

function pararLoops() {
    if (loopMoverCorvos) clearInterval(loopMoverCorvos);
    if (loopSpawnCorvos) clearInterval(loopSpawnCorvos);
    if (loopAnimarCorvos) clearInterval(loopAnimarCorvos);

    loopMoverCorvos = null;
    loopSpawnCorvos = null;
    loopAnimarCorvos = null;
}

function perderVida() {
    if (!rodando) return;

    vidas--;
    atualizarHUD();

    if (vidas <= 0) {
        rodando = false;
        pararLoops();

        // Aqui você pode salvar no Firebase se quiser
        // salvarPontuacaoNoRanking(jogador, pontos);

        alert("Game Over! Pontos: " + pontos);
    }
}
