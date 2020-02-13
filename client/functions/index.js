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
.onCreate(doc=>{
    const project=doc.data();
    const notification={
        content: 'Added a new project',
        user: project.authorFirstName,
        projectId: project.projectId,
        time: admin.firestore.FieldValue.serverTimestamp()
    };
    return createNotification(notification);
});

exports.userJoined = functions.auth.user()
.onCreate(user=>{
    return admin.firestore().collection('users')
    .doc(user.uid).get().then(doc=>{
        const newUser = doc.data();
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
  
exports.scheduledFunctionCrontab = functions.https.onRequest(function (req, res) {
  console.log('This will be run every day at 11:05 AM Eastern!');
  res.status(200).send({ message: 'Hello' });
});

exports.scheduledFunctionCrontab = functions.pubsub.schedule('5 11 * * *')
  .timeZone('America/New_York') // Users can choose timezone - default is America/Los_Angeles
  .onRun((context) => {
  console.log('This will be run every day at 11:05 AM Eastern!');
  return null;
});