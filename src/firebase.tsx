import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const  authDomain = import.meta.env.VITE_FIREBASE_AUTHDOMAIN
const projectId= import.meta.env.VITE_FIREBASE_PROJECTID
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGEBUCKET
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID
const appId=import.meta.env.VITE_FIREBASE_APPID 

const firebaseConfig = {
  apiKey,
  authDomain ,
  projectId,
  storageBucket,
  messagingSenderId ,
  appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app);