// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLx0vjF7JVwj7DMJRYLrt6DnrY2o6a_0U",
  authDomain: "notes-client-f669d.firebaseapp.com",
  projectId: "notes-client-f669d",
  storageBucket: "notes-client-f669d.appspot.com",
  messagingSenderId: "103702643325",
  appId: "1:103702643325:web:8ec77c69222e34ffbb6714"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);