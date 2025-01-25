// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd_lpVRC4TJBOCURQ0HO4iOJMd8eJMElE",
  authDomain: "finance-tracker-348a3.firebaseapp.com",
  projectId: "finance-tracker-348a3",
  storageBucket: "finance-tracker-348a3.firebasestorage.app",
  messagingSenderId: "621846948225",
  appId: "1:621846948225:web:b6f02414fd6e1afe6aa080"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export{app, db};