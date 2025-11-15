function abrirCadastro() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("cadastroBox").classList.remove("hidden");
}

function abrirLogin() {
    document.getElementById("cadastroBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}

/* Cadastrar novo jogador */
function cadastrar() {
    const nick = document.getElementById("cadNick").value.trim();
    const senha = document.getElementById("cadSenha").value.trim();

    if (!nick || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    if (localStorage.getItem(nick)) {
        alert("Esse nick já existe. Escolha outro.");
        return;
    }

    localStorage.setItem(nick, senha);
    alert("Conta criada com sucesso!");
    abrirLogin();
}

/* Login */
function login() {
    const nick = document.getElementById("loginNick").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    if (!nick || !senha) {
        alert("Preencha o login e a senha.");
        return;
    }

    const senhaSalva = localStorage.getItem(nick);

    if (!senhaSalva) {
        alert("Nick não encontrado.");
        return;
    }

    if (senhaSalva !== senha) {
        alert("Senha incorreta.");
        return;
    }

    localStorage.setItem("usuarioLogadoFarm", nick);
    window.location.href = "jogo.html";
}
