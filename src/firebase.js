import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage" 

const firebaseConfig = {
  apiKey: "AIzaSyBW9ia-Q1MnTHeqFY00yNSNvUKklZOpJfY",
  authDomain: "memehub-8613e.firebaseapp.com",
  projectId: "memehub-8613e",
  storageBucket: "memehub-8613e.appspot.com",
  messagingSenderId: "316222262435",
  appId: "1:316222262435:web:d36bcd0ab31c7c9d3b4316"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)