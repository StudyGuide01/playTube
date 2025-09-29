// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "playtube-f4681.firebaseapp.com",
  projectId: "playtube-f4681",
  storageBucket: "playtube-f4681.firebasestorage.app",
  messagingSenderId: "333850732929",
  appId: "1:333850732929:web:f0dcdaeb915e62ceca2080",
  measurementId: "G-ZHSLY9F7B2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"   
});

export   {auth,provider};