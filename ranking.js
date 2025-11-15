// ranking.js
// Página de Ranking do Farm Defender

// Se no firebase.js você já criou "const db = firebase.database();",
// você pode usar db.ref(...). Aqui vou direto no firebase para evitar conflito.
const rankingRef = firebase.database().ref("ranking");

// Elementos da página
const tabelaRanking = document.getElementById("tabelaRanking");
const btnVoltarMenu = document.getElementById("btnVoltarMenu");

// Quantidade máxima de jogadores exibidos
const LIMITE_RANKING = 50;

/**
 * Carrega o ranking do Firebase, pega TOP 50
 * e monta as linhas na tabela.
 */
function carregarRanking() {
    rankingRef
        .orderByChild("pontos")
        .limitToLast(LIMITE_RANKING)
        .once("value")
        .then((snapshot) => {
            const lista = [];

            snapshot.forEach((child) => {
                const dados = child.val() || {};

                // nome do jogador:
                // tenta campos internos e, se não tiver, usa a própria chave do nó
                const nomeJogador =
                    dados.jogador ||
                    dados.nome ||
                    dados.nick ||
                    dados.nickname ||
                    dados.usuario ||
                    dados.nomeJogador ||
                    child.key ||              // <- aqui pegamos o nome pela chave
                    "Jogador";

                // pontos (tenta vários campos; converte para número)
                const pontos = Number(
                    dados.pontos ??
                    dados.pontuacao ??
                    dados.score ??
                    dados.pontuacaoTotal ??
                    0
                );

                lista.push({
                    jogador: nomeJogador,
                    pontos: pontos
                });
            });

            // Firebase já trouxe limitToLast, mas vamos garantir
            // que a lista esteja do MAIOR para o MENOR
            lista.sort((a, b) => b.pontos - a.pontos);

            const top = lista.slice(0, LIMITE_RANKING);

            // Limpa a tabela
            tabelaRanking.innerHTML = "";

            if (top.length === 0) {
                const linhaVazia = document.createElement("tr");
                const celula = document.createElement("td");
                celula.colSpan = 3;
                celula.textContent = "Nenhum resultado de ranking encontrado.";
                linhaVazia.appendChild(celula);
                tabelaRanking.appendChild(linhaVazia);
                return;
            }

            // Monta as linhas
            top.forEach((item, index) => {
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
        })
        .catch((error) => {
            console.error("Erro ao carregar ranking:", error);
            tabelaRanking.innerHTML = `
                <tr>
                    <td colspan="3">Erro ao carregar ranking.</td>
                </tr>
            `;
        });
}

/**
 * Botão Voltar ao Menu
 * Confirme se o arquivo do menu é realmente "menu.html".
 */
if (btnVoltarMenu) {
    btnVoltarMenu.addEventListener("click", () => {
        window.location.href = "menu.html"; // ajuste se o nome for outro
    });
}

// Inicia o carregamento do ranking ao abrir a página
carregarRanking();
