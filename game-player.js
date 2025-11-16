// ==========================
// JOGADOR / FAZENDEIROS
// ==========================

window.GamePlayer = {

    // Colocar fazendeiro em uma linha
    adicionarFazendeiro: function (linha) {
        const s = Game.state;
        const cfg = Game.config;
        const cenario = Game.dom.cenario;

        if (!cenario) return;

        // Impede dois fazendeiros na mesma linha
        if (s.fazendeiros.some(f => f.linha === linha)) {
            alert("Já existe um fazendeiro nessa linha!");
            return;
        }

        const fazendeiro = document.createElement("img");
        fazendeiro.src = "fazendeiro.png";  // imagem do fazendeiro
        fazendeiro.classList.add("fazendeiro");
        fazendeiro.style.position = "absolute";

        const posXFixo = 80; // distância da borda esquerda
        fazendeiro.style.left = posXFixo + "px";
        fazendeiro.style.top  = cfg.LINHAS_Y[linha] + "px";

        cenario.appendChild(fazendeiro);

        s.fazendeiros.push({
            elemento: fazendeiro,
            linha: linha,
            x: posXFixo,
            tempoTiro: 0 // acumulador para saber quando atirar
        });
    },

    // Atualiza tiros + movimento dos projéteis
    atualizarProjeteis: function (delta) {
        const s = Game.state;
        const cfg = Game.config;
        const cenario = Game.dom.cenario;
        if (!cenario) return;

        // 1) Cada fazendeiro acumula tempo e atira a cada INTERVALO_TIRO
        s.fazendeiros.forEach(f => {
            f.tempoTiro += delta;
            if (f.tempoTiro >= cfg.INTERVALO_TIRO) {
                this.criarProjetil(f);
                f.tempoTiro = 0;
            }
        });

        // 2) Movimenta projéteis e verifica colisão com criaturas
        for (let i = s.projeteis.length - 1; i >= 0; i--) {
            const p = s.projeteis[i];

            // projétil anda para a direita
            p.x += cfg.VELOCIDADE_PROJETIL * delta;
            p.elemento.style.left = p.x + "px";

            // Se saiu da tela, remove
            if (p.x > cenario.clientWidth + 50) {
                this.removerProjetil(i);
                continue;
            }

            // Colisão com criaturas na mesma linha
            let acertou = false;
            for (let j = s.criaturas.length - 1; j >= 0; j--) {
                const c = s.criaturas[j];
                if (c.linha !== p.linha) continue;

                // distância aproximada para considerar colisão
                if (Math.abs(p.x - c.x) < 30) {
                    GameEnemies.removerCriatura(j);
                    this.removerProjetil(i);

                    s.pontos += 10;
                    GameHud.atualizarHUD();

                    acertou = true;
                    break;
                }
            }

            if (acertou) {
                // já removemos o projétil, seguir para o próximo
                continue;
            }
        }
    },

    // Cria projétil saindo do fazendeiro
    criarProjetil: function (fazendeiroObj) {
        const cfg = Game.config;
        const cenario = Game.dom.cenario;
        const s = Game.state;

        if (!cenario) return;

        const proj = document.createElement("div");
        proj.classList.add("projetil");
        proj.style.position = "absolute";

        const startX = fazendeiroObj.x + 30; // um pouco à frente do fazendeiro
        proj.style.left = startX + "px";
        proj.style.top  = cfg.LINHAS_Y[fazendeiroObj.linha] + "px";

        cenario.appendChild(proj);

        s.projeteis.push({
            elemento: proj,
            x: startX,
            linha: fazendeiroObj.linha
        });
    },

    removerProjetil: function (indice) {
        const s = Game.state;
        const p = s.projeteis[indice];
        if (!p) return;

        p.elemento.remove();
        s.projeteis.splice(indice, 1);
    }
};

// Atalho global para usar no HTML: onclick="adicionarFazendeiro(0)"
function adicionarFazendeiro(linha) {
    GamePlayer.adicionarFazendeiro(linha);
}
