// ==========================
// EVENTOS / REGRAS DE JOGO
// ==========================

window.GameEvents = {
    // Corvo entra na linha que tem fazendeiro?
    verificarDefesaLinha: function (criatura, indiceCriatura) {
        const s = Game.state;

        const fazendeiro = s.fazendeiros.find(f => f.linha === criatura.linha);
        if (!fazendeiro) return;

        // Quando o corvo passar do alcanceX, ele é “segurado” pelo fazendeiro
        if (criatura.x <= fazendeiro.alcanceX) {
            s.pontos += 10; // pontos por inimigo defendido
            GameHud.atualizarHUD();
            GameEnemies.removerCriatura(indiceCriatura);
        }
    },

    // Corvo passou totalmente pela borda esquerda
    corvoPassouLinha: function (indiceCriatura) {
        GameEnemies.removerCriatura(indiceCriatura);
        Game.perderVida();
    }
};
