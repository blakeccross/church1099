import { initializeApp } from "firebase/app";
import { Auth, getAuth, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcmvrUzLz3ni5q3re0ynINyGif4dEJkJw",
  authDomain: "church1099-4e3cc.firebaseapp.com",
  projectId: "church1099-4e3cc",
  storageBucket: "church1099-4e3cc.appspot.com",
  messagingSenderId: "622358755806",
  appId: "1:622358755806:web:78fbfd9b26f108982d854f",
  measurementId: "G-2BMWFEVSMD",
};

const firebaseApp = initializeApp(firebaseConfig);
const Firebase = initializeAuth(firebaseApp);

const rtdb = getDatabase();
const firestore = getFirestore();
const auth = getAuth();

export { firestore, rtdb, Firebase, auth };
