// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQFp_pt_jvyJ19mbG_FMDxXOy_hFlj4UY",
  authDomain: "btr-milestone-tracker.firebaseapp.com",
  databaseURL: "https://btr-milestone-tracker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "btr-milestone-tracker",
  storageBucket: "btr-milestone-tracker.appspot.com",
  messagingSenderId: "822584872150",
  appId: "1:822584872150:web:d0a6550d13be666a274d77",
  measurementId: "G-VCDDDF5L3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
