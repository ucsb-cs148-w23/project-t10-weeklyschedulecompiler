import React from 'react';
import './App.css';
  
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_dSJXP8g0fVMZEfQbgz9gMwC3ZOuS3Eg",
  authDomain: "hello-ebc74.firebaseapp.com",
  projectId: "hello-ebc74",
  storageBucket: "hello-ebc74.appspot.com",
  messagingSenderId: "411428218856",
  appId: "1:411428218856:web:75060aa8d60d63b4aea65d",
  measurementId: "G-0QJNSNSJM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function App() {
    return ( 
      <h1> Hello World! </h1>
    );
}
  
export default App;