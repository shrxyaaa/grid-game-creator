import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDZmymY9S2K7HhuEXInzxfOWoa-51dwcik",
  authDomain: "grid-game-creator.firebaseapp.com",
  projectId: "grid-game-creator",
  storageBucket: "grid-game-creator.appspot.com",
  messagingSenderId: "482384350199",
  appId: "1:482384350199:web:4447b8703c8e06af99bcf2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
