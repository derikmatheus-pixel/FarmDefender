function carregarRanking() {
    const tabela = document.querySelector("#rankingTabela tbody");
    let lista = JSON.parse(localStorage.getItem("farm_rank")) || [];

    // Ordena do maior para o menor
    lista.sort((a, b) => b.pontos - a.pontos);

    // Mantém apenas os 10 melhores
    lista = lista.slice(0, 10);

    tabela.innerHTML = "";

    lista.forEach(item => {
        tabela.innerHTML += `
            <tr>
                <td>${item.nick}</td>
                <td>${item.pontos}</td>
            </tr>
        `;
    });
}

document.getElementById("btnVoltar").onclick = () => {
    window.location.href = "menu.html";
};


carregarRanking();
