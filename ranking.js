// ranking.js
// Página de Ranking do Farm Defender

// Referência ao banco (firebase.js já faz firebase.initializeApp)
const db = firebase.database();

// Caminho onde você salva o ranking no Realtime Database.
// Ajuste o nome "ranking" se estiver usando outro nó.
const rankingRef = db.ref("ranking");

// Elementos da página
const tabelaRanking = document.getElementById("tabelaRanking");
const btnVoltarMenu = document.getElementById("btnVoltarMenu");

// Quantidade máxima de jogadores exibidos
const LIMITE_RANKING = 50;

/**
 * Carrega o ranking do Firebase, pega o TOP 50
 * e monta as linhas na tabela.
 */
function carregarRanking() {
    // ordena por "pontos" e pega os 50 últimos (maiores)
    rankingRef
        .orderByChild("pontos")
        .limitToLast(LIMITE_RANKING)
        .once("value")
        .then((snapshot) => {
            const lista = [];

            snapshot.forEach((child) => {
                const dados = child.val();

                // garante que existem as propriedades
                lista.push({
                    jogador: dados.jogador || "???",
                    pontos: Number(dados.pontos) || 0
                });
            });

            // Firebase retorna em ordem crescente de pontos,
            // por isso invertimos para ficar do maior para o menor.
            lista.sort((a, b) => b.pontos - a.pontos);

            // Limpa a tabela antes de preencher
            tabelaRanking.innerHTML = "";

            // Monta as linhas
            lista.forEach((item, index) => {
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
 * Ação do botão Voltar ao Menu
 */
if (btnVoltarMenu) {
    btnVoltarMenu.addEventListener("click", () => {
        // ajuste o nome do arquivo se o seu menu for outro
        window.location.href = "menu.html";
    });
}

// Chama o carregamento quando a página é aberta
carregarRanking();
