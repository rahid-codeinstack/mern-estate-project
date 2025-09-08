// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyB3h7NCJkBf8UXkD_WtLbokjS5iwPgPbmE",
     authDomain: "mern-estate-9ac58.firebaseapp.com",
     projectId: "mern-estate-9ac58",
     storageBucket: "mern-estate-9ac58.firebasestorage.app",
     messagingSenderId: "750181380624",
     appId: "1:750181380624:web:d3209ff9cf844cbfc0d095",
     webApiKey: "AIzaSyB3h7NCJkBf8UXkD_WtLbokjS5iwPgPbmE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

