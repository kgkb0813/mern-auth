// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABlj8a7Uq3IDSaO8LDdVAmLt4SLcSe4S0",
  authDomain: "mern-auth-3b8b8.firebaseapp.com",
  projectId: "mern-auth-3b8b8",
  storageBucket: "mern-auth-3b8b8.firebasestorage.app",
  messagingSenderId: "184790906841",
  appId: "1:184790906841:web:5b316b9d1d2893a7818bc8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);