import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCokSRyO-A-dl8ITGnpUFGJ63JRxvpkY2Q",
  databaseURL: "https://my-firebase-d5fc6-default-rtdb.asia-southeast1.firebasedatabase.app/",
  authDomain: "my-firebase-d5fc6.firebaseapp.com",
  projectId: "my-firebase-d5fc6",
  storageBucket: "my-firebase-d5fc6.appspot.com",
  messagingSenderId: "22913109291",
  appId: "1:22913109291:web:3a15b4cc9454a0f294896e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database }