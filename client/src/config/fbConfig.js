import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'         


var config = {
    apiKey: "AIzaSyBNaJoopMrbQtZYOHu5kwV1L27Ivgt-eh4",
    authDomain: "react-redux-firebase-d11f2.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-d11f2.firebaseio.com",
    projectId: "react-redux-firebase-d11f2",
    storageBucket: "react-redux-firebase-d11f2.appspot.com",
    messagingSenderId: "757675809758"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;