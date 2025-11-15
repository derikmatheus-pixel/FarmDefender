// game-events.js

document.addEventListener("DOMContentLoaded", function () {
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});
