import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'         


var config = {
  apiKey: "AIzaSyC0s-HS9ojuP4iOpqcqyihNzPBslTy_UFY",
  authDomain: "spmproject-be72b.firebaseapp.com",
  databaseURL: "https://spmproject-be72b.firebaseio.com",
  projectId: "spmproject-be72b",
  storageBucket: "spmproject-be72b.appspot.com",
  messagingSenderId: "353136296776"
  };
  firebase.initializeApp(config);
  
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;

