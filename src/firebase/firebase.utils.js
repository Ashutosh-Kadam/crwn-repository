import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyCZqD0-GNnrFqgBOmd3XUZcVu8WEb93KTQ",
    authDomain: "crown-db-f8f33.firebaseapp.com",
    projectId: "crown-db-f8f33",
    storageBucket: "crown-db-f8f33.appspot.com",
    messagingSenderId: "303585901378",
    appId: "1:303585901378:web:3f70e29f58f6e1d284a6db",
    measurementId: "G-645TEMT3PS"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

