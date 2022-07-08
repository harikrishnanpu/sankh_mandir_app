import { firebase } from "@react-native-firebase/auth";
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz86Mb6rn8JSesxNaJolGU_el67enmUSE",
  authDomain: "sankh-mandir-app.firebaseapp.com",
  projectId: "sankh-mandir-app",
  storageBucket: "sankh-mandir-app.appspot.com",
  messagingSenderId: "976054396303",
  appId: "1:976054396303:web:806fe9250827743bab97fa",
  measurementId: "G-XWPWXQD0ZL"
};

try {
  if (!firebase.apps.length) {
    initializeApp(firebaseConfig)
  }
} catch {
  console.log("ERROR")
}

const app = getApp();
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db, firebaseConfig }