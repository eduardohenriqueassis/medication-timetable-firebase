// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAETnugXldEdwjK4K-i0ylOS3OaVGvyKvs",
  authDomain: "medication-timetable.firebaseapp.com",
  projectId: "medication-timetable",
  storageBucket: "medication-timetable.appspot.com",
  messagingSenderId: "356564872465",
  appId: "1:356564872465:web:343753720743bcd28e30b0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
