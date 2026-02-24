import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuuw-aP86K7VnCUdRENfkCu9pd2dV9aJI",
  authDomain: "mvl-league.firebaseapp.com",
  projectId: "mvl-league",
  storageBucket: "mvl-league.firebasestorage.app",
  messagingSenderId: "50954342541",
  appId: "1:50954342541:web:4c02830836b58580b992c4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o banco de dados com o nome 'db' para o App.js conseguir ler e gravar
export const db = getFirestore(app);


