const CORVO_LARGURA = 48;
const CORVO_ALTURA  = 48;

const CORVO_FRAMES = [
    "corvo1.png",
    "corvo2.png",
    "corvo3.png"
];

let corvos = [];
let corvoFrameGlobal = 0;

function spawnCorvo() {
    const cenario = document.getElementById("cenario");
    const corvo = document.createElement("img");

    corvo.classList.add("corvo");
    corvo.src = CORVO_FRAMES[0];

    const maxX = cenario.clientWidth - CORVO_LARGURA;
    const posX = Math.random() * maxX;

    corvo.style.left = posX + "px";
    corvo.style.top  = -CORVO_ALTURA + "px";

    corvo.addEventListener("click", () => matarCorvo(corvo));

    cenario.appendChild(corvo);
    corvos.push(corvo);
}


// Move todos os corvos para baixo
function moverCorvos() {
    const cenario = document.getElementById("cenario");
    const limiteY = cenario.clientHeight;

    for (let i = corvos.length - 1; i >= 0; i--) {
        const corvo = corvos[i];
        let y = parseInt(corvo.style.top);

        y += 2; // velocidade
        corvo.style.top = y + "px";

        if (y > limiteY) {
            corvo.remove();
            corvos.splice(i, 1);
            perderVida();
        }
    }
}

// Anima os frames do sprite de TODOS os corvos
function animarCorvos() {
    if (corvos.length === 0) return;

    corvoFrameGlobal = (corvoFrameGlobal + 1) % CORVO_FRAMES.length;
    const frameSrc = CORVO_FRAMES[corvoFrameGlobal];

    corvos.forEach(corvo => {
        corvo.src = frameSrc;
    });
}

// Mata um corvo clicado
function matarCorvo(corvo) {
    pontos++;
    atualizarHUD(); // ou mostrarHUD(), use a sua função de HUD

    corvos = corvos.filter(c => c !== corvo);
    corvo.remove();
}

// Chamadas periódicas (deixe isso apenas onde inicia o jogo)
setInterval(moverCorvos, 16);    // movimento (~60 FPS)
setInterval(spawnCorvo, 1000);   // novo corvo a cada 1 segundo
setInterval(animarCorvos, 120);  // animação troca frame a cada 120ms

