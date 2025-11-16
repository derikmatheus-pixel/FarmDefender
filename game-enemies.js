// ==========================
// INIMIGOS / CRIATURAS
// ==========================

window.GameEnemies = {
    spawnCriatura: function () {
        const s   = Game.state;
        const cfg = Game.config;
        const cenario = Game.dom.cenario;

        if (!s.jogoRodando || !cenario) return;

        const larguraCenario = cenario.clientWidth;

        // Escolhe linha aleatória (0, 1, 2...)
        const linha = Math.floor(Math.random() * cfg.LINHAS_Y.length);

        const criatura = document.createElement("img");
        criatura.src = "corvo.png";           // imagem do inimigo
        criatura.classList.add("criatura");
        criatura.style.position = "absolute";

        const posXInicial = larguraCenario;   // começa na borda direita
        criatura.style.left = posXInicial + "px";
        criatura.style.top  = cfg.LINHAS_Y[linha] + "px";

        cenario.appendChild(criatura);

        s.criaturas.push({
            elemento: criatura,
            x: posXInicial,
            linha: linha
        });
    },

    atualizarCriaturas: function (delta) {
        const s   = Game.state;
        const cfg = Game.config;

        const vel = cfg.VELOCIDADE_CORVO; // px/ms

        for (let i = s.criaturas.length - 1; i >= 0; i--) {
            const c = s.criaturas[i];

            // Move da direita para a esquerda
            c.x -= vel * delta;
            c.elemento.style.left = c.x + "px";

            // Verifica se foi defendido pelo fazendeiro
            GameEvents.verificarDefesaLinha(c, i);

            // Se passou totalmente pela borda esquerda, perdeu a defesa
            if (c.x < -50) {
                GameEvents.corvoPassouLinha(i);
            }
        }
    },

    removerCriatura: function (indice) {
        const s = Game.state;
        const c = s.criaturas[indice];
        if (!c) return;

        c.elemento.remove();
        s.criaturas.splice(indice, 1);
    }
};
