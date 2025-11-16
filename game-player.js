// ==========================
// JOGADOR / FAZENDEIROS
// ==========================

window.GamePlayer = {
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

        const posXFixo = 80; // distância da borda esquerda (ajuste depois)
        fazendeiro.style.left = posXFixo + "px";
        fazendeiro.style.top  = cfg.LINHAS_Y[linha] + "px";

        cenario.appendChild(fazendeiro);

        // Alcance horizontal: quando o corvo passar deste X indo para a esquerda ele é defendido
        const alcanceX = cenario.clientWidth - 150; // ajuste fino no teste

        s.fazendeiros.push({
            elemento: fazendeiro,
            linha: linha,
            alcanceX: alcanceX
        });
    }
};

// Atalho global para usar no HTML: onclick="adicionarFazendeiro(0)"
function adicionarFazendeiro(linha) {
    GamePlayer.adicionarFazendeiro(linha);
}
