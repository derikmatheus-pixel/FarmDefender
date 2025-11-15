document.addEventListener("keydown", (e) => {
    moverFazendeiro(e.key);
});

document.getElementById("btnlogout").onclick = () => {
    window.location.href = "menu.html";
};
