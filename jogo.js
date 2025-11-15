// ranking.js
// Página de Ranking do Farm Defender

// Garante que o Firebase já foi inicializado em firebase.js
// (firebase.initializeApp(...) lá dentro)
const db = firebase.database();

// ATENÇÃO: ajuste este caminho se o seu nó no Realtime Database tiver outro nome.
// Ex.: "jogadores", "pontuacoes", etc.
const rankingRef = db.ref("ranking");

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
    rankingRef.on("value", (snapshot) => {
        const lista = [];

        snapshot.forEach((child) => {
            const dados = child.val() || {};

            // Tenta vários nomes possíveis para o campo do jogador
            const nomeJogador =
                dados.jogador ||
                dados.nome ||
                dados.nick ||
                dados.nickname ||
                dados.nomeJogador ||
                "Jogador";

            // Tenta vários nomes possíveis para o campo de pontos
            const pontos =
                Number(
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

        // Ordena do maior para o menor
        lista.sort((a, b) => b.pontos - a.pontos);

        // TOP 50
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
    }, (error) => {
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
 * (ajuste "menu.html" caso o nome do seu arquivo seja outro)
 */
if (btnVoltarMenu) {
    btnVoltarMenu.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
}

// Inicia o carregamento do ranking ao abrir a página
carregarRanking();
