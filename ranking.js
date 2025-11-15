document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.getElementById("tabelaRanking");
    const btnVoltar = document.getElementById("btnVoltarMenu");

    if (btnVoltar) {
        btnVoltar.addEventListener("click", function () {
            window.location.href = "menu.html";
        });
    }

    carregarRanking(function (lista) {
        tabela.innerHTML = "";

        if (!lista || lista.length === 0) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = 3;
            td.textContent = "Nenhuma pontuação registrada ainda.";
            tr.appendChild(td);
            tabela.appendChild(tr);
            return;
        }

        lista.forEach(function (item, index) {
            const tr = document.createElement("tr");

            const tdPosicao = document.createElement("td");
            const tdJogador = document.createElement("td");
            const tdPontos = document.createElement("td");

            tdPosicao.textContent = index + 1;
            tdJogador.textContent = item.nome || "Jogador";
            tdPontos.textContent = item.pontos || 0;

            tr.appendChild(tdPosicao);
            tr.appendChild(tdJogador);
            tr.appendChild(tdPontos);

            tabela.appendChild(tr);
        });
    });
});
