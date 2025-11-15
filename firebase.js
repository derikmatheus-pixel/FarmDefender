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

// --- Inicializa Firebase ---
firebase.initializeApp(firebaseConfig);

// --- Referência ao banco ---
const db = firebase.database();
