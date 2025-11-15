// -------------------------
//   Login obrigatório
// -------------------------
let jogador = localStorage.getItem("usuarioLogadoFarm");
if (!jogador) window.location.href = "index.html";

// -------------------------
//   Variáveis do Jogo
// -------------------------
let pontos = 0;
let vidas = 3;

let fazendeiro = null;
let corvos = [];
let spawnInterval = null;
let rodando = true;

// -------------------------
//   HUD
// -------------------------
function mostrarHUD() {
    document.getElementById("hudPontos").innerText = "Pontos: " + pontos;
    document.getElementById("hudVidas").innerText = "Vidas: " + vidas;
}

// -------------------------
//   Criação do Fazendeiro (apenas visual)
// -------------------------
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

// -------------------------
//   Spawn dos Corvos
// -------------------------
function spawnCorvo() {
    if (!rodando) return;

    const cenario = document.getElementById("cenario");

    const corvo = document.createElement("img");
    corvo.src = "corvo.png";
    corvo.classList.add("corvo");

    corvo.style.position = "absolute";
    corvo.style.width = "45px";
    corvo.style.left = Math.random() * (cenario.clientWidth - 60) + "px";
    corvo.style.top = "-60px";

    // Evento de click → mata o corvo
    corvo.onclick = () => {
        matarCorvo(corvo);
    };

    cenario.appendChild(corvo);
    corvos.push(corvo);
}

// -------------------------
//   Matar Corvo
// -------------------------
function matarCorvo(corvo) {
    pontos++;
    mostrarHUD();

    corvo.remove();
    corvos = corvos.filter(c => c !== corvo);
}

// -------------------------
//   Movimentação dos Corvos
// -------------------------
function atualizarCorvos() {
    const chao = 340;

    corvos.forEach((corvo, index) => {
        let y = parseInt(corvo.style.top);
        corvo.style.top = (y + 2) + "px";

        if (y >= chao) {
            corvo.remove();
            corvos.splice(index, 1);
            perderVida();
        }
    });
}

// -------------------------
//   Colisão genérica (caso precise futuramente)
// -------------------------
function colide(a, b) {
    if (!a || !b) return false;

    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();

    return !(
        ra.right < rb.left ||
        ra.left > rb.right ||
        ra.bottom < rb.top ||
        ra.top > rb.bottom
    );
}

// -------------------------
//   Perder Vida
// -------------------------
function perderVida() {
    if (!rodando) return;

    vidas--;
    if (vidas < 0) vidas = 0;

    mostrarHUD();

    if (vidas === 0) {
        finalizarJogo();
    }
}

function fimDeJogo() {
    clearInterval(spawnInterval);

    const jogador = localStorage.getItem("usuarioLogadoFarm") || "Jogador";

    // salva no Firebase
    salvarPontuacao(jogador, pontos);

    // depois manda para a tela de ranking
    window.location.href = "ranking.html";
}


// -------------------------
//   Controles (apenas mover o fazendeiro)
// -------------------------
document.addEventListener("keydown", (e) => {
    if (!rodando || !fazendeiro) return;

    let x = parseInt(fazendeiro.style.left);

    if (e.key === "ArrowLeft") {
        fazendeiro.style.left = Math.max(0, x - 10) + "px";
    }

    if (e.key === "ArrowRight") {
        fazendeiro.style.left = Math.min(560, x + 10) + "px";
    }
});

// Botão Sair
document.getElementById("btnlogout").onclick = () => {
    window.location.href = "menu.html";
};

// -------------------------
//   Loop Principal
// -------------------------
function loop() {
    if (rodando) {
        atualizarCorvos();
        requestAnimationFrame(loop);
    }
}

// -------------------------
//   Start
// -------------------------
function iniciarJogo() {
    mostrarHUD();
    criarFazendeiro();
    spawnInterval = setInterval(spawnCorvo, 1200);
    loop();
}

iniciarJogo();

