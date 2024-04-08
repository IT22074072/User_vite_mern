// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "user-6e9ab.firebaseapp.com",
  projectId: "user-6e9ab",
  storageBucket: "user-6e9ab.appspot.com",
  messagingSenderId: "107423631966",
  appId: "1:107423631966:web:5109374158e5b8dac342cf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);