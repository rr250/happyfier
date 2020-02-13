const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification=(notification=>{
    return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc=>console.log('notification added', doc))
})

exports.projectCreated = functions.firestore
.document('projects/{projectId}')
.onCreate((snap, context)=>{
    const project=snap.data();
    if(project.anon===false && project.diary===false){
      const notification={
          content: 'Added a new project',
          user: project.authorFirstName,
          time: admin.firestore.FieldValue.serverTimestamp(),
      };
      return createNotification(notification);
    }
});

exports.userJoined = functions.auth.user()
.onCreate(user=>{
    return admin.firestore().collection('users')
    .doc(user.uid).get().then(snap=>{
        const newUser = snap.data();
        const notification={
            content: 'Joined the party',
            user: newUser.firstName,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
    })
});

// exports.scheduledFunction = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
//     console.log('This will be run every 5 minutes!');
//     return null;
//   });
  
// exports.scheduledFunctionCrontab = functions.https.onRequest(function (req, res) {
//   console.log('This will be run every day at 11:05 AM Eastern!');
//   res.status(200).send({ message: 'Hello' });
// });

// exports.scheduledFunctionCrontab = functions.pubsub.schedule('5 11 * * *')
//   .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
//   .onRun((context) => {
//   console.log('This will be run every day at 11:05 AM Eastern!');
//   return null;
// });

exports.projectNotification = functions.firestore
.document('projects/{projectId}')
.onCreate((snap, context)=>{
    const project=snap.data();
    if(project.anon===false && project.diary===false){
      const message= {
        topic: "all",
        notification: {
          title: 'New Post',
          body: project.authorFirstName+' '+'Added a new project',
        },
        webpush: {
          fcm_options: {
            link: "https://happyfier.firebaseapp.com/"
          }
        }
      }

      return sendNotification(message)
    }
});

exports.onTokenWrite = functions.firestore
    .document('users/{userId}').onWrite((change, context) => {
    // ... Your code here
    const doc = change.after.exists ? change.after.data() : null;
    const oldDoc= change.before.data();
    if(doc.token!=='' && doc.token!==oldDoc.token){
        return subscribeToken([doc.token],'all')
    }
});

const subscribeToken =(registrationTokens,topic)=>{
    return admin.messaging().subscribeToTopic(registrationTokens, topic)
        .then(function(response) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully subscribed to topic:', response);
        })
        .catch(function(error) {
            console.log('Error subscribing to topic:', error);
})};

const sendNotification =(message)=>{
    return admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}