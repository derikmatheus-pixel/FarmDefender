// Garante login
const jogador = localStorage.getItem("usuarioLogadoFarm");
if (!jogador) {
    window.location.href = "index.html";
}

const tabela = document.getElementById("rankingTabela").querySelector("tbody");
const btnVoltar = document.getElementById("btnVoltar");

btnVoltar.onclick = () => {
    window.location.href = "menu.html";
};

// Se seu firebase.js já expõe uma função buscarRanking(), use ela.
// Caso contrário, este bloco assume firebase.database() como global.

function carregarRanking() {
    if (typeof firebase !== "undefined" && firebase.database) {
        firebase.database().ref("ranking")
            .orderByChild("pontos")
            .limitToLast(10)
            .once("value")
            .then((snapshot) => {
                const dados = [];
                snapshot.forEach((child) => {
                    dados.push(child.val());
                });

                // ordem decrescente
                dados.sort((a, b) => b.pontos - a.pontos);

                tabela.innerHTML = "";

                dados.forEach((item, index) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${item.jogador || item.nome || "??? "}</td>
                        <td>${item.pontos || 0}</td>
                    `;
                    tabela.appendChild(tr);
                });
            })
            .catch((err) => {
                console.error("Erro ao carregar ranking:", err);
            });
    }
}

carregarRanking();
