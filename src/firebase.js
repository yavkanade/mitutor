import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClFcuPlgyKQWLXIdq9Ls3aRo6TztzgVfo",
    authDomain: "mitutor-7558f.firebaseapp.com",
    databaseURL: "https://mitutor-7558f-default-rtdb.firebaseio.com",
    projectId: "mitutor-7558f",
    storageBucket: "mitutor-7558f.appspot.com",
    messagingSenderId: "685238248812",
    appId: "1:685238248812:web:ef7e035716342d856fff49",
    measurementId: "G-GDBFR8XTNR"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;