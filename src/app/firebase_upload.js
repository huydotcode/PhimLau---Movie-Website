// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAe0C4ryoKHUvXFyo8jA7i5j60Syv_Eo0",
  authDomain: "handbook-65d51.firebaseapp.com",
  projectId: "handbook-65d51",
  storageBucket: "handbook-65d51.appspot.com",
  messagingSenderId: "86530240967",
  appId: "1:86530240967:web:b9ed1e8d3245ff62f0e9e2",
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig, "app2");
const storage2 = getStorage(app2);

export { app2, storage2 };
