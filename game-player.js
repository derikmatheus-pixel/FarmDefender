// game-player.js

function criarFazendeiro() {
    const cenario = document.getElementById("cenario");
    if (!cenario) return;

    // evita duplicar
    if (fazendeiro && cenario.contains(fazendeiro)) return;

    fazendeiro = document.createElement("img");
    fazendeiro.id = "player";
    fazendeiro.src = "fazendeiro.png";

    cenario.appendChild(fazendeiro);

    const largura = cenario.clientWidth;
    const altura = cenario.clientHeight;

    const posX = (largura - 40) / 2;
    const posY = altura - 60;

    fazendeiro.style.left = posX + "px";
    fazendeiro.style.top = posY + "px";
}

// movimentação simples esquerda/direita
document.addEventListener("keydown", function (e) {
    if (!fazendeiro || !rodando) return;

    const cenario = document.getElementById("cenario");
    const passo = 10;

    let x = parseInt(fazendeiro.style.left);
    if (isNaN(x)) x = 0;

    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        x -= passo;
    } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        x += passo;
    } else {
        return;
    }

    const maxX = cenario.clientWidth - fazendeiro.clientWidth;
    if (x < 0) x = 0;
    if (x > maxX) x = maxX;

    fazendeiro.style.left = x + "px";
});
