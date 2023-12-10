import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC74G_NRtw3weVlYYR5v09M74hrfZKqCqQ",
  authDomain: "helplee2.firebaseapp.com",
  projectId: "helplee2",
  storageBucket: "helplee2.appspot.com",
  messagingSenderId: "456523829561",
  appId: "1:456523829561:web:869efa8149b128178198e8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db }