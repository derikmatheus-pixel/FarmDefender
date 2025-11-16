// ==========================
// GAME CORE
// ==========================

window.Game = {
    // Configurações do jogo
    config: {
        LINHAS_Y: [80, 160, 240], // posições Y das “faixas” (ajuste no CSS)
        VELOCIDADE_CORVO: 0.15,   // px por ms (0.15 ≈ 9 px/seg)
        INTERVALO_SPAWN: 1500,    // tempo entre spawns (ms)
        VIDAS_INICIAIS: 3
    },

    // Estado atual do jogo
    state: {
        pontos: 0,
        vidas: 3,
        criaturas: [],   // { elemento, x, linha }
        fazendeiros: [], // { elemento, linha, alcanceX }
        jogoRodando: false,
        ultimoFrame: 0,
        spawnInterval: null
    },

    // Referências de DOM
    dom: {
        cenario: null,
        hudPontos: null,
        hudVidas: null
    },

    // Inicialização básica (DOM pronto)
    init: function () {
        this.dom.cenario   = document.getElementById("cenario");
        this.dom.hudPontos = document.getElementById("hudPontos");
        this.dom.hudVidas  = document.getElementById("hudVidas");

        if (this.dom.cenario) {
            this.dom.cenario.style.position = "relative";
            this.dom.cenario.style.overflow = "hidden";
        }

        this.state.vidas = this.config.VIDAS_INICIAIS;
        GameHud.atualizarHUD();
    },

    // Iniciar / reiniciar jogo
    iniciarJogo: function () {
        const s = this.state;

        // Remove tudo que já existia
        s.criaturas.forEach(c => c.elemento.remove());
        s.fazendeiros.forEach(f => f.elemento.remove());

        s.criaturas = [];
        s.fazendeiros = [];
        s.pontos = 0;
        s.vidas = this.config.VIDAS_INICIAIS;
        GameHud.atualizarHUD();

        if (s.spawnInterval) {
            clearInterval(s.spawnInterval);
            s.spawnInterval = null;
        }

        s.jogoRodando = true;
        s.ultimoFrame = performance.now();

        // Começa a nascer criatura de X → Y
        s.spawnInterval = setInterval(
            GameEnemies.spawnCriatura,
            this.config.INTERVALO_SPAWN
        );

        requestAnimationFrame(this.loop);
    },

    // Loop principal
    loop: function (timestamp) {
        const s = Game.state;
        if (!s.jogoRodando) return;

        const delta = timestamp - s.ultimoFrame;
        s.ultimoFrame = timestamp;

        GameEnemies.atualizarCriaturas(delta);

        requestAnimationFrame(Game.loop);
    },

    // Perder vida
    perderVida: function () {
        const s = this.state;
        s.vidas -= 1;
        GameHud.atualizarHUD();

        if (s.vidas <= 0) {
            this.gameOver();
        }
    },

    // Game Over
    gameOver: function () {
        const s = this.state;
        s.jogoRodando = false;

        if (s.spawnInterval) {
            clearInterval(s.spawnInterval);
            s.spawnInterval = null;
        }

        alert("Game Over! Pontos: " + s.pontos);
    }
};
