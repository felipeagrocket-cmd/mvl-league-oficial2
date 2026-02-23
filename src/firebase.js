import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuuw-aP86K7VnCUdRENfkCu9pd2dV9aJI",
  authDomain: "mvl-league.firebaseapp.com",
  projectId: "mvl-league",
  storageBucket: "mvl-league.firebasestorage.app",
  messagingSenderId: "50954342541",
  appId: "1:50954342541:web:4c02830836b58580b992c4",
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Banco de Dados e exporta para usarmos no resto do projeto
const db = getFirestore(app);

export { db };
