// ===============================
// LEGENDA GERAL:
// - Este arquivo controla LOGIN, CADASTRO e navegação (menu / ranking).
// - Usuários são salvos em localStorage na chave "usuariosFarm".
// - Quem logar com sucesso é salvo em "usuarioLogadoFarm".
// - Após login, o usuário é REDIRECIONADO para menu.html.
// ===============================


// LEGENDA: Carrega do localStorage a lista de usuários já cadastrados
// Se não existir, começa com um array vazio []
let usuarios = JSON.parse(localStorage.getItem("usuariosFarm") || "[]");


// ===============================
// FUNÇÃO: SALVAR LISTA DE USUÁRIOS NO LOCALSTORAGE
// ===============================
function salvarUsuarios() {
    localStorage.setItem("usuariosFarm", JSON.stringify(usuarios));
}


// ===============================
// FUNÇÃO: CADASTRAR NOVO USUÁRIO
// Chamado pelo botão "Cadastrar" na tela de cadastro
// ===============================
function cadastrar() {
    const nick = document.getElementById("cadNick").value.trim();
    const senha = document.getElementById("cadSenha").value.trim();

    // LEGENDA: Validação básica de campos
    if (!nick || !senha) {
        alert("Preencha Nick e Senha para cadastrar.");
        return;
    }

    // LEGENDA: Verifica se já existe um usuário com esse nick
    const jaExiste = usuarios.some(u => u.nick.toLowerCase() === nick.toLowerCase());

    if (jaExiste) {
        alert("Esse nick já está cadastrado. Tente outro.");
        return;
    }

    // LEGENDA: Adiciona novo usuário na lista
    usuarios.push({
        nick: nick,
        senha: senha
    });

    // LEGENDA: Salva lista atualizada no localStorage
    salvarUsuarios();

    alert("Cadastro realizado com sucesso!");

    // LEGENDA: Limpa campos do cadastro
    document.getElementById("cadNick").value = "";
    document.getElementById("cadSenha").value = "";

    // LEGENDA: Volta para a tela de login
    abrirLogin();
}


// ===============================
// FUNÇÃO: LOGIN
// Chamado pelo botão "Entrar" na tela de login
// ===============================
function login() {
    const nick = document.getElementById("loginNick").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    // LEGENDA: Validação básica
    if (!nick || !senha) {
        alert("Preencha Nick e Senha para entrar.");
        return;
    }

    // LEGENDA: Procura usuário na lista cadastrada
    const usuarioEncontrado = usuarios.find(
        u => u.nick.toLowerCase() === nick.toLowerCase() && u.senha === senha
    );

    if (!usuarioEncontrado) {
        alert("Usuário ou senha inválidos.");
        return;
    }

    // LEGENDA: Salva quem está logado para usar nas outras telas (game, ranking, etc.)
    localStorage.setItem("usuarioLogadoFarm", usuarioEncontrado.nick);

    // =========================================
    // LEGENDA IMPORTANTE:
    // AQUI é o ponto onde definimos para onde ir DEPOIS DO LOGIN.
    // Antes provavelmente ia para "game.html".
    // Agora VAI PARA "menu.html".
    // =========================================
    window.location.href = "menu.html";
}


// ===============================
// FUNÇÕES: TROCAR ENTRE LOGIN E CADASTRO
// ===============================
function abrirCadastro() {
    // LEGENDA: Esconde o box de login e mostra o box de cadastro
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("cadastroBox").classList.remove("hidden");
}

function abrirLogin() {
    // LEGENDA: Esconde o box de cadastro e mostra o box de login
    document.getElementById("cadastroBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}


// ===============================
// FUNÇÃO: ABRIR RANKING
// Chamado pelo botão "Ranking ⭐"
// ===============================
function abrirRanking() {
    // LEGENDA: Abre a página de ranking
    window.location.href = "ranking.html";
}
