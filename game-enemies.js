// Tamanhos do frame do corvo (mesmos do CSS)
const CORVO_LARGURA = 32;  // ajuste se mudar
const CORVO_ALTURA = 32;   // ajuste se mudar

let corvos = []; // precisa ser let para podermos reatribuir

function spawnCorvo() {
    if (!rodando) return; // se você usa essa flag

    const cenario = document.getElementById("cenario");
    const corvo = document.createElement("div");

    // classe que bate com o CSS (.corvo)
    corvo.classList.add("corvo");

    // posição inicial aleatória na largura
    const maxX = cenario.clientWidth - CORVO_LARGURA;
    const posX = Math.random() * maxX;

    corvo.style.left = posX + "px";
    corvo.style.top = -CORVO_ALTURA + "px"; // começa acima da tela

    // clique mata o corvo
    corvo.addEventListener("click", () => matarCorvo(corvo));

    cenario.appendChild(corvo);
    corvos.push(corvo);
}

function moverCorvos() {
    const cenario = document.getElementById("cenario");
    const limiteY = cenario.clientHeight;

    // percorre de trás pra frente para poder remover com segurança
    for (let i = corvos.length - 1; i >= 0; i--) {
        const corvo = corvos[i];
        let y = parseInt(corvo.style.top);

        // velocidade de queda
        y += 2;
        corvo.style.top = y + "px";

        // passou do chão → some + perde vida
        if (y > limiteY) {
            corvo.remove();
            corvos.splice(i, 1);
            perderVida();
        }
    }
}

// exemplo (ideal é colocar estes setInterval só uma vez, ao iniciar o jogo)
setInterval(moverCorvos, 16);   // move
setInterval(spawnCorvo, 1000);  // cria de tempos em tempos

function matarCorvo(corvo) {
    pontos++;
    atualizarHUD(); // ou mostrarHUD(), use o nome certo da sua função de HUD

    // remove o corvo do array
    corvos = corvos.filter(c => c !== corvo);

    // remove do DOM
    corvo.remove();
}
