import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmjT3yHuitmiCOAaXsO3qeq0ne1ILEr60",
    authDomain: "expense-cc-fe78d.firebaseapp.com",
    projectId: "expense-cc-fe78d",
    storageBucket: "expense-cc-fe78d.appspot.com",
    messagingSenderId: "477788869251",
    appId: "1:477788869251:web:c83c82bc6b4d25d30f41b6",
    measurementId: "G-FVPN7BZ3N3"
};

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);

export { db }
