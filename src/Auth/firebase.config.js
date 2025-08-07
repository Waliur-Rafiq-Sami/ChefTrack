// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC41-9M4RtpxaU9wSn8WRCxhsIW2jtGIFI",
  authDomain: "cheftrack-ee7fd.firebaseapp.com",
  projectId: "cheftrack-ee7fd",
  storageBucket: "cheftrack-ee7fd.firebasestorage.app",
  messagingSenderId: "363446882076",
  appId: "1:363446882076:web:c0c73c311f2bdcb59bf4d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
