// Usuário logado
let jogador = localStorage.getItem("usuarioLogadoFarm");
if (!jogador) window.location.href = "index.html";

// Variáveis do jogo
let pontos = 0;
let vidas = 3;
let fazendeiro = null;
let tiros = [];
let corvos = [];
let spawnInterval = null;
let tiroCooldown = false;
let mirandoCima = false;

// Atualiza HUD
function mostrarHUD() {
    document.getElementById("hudPontos").innerText = "Pontos: " + pontos;
    document.getElementById("hudVidas").innerText = "Vidas: " + vidas;
}

// Cria o fazendeiro
function criarFazendeiro() {
    fazendeiro = document.createElement("img");
    fazendeiro.src = "fazendeiro.png";
    fazendeiro.id = "player";
    fazendeiro.style.left = "300px";
    document.getElementById("cenario").appendChild(fazendeiro);
}

// Spawn dos corvos
function spawnCorvo() {
    const cenario = document.getElementById("cenario");

    const corvo = document.createElement("img");
    corvo.src = "corvo.png";
    corvo.classList.add("corvo");

    corvo.style.left = Math.random() * (cenario.clientWidth - 60) + "px";
    corvo.style.top = "-50px";

    cenario.appendChild(corvo);
    corvos.push(corvo);
}

// Movimenta corvos
function atualizarCorvos() {
    corvos.forEach((corvo, index) => {
        let y = parseInt(corvo.style.top);
        corvo.style.top = (y + 3) + "px";

        // Bate no chão → perde vida
        if (y > 350) {
            corvo.remove();
            corvos.splice(index, 1);
            perderVida();
        }

        // Colisão com o fazendeiro
        if (colide(corvo, fazendeiro)) {
            corvo.remove();
            corvos.splice(index, 1);
            perderVida();
        }
    });
}

// Atirar
function atirar() {
    if (tiroCooldown) return;

    tiroCooldown = true;
    setTimeout(() => tiroCooldown = false, 250);

    const cenario = document.getElementById("cenario");

    const tiro = document.createElement("div");
    tiro.classList.add("tiro");

    let px = parseInt(fazendeiro.style.left) + 20;
    tiro.style.left = px + "px";
    tiro.style.top = mirandoCima ? "260px" : "310px";

    tiro.direcao = mirandoCima ? -6 : -2;

    cenario.appendChild(tiro);
    tiros.push(tiro);
}

// Movimenta tiros
function atualizarTiros() {
    tiros.forEach((tiro, index) => {
        let y = parseInt(tiro.style.top);
        tiro.style.top = (y + tiro.direcao) + "px";

        // Sai da tela
        if (y < -20) {
            tiro.remove();
            tiros.splice(index, 1);
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

// Colisão simples
function colide(a, b) {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();

    return !(
        ra.right < rb.left ||
        ra.left > rb.right ||
        ra.bottom < rb.top ||
        ra.top > rb.bottom
    );
}

// Perde vida
function perderVida() {
    vidas--;
    if (vidas < 0) vidas = 0;
    mostrarHUD();

    if (vidas === 0) {
        finalizarJogo();
    }
}

// Finaliza jogo
function finalizarJogo() {
    clearInterval(spawnInterval);

    salvarPontuacao(jogador, pontos).then(() => {
        window.location.href = "ranking.html";
    });
}

// Controles
document.addEventListener("keydown", (e) => {
    let x = parseInt(fazendeiro.style.left);

    if (e.key === "ArrowLeft") {
        fazendeiro.style.left = Math.max(0, x - 10) + "px";
    }
    if (e.key === "ArrowRight") {
        fazendeiro.style.left = Math.min(520, x + 10) + "px";
    }
    if (e.key === "ArrowUp") {
        mirandoCima = true;
        fazendeiro.classList.add("mirando");
    }
    if (e.key === " ") {
        atirar();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") {
        mirandoCima = false;
        fazendeiro.classList.remove("mirando");
    }
});

// Loop do jogo
function loop() {
    atualizarTiros();
    atualizarCorvos();
    requestAnimationFrame(loop);
}

// Início
function iniciarJogo() {
    mostrarHUD();
    criarFazendeiro();

    spawnInterval = setInterval(spawnCorvo, 1200);

    loop();
}

iniciarJogo();
