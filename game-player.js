function criarFazendeiro() {
    const cenario = document.getElementById("cenario");

    fazendeiro = document.createElement("img");
    fazendeiro.src = "fazendeiro.png";
    fazendeiro.id = "player";

    fazendeiro.style.position = "absolute";
    fazendeiro.style.left = "250px";
    fazendeiro.style.top = "300px";
    fazendeiro.style.width = "40px";

    cenario.appendChild(fazendeiro);
}

function moverFazendeiro(tecla) {
    if (!rodando || !fazendeiro) return;

    let x = parseInt(fazendeiro.style.left);

    if (tecla === "ArrowLeft")   fazendeiro.style.left = Math.max(0, x - 10) + "px";
    if (tecla === "ArrowRight")  fazendeiro.style.left = Math.min(560, x + 10) + "px";
}
