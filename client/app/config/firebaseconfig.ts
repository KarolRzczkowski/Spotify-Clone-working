'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider , getAuth  ,GithubAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHRm8UkAZklvTa6Dln9XDRm-ajEfsP27g",
  authDomain: "spotify-clone-6c32e.firebaseapp.com",
  projectId: "spotify-clone-6c32e",
  storageBucket: "spotify-clone-6c32e.appspot.com",
  messagingSenderId: "212214898738",
  appId: "1:212214898738:web:4d2c4780a676e858b01c2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleprovider = new GoogleAuthProvider()
const  githubprovider = new GithubAuthProvider()
export {googleprovider  , githubprovider , auth}