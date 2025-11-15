function carregarUsuarios() {
    return JSON.parse(localStorage.getItem("usuariosFarm")) || [];
}

function salvarUsuarios(lista) {
    localStorage.setItem("usuariosFarm", JSON.stringify(lista));
}

function mostrarTela(id) {
    ["telaLogin", "telaCadastro"].forEach(t => {
        document.getElementById(t).style.display = (t === id ? "flex" : "none");
    });
}

function cadastrar() {
    const nick = document.getElementById("cadNick").value.trim();
    const senha = document.getElementById("cadSenha").value.trim();
    const erro = document.getElementById("cadErro");

    if (!nick || !senha) {
        erro.innerText = "Preencha todos os campos";
        erro.style.display = "block";
        return;
    }

    const usuarios = carregarUsuarios();

    if (usuarios.some(u => u.nick.toLowerCase() === nick.toLowerCase())) {
        erro.innerText = "Nick já está em uso!";
        erro.style.display = "block";
        return;
    }

    usuarios.push({ nick, senha, bestScore: 0 });
    salvarUsuarios(usuarios);

    erro.style.display = "none";
    alert("Conta criada com sucesso!");
    mostrarTela("telaLogin");
}

function entrar() {
    const nick = document.getElementById("loginNick").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();
    const erro = document.getElementById("loginErro");

    const usuarios = carregarUsuarios();
    const user = usuarios.find(u => u.nick.toLowerCase() === nick.toLowerCase() && u.senha === senha);

    if (!user) {
        erro.innerText = "Nick ou senha incorretos";
        erro.style.display = "block";
        return;
    }

    localStorage.setItem("usuarioLogadoFarm", nick);
    window.location.href = "menu.html";
}

document.getElementById("btnCadastrar").onclick = cadastrar;
document.getElementById("btnEntrar").onclick = entrar;
document.getElementById("btnAbrirCadastro").onclick = () => mostrarTela("telaCadastro");
document.getElementById("btnVoltarLogin").onclick = () => mostrarTela("telaLogin");
