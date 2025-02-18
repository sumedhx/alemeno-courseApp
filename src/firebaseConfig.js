// firebase.config.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBFgOMpg0JW8exVzQnMfel2wFH25AyuHc",
  authDomain: "alemeno-courselist-assignment.firebaseapp.com",
  projectId: "alemeno-courselist-assignment",
  storageBucket: "alemeno-courselist-assignment.firebasestorage.app",
  messagingSenderId: "135887094458",
  appId: "1:135887094458:web:ccdaefb16915742fd07883",
  measurementId: "G-NKB2GBN3L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Optionally, if you want analytics
const analytics = getAnalytics(app);

export { db,app }; // Export Firestore instance for use in other components
