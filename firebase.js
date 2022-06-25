import { firebase } from "@react-native-firebase/auth";
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAWxpWL9iTD5QVwIaY-4V3vo7AUhreueo",
    authDomain: "otp-generator-and-users-db.firebaseapp.com",
    projectId: "otp-generator-and-users-db",
    storageBucket: "otp-generator-and-users-db.appspot.com",
    messagingSenderId: "76579294228",
    appId: "1:76579294228:web:f32246444640487e756b01",
    measurementId: "G-27YFRDLRC5"
  };

  try{
    if(!firebase.apps.length){
    initializeApp(firebaseConfig)
    }
  }catch{
    console.log("ERROR")
  }

  const app = getApp();
  const auth = getAuth();
  const db = getFirestore(app);

  export {app,auth,db}