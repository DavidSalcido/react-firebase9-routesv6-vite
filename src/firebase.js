import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey:               "AIzaSyBg_fxUP9cinznanMMykk9qxL1MATgdAmY",
  authDomain:           "react-firebase9-3a8a0.firebaseapp.com",
  projectId:            "react-firebase9-3a8a0",
  storageBucket:        "react-firebase9-3a8a0.appspot.com",
  messagingSenderId:    "171423967737",
  appId:                "1:171423967737:web:f64b80ebee18459bf33528"
};

const app   = initializeApp( firebaseConfig );
const auth  = getAuth( app );

export { auth };