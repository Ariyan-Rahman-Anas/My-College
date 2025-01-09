import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  //   apiKey: "AIzaSyD-w66WAM0BROTgPSSC3T7cXk2AqkSI98k",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-clg-edu.firebaseapp.com",
  projectId: "my-clg-edu",
  storageBucket: "my-clg-edu.firebasestorage.app",
  messagingSenderId: "1038403903868",
  appId: "1:1038403903868:web:c6a4e51c28b6cf2054c4f9",
  measurementId: "G-KMCBF3GJV8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);