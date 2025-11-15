function salvarPontuacao(nick, pontos) {
    const ref = db.ref("ranking/" + nick);

    ref.set({
        nick: nick,
        pontos: pontos,
        timestamp: Date.now()
    });
}

function carregarRanking(callback) {
    db.ref("ranking")
      .orderByChild("pontos")
      .limitToLast(100)
      .once("value", snapshot => {

        const lista = [];
        snapshot.forEach(child => lista.push(child.val()));
        lista.reverse();

        callback(lista);
    });
}
