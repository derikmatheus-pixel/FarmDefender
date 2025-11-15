function spawnCorvo() {
    if (!rodando) return;

    const cenario = document.getElementById("cenario");

    // CORVO COMO DIV ANIMADA (NÃO IMG)
    const corvo = document.createElement("div");
    corvo.classList.add("corvo");

    // posição inicial
    corvo.style.left = Math.random() * (cenario.clientWidth - 60) + "px";
    corvo.style.top = "-70px";

    // clique mata
    corvo.onclick = () => matarCorvo(corvo);

    // adiciona corvo
    cenario.appendChild(corvo);
    corvos.push(corvo);
}

function moverCorvos() {
    const chao = 300;

    corvos.forEach((corvo, i) => {
        let y = parseInt(corvo.style.top);
        corvo.style.top = (y + 2) + "px";

        if (y >= chao) {
            corvo.remove();
            corvos.splice(i, 1);
            perderVida();
        }
    });
}

function matarCorvo(corvo) {
    pontos++;
    atualizarHUD();

    corvos = corvos.filter(c => c !== corvo);
    corvo.remove();
}
