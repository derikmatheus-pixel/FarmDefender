const inputNick = document.getElementById("inputNick");
const erroLogin = document.getElementById("erroLogin");
const btnEntrar = document.getElementById("btnEntrar");

btnEntrar.onclick = () => {
    const nick = inputNick.value.trim();

    if (!nick) {
        erroLogin.style.display = "block";
        return;
    }

    erroLogin.style.display = "none";

    // salva usuário logado
    localStorage.setItem("usuarioLogadoFarm", nick);

    // vai para o menu
    window.location.href = "menu.html";
};
