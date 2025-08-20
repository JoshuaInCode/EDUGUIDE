// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, connectFirestoreEmulator } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCasgTfvpgBZtcdWeQm9ZarKux_S5NbJsA",
  authDomain: "expo-project-4c968.firebaseapp.com",
  projectId: "expo-project-4c968",
  storageBucket: "expo-project-4c968.firebasestorage.app",
  messagingSenderId: "358955898614",
  appId: "1:358955898614:web:4d8a59e1dd70c2e49efed7",
  measurementId: "G-22Z3GRJQCY"
};

// Initialize Firebase
let app;
let analytics;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Enable persistence for offline support
  auth.setPersistence('local');
  
  console.log('Firebase initialized successfully');
  
  // Check if we're in development mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode detected');
  }
  
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { app, analytics, auth, db };