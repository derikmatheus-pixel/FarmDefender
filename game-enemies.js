// Dimensões do corvo (iguais ao CSS)
// Dimensões do corvo (mesmo do CSS)
const CORVO_LARGURA = 48;
const CORVO_ALTURA  = 48;

// Arquivos das 3 imagens do corvo
const CORVO_FRAMES = [
    "corvo1.png",
    "corvo2.png",
    "corvo3.png"
];

let corvos = [];            // lista de corvos ativos
let corvoFrameGlobal = 0;   // frame atual da animação

// Cria um novo corvo
function spawnCorvo() {
    if (typeof rodando !== "undefined" && !rodando) return;

    const cenario = document.getElementById("cenario");

    // agora é uma IMG
    const corvo = document.createElement("img");
    corvo.classList.add("corvo");
    corvo.src = CORVO_FRAMES[0]; // começa no primeiro frame

    const maxX = cenario.clientWidth - CORVO_LARGURA;
    const posX = Math.random() * maxX;

    corvo.style.left = posX + "px";
    corvo.style.top  = -CORVO_ALTURA + "px"; // começa acima da tela

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
setInterval(moverCorvos, 16);    // movimento
setInterval(spawnCorvo, 1000);   // cria um novo a cada 1s
setInterval(animarCorvos, 100);  // troca frame a cada 100ms (10 FPS)
