// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC5uZKGp2kmDpbAE97pBnzsoJchSulKidI",
  authDomain: "photogallery-8720c.firebaseapp.com",
  projectId: "photogallery-8720c",
  storageBucket: "photogallery-8720c.appspot.com",
  messagingSenderId: "293346924528",
  appId: "1:293346924528:web:05e2df189c6dc5c6e9af35",
  measurementId: "G-57LQZDZDKP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
