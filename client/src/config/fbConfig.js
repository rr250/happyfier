import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'         
import "firebase/messaging"


var config = {

  };
  const initializedFirebaseApp = firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;

  const messaging = initializedFirebaseApp.messaging();

  messaging.usePublicVapidKey(
    "BOxGc_2ECYYe1fpFbFXdK............bCs9phjGmWvQeung9O0cFdo"
  );

  export { messaging };
