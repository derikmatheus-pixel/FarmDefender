// game-events.js

document.addEventListener("DOMContentLoaded", function () {
    const btnLogout = document.getElementById("btnLogout");

    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            // se quiser voltar para o menu/login
            window.location.href = "index.html";
        });
    }
});
