// ==========================
// HUD (pontos e vidas)
// ==========================

window.GameHud = {
    atualizarHUD: function () {
        if (!window.Game) return;

        const s  = Game.state;
        const dom = Game.dom;

        if (dom.hudPontos) {
            dom.hudPontos.innerText = "Pontos: " + s.pontos;
        }
        if (dom.hudVidas) {
            dom.hudVidas.innerText = "Vidas: " + s.vidas;
        }
    }
};
