// firebase.js

const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO-default-rtdb.firebaseio.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "XXXXXXX",
    appId: "X:XXXXXXX:web:XXXXXXXX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function salvarPontuacao(nome, pontos) {
    const ref = db.ref("ranking");
    const novaRef = ref.push();
    return novaRef.set({
        nome: nome,
        pontos: Number(pontos) || 0,
        criadoEm: Date.now()
    });
}

function carregarRanking(callback) {
    const ref = db.ref("ranking").orderByChild("pontos").limitToLast(10);

    ref.on("value", snapshot => {
        const dados = snapshot.val() || {};
        const lista = Object.values(dados);
        lista.sort((a, b) => b.pontos - a.pontos);
        callback(lista);
    });
}

window.salvarPontuacao = salvarPontuacao;
window.carregarRanking = carregarRanking;
