import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnNXmDn4Xug_9yzDRqEVKcNS3fo2RHRMo",
  authDomain: "swiggyclone-2d6ac.firebaseapp.com",
  projectId: "swiggyclone-2d6ac",
  storageBucket: "swiggyclone-2d6ac.appspot.com",
  messagingSenderId: "60892076149",
  appId: "1:60892076149:web:fd69cfe9d4c166758e003c"
};

const app = initializeApp(firebaseConfig); 

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider}