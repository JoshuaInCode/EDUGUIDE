// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics, app };