import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'         


var config = {
    apiKey: "AIzaSyCbfgRhgHE4sA1fxx1uYN77CN_GCQ5yH1I",
    authDomain: "happyfier.firebaseapp.com",
    databaseURL: "https://happyfier.firebaseio.com",
    projectId: "happyfier",
    storageBucket: "happyfier.appspot.com",
    messagingSenderId: "64560973553",
    appId: "1:64560973553:web:254bca329e65ae1a240b50",
    measurementId: "G-25EMJ5FQJS"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;