function abrirCadastro() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("cadastroForm").classList.remove("hidden");
}

function fecharCadastro() {
    document.getElementById("cadastroForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

function cadastrar() {
    const nick = document.getElementById("nickNovo").value.trim();
    const senha = document.getElementById("senhaNova").value.trim();

    if (nick === "" || senha === "") {
        alert("Preencha todos os campos.");
        return;
    }

    if (localStorage.getItem(nick)) {
        alert("Este nick já está cadastrado!");
        return;
    }

    localStorage.setItem(nick, senha);
    alert("Conta criada com sucesso!");
    fecharCadastro();
}

function login() {
    const nick = document.getElementById("nickLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value.trim();

    if (nick === "" || senha === "") {
        alert("Preencha o login e a senha.");
        return;
    }

    const senhaSalva = localStorage.getItem(nick);

    if (!senhaSalva || senhaSalva !== senha) {
        alert("Nick ou senha incorretos!");
        return;
    }

    localStorage.setItem("usuarioLogadoFarm", nick);
    window.location.href = "jogo.html";
}
