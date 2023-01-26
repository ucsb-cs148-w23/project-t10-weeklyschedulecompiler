import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// add more firebase services here
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjnEALDal5wjjRMLeaWoi0jJIc45gAXeU",
  authDomain: "weeklyschedulecompiler.firebaseapp.com",
  projectId: "weeklyschedulecompiler",
  storageBucket: "weeklyschedulecompiler.appspot.com",
  messagingSenderId: "729560204452",
  appId: "1:729560204452:web:01dcbf41a2b04877209231",
  measurementId: "G-TVDLQLZR5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);