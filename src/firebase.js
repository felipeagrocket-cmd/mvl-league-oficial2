import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ESTES DADOS VOCÊ PEGA NO CONSOLE DO FIREBASE (Configurações do Projeto)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco de dados com o nome 'db' para o App.js encontrar
export const db = getFirestore(app);
