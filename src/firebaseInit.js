// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLbE0LsihjqYIyjQ2Wx4mdY2HcGbbCcmI",
  authDomain: "photofolio-a84c6.firebaseapp.com",
  projectId: "photofolio-a84c6",
  storageBucket: "photofolio-a84c6.appspot.com",
  messagingSenderId: "566583415681",
  appId: "1:566583415681:web:a9e90a9ffdff7c250ece80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);