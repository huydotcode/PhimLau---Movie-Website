import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// const firebaseConfig2 = {
//   apiKey: "AIzaSyAAe0C4ryoKHUvXFyo8jA7i5j60Syv_Eo0",
//   authDomain: "handbook-65d51.firebaseapp.com",
//   projectId: "handbook-65d51",
//   storageBucket: "handbook-65d51.appspot.com",
//   messagingSenderId: "86530240967",
//   appId: "1:86530240967:web:b9ed1e8d3245ff62f0e9e2",
// };

const app = initializeApp(firebaseConfig);
// const app2 = initializeApp(firebaseConfig2);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, "gs://handbook-65d51.appspot.com");

export { auth, db, storage };
