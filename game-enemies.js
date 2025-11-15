// Dimensões do corvo (iguais ao CSS)
const CORVO_LARGURA = 48;
const CORVO_ALTURA  = 48;

// Configuração do sprite
const CORVO_QTD_FRAMES = 4;       // 4 frames na imagem
const CORVO_FRAME_LARGURA = 48;   // largura de 1 frame

// Lista de corvos ativos na tela
let corvos = [];

// Controle da animação
let corvoFrameAtual = 0;

// Cria um novo corvo
function spawnCorvo() {
    if (typeof rodando !== "undefined" && !rodando) return;

    const cenario = document.getElementById("cenario");
    const corvo = document.createElement("div");

    corvo.classList.add("corvo");

    // posição inicial aleatória na largura
    const maxX = cenario.clientWidth - CORVO_LARGURA;
    const posX = Math.random() * maxX;

    corvo.style.left = posX + "px";
    corvo.style.top  = -CORVO_ALTURA + "px"; // começa acima da tela

    // clique mata o corvo
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

        // passou do limite → remove e perde vida
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

    // próximo frame global
    corvoFrameAtual = (corvoFrameAtual + 1) % CORVO_QTD_FRAMES;

    const offsetX = -(corvoFrameAtual * CORVO_FRAME_LARGURA);

    corvos.forEach(corvo => {
        corvo.style.backgroundPosition = offsetX + "px 0";
    });
}

// Mata um corvo clicado
function matarCorvo(corvo) {
    pontos++;
    atualizarHUD(); // ou mostrarHUD(), use a função que você já usa no jogo

    // tira da lista
    corvos = corvos.filter(c => c !== corvo);

    // remove da tela
    corvo.remove();
}

// Chamadas periódicas (deixe isso apenas onde inicia o jogo)
setInterval(moverCorvos, 16);    // movimento
setInterval(spawnCorvo, 1000);   // cria um novo a cada 1s
setInterval(animarCorvos, 100);  // troca frame a cada 100ms (10 FPS)
