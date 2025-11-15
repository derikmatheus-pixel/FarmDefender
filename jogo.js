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
let tiros = [];
let corvos = [];

let spawnInterval = null;
let rodando = true;
let mirandoCima = false;
let tiroCooldown = false;

// -------------------------
//   HUD
// -------------------------
function mostrarHUD() {
    document.getElementById("hudPontos").innerText = "Pontos: " + pontos;
    document.getElementById("hudVidas").innerText = "Vidas: " + vidas;
}

// -------------------------
//   Criação do Fazendeiro
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
    corvo.style.top = "-50px";

    cenario.appendChild(corvo);
    corvos.push(corvo);
}

// -------------------------
//   Movimentação dos Corvos
// -------------------------
function atualizarCorvos() {
    const chao = 340; // altura aproximada do solo

    corvos.forEach((corvo, index) => {
        let y = parseInt(corvo.style.top);
        corvo.style.top = (y + 2.5) + "px";

        // Chegou no chão
        if (y >= chao) {
            corvo.remove();
            corvos.splice(index, 1);
            perderVida();
            return;
        }

        // Colisão com o fazendeiro
        if (colide(corvo, fazendeiro)) {
            corvo.remove();
            corvos.splice(index, 1);
            perderVida();
            return;
        }
    });
}

// -------------------------
//   Criar Tiros
// -------------------------
function atirar() {
    if (tiroCooldown || !rodando) return;

    tiroCooldown = true;
    setTimeout(() => (tiroCooldown = false), 200);

    const cenario = document.getElementById("cenario");

    const tiro = document.createElement("div");
    tiro.classList.add("tiro");

    tiro.style.position = "absolute";

    let px = parseInt(fazendeiro.style.left) + 16;

    tiro.style.left = px + "px";
    tiro.style.top = mirandoCima ? "260px" : "310px";

    tiro.dirY = mirandoCima ? -6 : -3;

    cenario.appendChild(tiro);
    tiros.push(tiro);
}

// -------------------------
//   Movimentação dos Tiros
// -------------------------
function atualizarTiros() {
    tiros.forEach((tiro, index) => {
        let y = parseInt(tiro.style.top);
        tiro.style.top = (y + tiro.dirY) + "px";

        if (y < -20) {
            tiro.remove();
            tiros.splice(index, 1);
            return;
        }

        // Colisão com corvos
        corvos.forEach((corvo, i2) => {
            if (colide(tiro, corvo)) {
                corvo.remove();
                tiro.remove();

                corvos.splice(i2, 1);
                tiros.splice(index, 1);

                pontos++;
                mostrarHUD();
            }
        });
    });
}

// -------------------------
//   Colisão
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

// -------------------------
//   Finalização
// -------------------------
function finalizarJogo() {
    rodando = false;
    clearInterval(spawnInterval);

    // Limpa elementos
    corvos.forEach(c => c.remove());
    tiros.forEach(t => t.remove());

    // Salva pontuação e vai para o ranking
    if (typeof salvarPontuacao === "function") {
        salvarPontuacao(jogador, pontos).then(() => {
            window.location.href = "ranking.html";
        }).catch(() => {
            window.location.href = "ranking.html";
        });
    } else {
        window.location.href = "ranking.html";
    }
}

// -------------------------
//   Controles
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

    if (e.key === "ArrowUp") {
        mirandoCima = true;
    }

    if (e.key === " ") {
        e.preventDefault();
        atirar();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") {
        mirandoCima = false;
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
        atualizarTiros();
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
