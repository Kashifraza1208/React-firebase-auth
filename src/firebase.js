import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDplVshiKmR-o_5Bab3exGFCH_LSPyEoJg",
  authDomain: "react-authentication-28107.firebaseapp.com",
  projectId: "react-authentication-28107",
  storageBucket: "react-authentication-28107.appspot.com",
  messagingSenderId: "406798215961",
  appId: "1:406798215961:web:7159423fa81adcc9713388",
  measurementId: "G-LH9HV9MPZP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
export default app;
