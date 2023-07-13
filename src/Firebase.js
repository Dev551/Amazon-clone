import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhcRVfSRb7idAhh5oOAK_sBeMJq_-R_A4",
  authDomain: "clone-acec2.firebaseapp.com",
  projectId: "clone-acec2",
  storageBucket: "clone-acec2.appspot.com",
  messagingSenderId: "896880179972",
  appId: "1:896880179972:web:eea4c0073ee3b08f62ee51",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export { db };
