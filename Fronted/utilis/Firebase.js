import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "abdullah-be0fa.firebaseapp.com",
  projectId: "abdullah-be0fa",
  storageBucket: "abdullah-be0fa.firebasestorage.app",
  messagingSenderId: "1056221335255",
  appId: "1:1056221335255:web:48378c721b5603236aaa92"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new  GoogleAuthProvider

export {auth,provider}