import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const config = {
  apiKey: "AIzaSyCtW7GiC8YuAMDycTDJbliykHNJOxG8w30",
  authDomain: "expensetracker-d6671.firebaseapp.com",
  projectId: "expensetracker-d6671",
  storageBucket: "expensetracker-d6671.appspot.com",
  messagingSenderId: "500089976141",
  appId: "1:500089976141:web:022de0bfdaa7ec6ed5f304",
};

const firebaseApp = initializeApp(config);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
