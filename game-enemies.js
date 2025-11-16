// game-enemies.js

// Tamanho das imagens do corvo (48x48)
const CORVO_LARGURA = 48;
const CORVO_ALTURA  = 48;

// Frames da animação (3 pngs)
const CORVO_FRAMES = [
    "corvo1.png",
    "corvo2.png",
    "corvo3.png"
];

// NÃO DECLARE "let corvos = []" AQUI!
// Estamos usando o "corvos" global do game-core.js

let corvoFrameGlobal = 0;

// Cria um corvo novo
function spawnCriatura() {
    const cenario = document.getElementById("cenario");

    const criatura = document.createElement("img");
    // começa com o primeiro frame do corvo
    criatura.src = "corvo1.png";
    criatura.classList.add("criatura");

    // posição inicial: LADO DIREITO da tela
    const larguraCorvo = 48;
    const alturaCorvo = 48;

    // X começa no lado direito (fora um pouco da tela)
    let posX = cenario.clientWidth; // começa “entrando” pela direita

    // Y aleatório (da metade para cima / baixo você decide)
    const minY = cenario.clientHeight * 0.2;
    const maxY = cenario.clientHeight * 0.7;
    const posY = Math.random() * (maxY - minY) + minY;

    criatura.style.left = posX + "px";
    criatura.style.top = posY + "px";

    cenario.appendChild(criatura);

    // ANIMAÇÃO DO CORVO (troca de sprites)
    const framesCorvo = ["corvo1.png", "corvo2.png", "corvo3.png"];
    let frameIndex = 0;

    // quanto MAIOR esse valor, mais LENTA a animação (em ms)
    const intervaloFrames = 160; 

    const animacaoFrame = setInterval(() => {
        frameIndex = (frameIndex + 1) % framesCorvo.length;
        criatura.src = framesCorvo[frameIndex];
    }, intervaloFrames);

    // MOVIMENTO HORIZONTAL: direita -> esquerda
    const velocidade = 3; // px por “tick” – se quiser mais rápido, aumente

    const movimento = setInterval(() => {
        posX -= velocidade;
        criatura.style.left = posX + "px";

        // se sair totalmente da tela pela esquerda, remove
        if (posX < -larguraCorvo) {
            clearInterval(movimento);
            clearInterval(animacaoFrame);
            if (criatura.parentNode) {
                criatura.parentNode.removeChild(criatura);
            }

            // aqui é onde você tira uma vida, se quiser
            vidas--;
            mostrarHUD();
            if (vidas <= 0) {
                fimDeJogo();
            }
        }
    }, 16); // ~60fps

    // CLIQUE NO CORVO (matar o corvo)
    criatura.addEventListener("click", () => {
        // pontuação
        pontos += 10;
        mostrarHUD();

        clearInterval(movimento);
        clearInterval(animacaoFrame);

        if (criatura.parentNode) {
            criatura.parentNode.removeChild(criatura);
        }
    });
}


// Move todos os corvos para baixo
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

// Anima os frames (troca entre corvo1, corvo2, corvo3)
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
