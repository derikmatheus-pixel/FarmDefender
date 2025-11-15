// --- Configuração Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyA_Cgh9z56sQaMof3e86NSNmKuwF1a9DfM",
  authDomain: "farmdefender-5e7ae.firebaseapp.com",
  databaseURL: "https://farmdefender-5e7ae-default-rtdb.firebaseio.com",
  projectId: "farmdefender-5e7ae",
  storageBucket: "farmdefender-5e7ae.firebasestorage.app",
  messagingSenderId: "513357885346",
  appId: "1:513357885346:web:3a22bf7d9a6f39c3d18cfb"
};

// 2) Inicializa app e database
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 3) Função para salvar pontuação
function salvarPontuacao(nome, pontos) {
    const ref = db.ref("ranking");
    const novaRef = ref.push();

    return novaRef.set({
        nome: nome,
        pontos: Number(pontos) || 0,
        criadoEm: Date.now()
    });
}

// 4) Função para buscar ranking (top 10)
function carregarRanking(callback) {
    const ref = db.ref("ranking").orderByChild("pontos").limitToLast(10);

    ref.on("value", snapshot => {
        const dados = snapshot.val() || {};
        const lista = Object.values(dados);

        // ordena desc (maior pontuação primeiro)
        lista.sort((a, b) => b.pontos - a.pontos);

        callback(lista);
    });
}

// 5) Disponibiliza no escopo global
window.salvarPontuacao = salvarPontuacao;
window.carregarRanking = carregarRanking;
