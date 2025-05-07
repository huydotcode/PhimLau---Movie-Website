import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getRemoteConfig } from "firebase/remote-config";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, "gs://handbook-65d51.appspot.com");
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 0; // Không cache

// Nếu sử dụng emulator, bỏ comment các dòng dưới đây
// if (window.location.hostname === "localhost") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }
// if (window.location.hostname === "localhost") {
//   connectAuthEmulator(auth, "http://localhost:9099");
// }

export { auth, db, storage, remoteConfig };
