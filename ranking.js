// LIMITE DE JOGADORES NO RANK
const LIMITE_RANKING = 5;

const tabelaRanking = document.getElementById("tabelaRanking");

// referência no Firebase (ajuste se o seu nó tiver outro nome)
const rankingRef = firebase.database().ref("ranking");

// busca os dados ordenando por pontos
rankingRef.orderByChild("pontos").on("value", (snapshot) => {
    const lista = [];

    snapshot.forEach((child) => {
        const dados = child.val();
        lista.push({
            jogador: dados.jogador,
            pontos: dados.pontos
        });
    });

    // ordena: maior pontuação primeiro
    lista.sort((a, b) => b.pontos - a.pontos);

    // pega só o TOP 5
    const top5 = lista.slice(0, LIMITE_RANKING);

    // limpa a tabela
    tabelaRanking.innerHTML = "";

    // monta as linhas
    top5.forEach((item, index) => {
        const tr = document.createElement("tr");

        const tdPosicao = document.createElement("td");
        tdPosicao.textContent = index + 1;

        const tdJogador = document.createElement("td");
        tdJogador.textContent = item.jogador;

        const tdPontos = document.createElement("td");
        tdPontos.textContent = item.pontos;

        tr.appendChild(tdPosicao);
        tr.appendChild(tdJogador);
        tr.appendChild(tdPontos);

        tabelaRanking.appendChild(tr);
    });
});
