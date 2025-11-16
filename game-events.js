// ==========================
// EVENTOS / REGRAS DE JOGO
// ==========================

window.GameEvents = {

    // Corvo passou totalmente pela borda esquerda
    corvoPassouLinha: function (indiceCriatura) {
        GameEnemies.removerCriatura(indiceCriatura);
        Game.perderVida();
    }
};
