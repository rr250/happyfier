// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyCbfgRhgHE4sA1fxx1uYN77CN_GCQ5yH1I",
    authDomain: "happyfier.firebaseapp.com",
    databaseURL: "https://happyfier.firebaseio.com",
    projectId: "happyfier",
    storageBucket: "happyfier.appspot.com",
    messagingSenderId: "64560973553",
    appId: "1:64560973553:web:254bca329e65ae1a240b50",
    measurementId: "G-25EMJ5FQJS"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  // do what you want
  // ...
});
