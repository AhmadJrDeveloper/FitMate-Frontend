// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm5zFJCZJN_bEaqnHb0LtnKe4-TrY9ltU",
  authDomain: "fitmate-ca74a.firebaseapp.com",
  projectId: "fitmate-ca74a",
  storageBucket: "fitmate-ca74a.appspot.com",
  messagingSenderId: "512867358780",
  appId: "1:512867358780:web:13a3db5a3ee24b5fbb4b39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);    