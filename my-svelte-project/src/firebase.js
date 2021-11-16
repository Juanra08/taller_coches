// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBSOQ-hVbKurmf0Zit3RTu_rFXz-CGoIWg",

    authDomain: "taller-be9ca.firebaseapp.com",

    projectId: "taller-be9ca",

    storageBucket: "taller-be9ca.appspot.com",

    messagingSenderId: "34683716129",

    appId: "1:34683716129:web:e181311b0531b01ec59960"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore();