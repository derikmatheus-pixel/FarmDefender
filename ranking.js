// Carregar ranking global
function carregarRanking(lista) {

    const div = document.getElementById("rankingLista");

    div.innerHTML = lista.map((jogador, i) =>
        `
        <table class="rankLinha">
            <tr>
                <td>${i + 1}</td>
                <td>${jogador.nick}</td>
                <td>${jogador.pontos}</td>
            </tr>
        </table>
        `
    ).join("");
}

// Buscar do Firebase
db.ref("ranking")
    .orderByChild("pontos")
    .limitToLast(100)
    .once("value", snapshot => {

        const lista = [];

        snapshot.forEach(child => {
            lista.push(child.val());
        });

        lista.reverse();

        carregarRanking(lista);
    });
