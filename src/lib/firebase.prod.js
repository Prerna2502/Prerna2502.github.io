import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app"


// we need to somehow seed the database

// we need a config here

const config = {
    apiKey: "AIzaSyCH2bsKN7Ea5YfATDXtmA3Sgo12_vuZCdA",
    authDomain: "indian-movies-6472e.firebaseapp.com",
    projectId: "indian-movies-6472e",
    storageBucket: "indian-movies-6472e.appspot.com",
    messagingSenderId: "1081601166953",
    appId: "1:1081601166953:web:d56d23200ce1577e035cf8",
    measurementId: "G-F5HJDDL96H"
};

const Firebase = initializeApp(config);
export {Firebase};