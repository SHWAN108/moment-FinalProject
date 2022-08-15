// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAI7AWxdKIaR2i1Q69XIMR1X9L9-_0Ifrg",
  authDomain: "moment-179a5.firebaseapp.com",
  projectId: "moment-179a5",
  storageBucket: "moment-179a5.appspot.com",
  messagingSenderId: "1034078241122",
  appId: "1:1034078241122:web:b9be8685cbdb50ffe5ac3b",
  measurementId: "G-TKM6LXX5NG"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export {app , fireDB};