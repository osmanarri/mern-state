// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-state-ac31c.firebaseapp.com",
  projectId: "mern-state-ac31c",
  storageBucket: "mern-state-ac31c.appspot.com",
  messagingSenderId: "137012265616",
  appId: "1:137012265616:web:99d663b8a47b6336a14e15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);