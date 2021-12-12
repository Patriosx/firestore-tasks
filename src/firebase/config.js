//imports
import firebase from "firebase/compat/app";
import "firebase/compat/storage"; // para almacenar las imagenes
import "firebase/compat/firestore"; //database
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIhNAgrplEqXLBC5FgF69u8z-C6agcj4c",
  authDomain: "crud-todolist-prt.firebaseapp.com",
  projectId: "crud-todolist-prt",
  storageBucket: "crud-todolist-prt.appspot.com",
  messagingSenderId: "453089745661",
  appId: "1:453089745661:web:604e7d7b66e00f16417c94",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Initialize our services
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//export the services so we can use them out in others files
export { db, timestamp };
