// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZrmuVoK1HYAI5GSwF9SMkL1Kk8XB17vQ",
    authDomain: "todoapp-63ddc.firebaseapp.com",
    projectId: "todoapp-63ddc",
    storageBucket: "todoapp-63ddc.appspot.com",
    messagingSenderId: "101359290544",
    appId: "1:101359290544:web:ff2504b089c83eaaa31375",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
