// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyCPggPUaImCMT4EU1SIxQFFjyVU-j19IYc",
  authDomain: "mern-auth-sahand-d6b98.firebaseapp.com",
  projectId: "mern-auth-sahand-d6b98",
  storageBucket: "mern-auth-sahand-d6b98.firebasestorage.app",
  messagingSenderId: "852272043696",
  appId: "1:852272043696:web:4f6e637b2d8031467e4d75"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

