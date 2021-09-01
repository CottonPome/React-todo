import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const env = process.env;

const firebaseApp = firebase.initializeApp({
    apiKey: env.REACT_APP_FIREBASE_APIKEY,
    authDomain: env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: env.REACT_APP_FIREBASE_DATABASE,
    projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.REACT_APP_FIREBASE_SENDER_ID,
    appId: env.REACT_APP_FIREBASE_APPID,
});

export const db = firebaseApp.firestore();
export const auth = firebase.auth();