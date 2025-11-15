// Tamanhos do frame do corvo (mesmos do CSS)
const CORVO_FRAME_LARGURA = 32; // ajuste se mudar
const CORVO_FRAME_ALTURA = 32;  // ajuste se mudar

const corvos = [];

function spawnCorvo() {
    if (!rodando) return;

    const cenario = document.getElementById("cenario");
    const corvo = document.createElement("div");

    corvo.classList.add("inimigo", "corvo");

    const maxX = cenario.clientWidth - CORVO_FRAME_LARGURA;
    const posX = Math.random() * maxX;

    corvo.style.left = posX + "px";
    corvo.style.top = -CORVO_FRAME_ALTURA + "px"; // começa fora do topo

    corvo.onclick = () => matarCorvo(corvo);

    cenario.appendChild(corvo);
    corvos.push(corvo);
}

function moverCorvos() {
    const cenario = document.getElementById("cenario");
    const chao = cenario.clientHeight - CORVO_FRAME_ALTURA;

    corvos.forEach((corvo, i) => {
        let y = parseInt(corvo.style.top);
        corvo.style.top = (y + 2) + "px";

        if (y > chao) {
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
