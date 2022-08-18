// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
  
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyBBpv9TslkHe6DNa4Ip7RIh4tr4LKtPuc8",
    authDomain: "instagram-clone-v1-cb015.firebaseapp.com",
    projectId: "instagram-clone-v1-cb015",
    storageBucket: "instagram-clone-v1-cb015.appspot.com",
    messagingSenderId: "237186535357",
    appId: "1:237186535357:web:d4605fa647d51d9ee50cd4",
    measurementId: "G-1QML3KJ0SW"
  });

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const storage = getStorage();

  export {db,auth,storage};

//   export default db; 