import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // NOVO: Importa o sistema de Login

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

// Exporta o banco de dados e o sistema de login
export const db = getFirestore(app);
export const auth = getAuth(app); // NOVO: Exporta o porteiro



