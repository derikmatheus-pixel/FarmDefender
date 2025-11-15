// game-enemies.js

const CORVO_LARGURA = 48;
const CORVO_ALTURA  = 48;

const CORVO_FRAMES = [
    "corvo1.png",
    "corvo2.png",
    "corvo3.png"
];

let corvos = [];
let corvoFrameGlobal = 0;

// Cria um corvo
function spawnCorvo() {
    if (!rodando) return;

    const cenario = document.getElementById("cenario");
    if (!cenario) return;

    const corvo = document.createElement("img");
    corvo.classList.add("corvo");
    corvo.src = CORVO_FRAMES[0];

    const maxX = cenario.clientWidth - CORVO_LARGURA;
    const posX = Math.random() * maxX;

    corvo.style.left = posX + "px";
    corvo.style.top  = -CORVO_ALTURA + "px"; // começa acima da tela

    corvo.addEventListener("click", function (e) {
        e.stopPropagation();
        matarCorvo(corvo);
    });

    cenario.appendChild(corvo);
    corvos.push(corvo);
}

// Move todos os corvos
function moverCorvos() {
    if (!rodando) return;

    const cenario = document.getElementById("cenario");
    if (!cenario) return;

    const limiteY = cenario.clientHeight;

    for (let i = corvos.length - 1; i >= 0; i--) {
        const corvo = corvos[i];

        let y = parseInt(corvo.style.top);
        if (isNaN(y)) y = -CORVO_ALTURA;

        y += 2; // velocidade
        corvo.style.top = y + "px";

        if (y > limiteY) {
            corvo.remove();
            corvos.splice(i, 1);
            perderVida();
        }
    }
}

// Anima todos os corvos (troca de frame)
function animarCorvos() {
    if (!rodando) return;
    if (corvos.length === 0) return;

    corvoFrameGlobal = (corvoFrameGlobal + 1) % CORVO_FRAMES.length;
    const frameSrc = CORVO_FRAMES[corvoFrameGlobal];

    corvos.forEach(corvo => {
        corvo.src = frameSrc;
    });
}

// Quando mata o corvo
function matarCorvo(corvo) {
    if (!rodando) return;

    pontos++;
    atualizarHUD();

    const idx = corvos.indexOf(corvo);
    if (idx !== -1) {
        corvos.splice(idx, 1);
    }

    corvo.remove();
}
