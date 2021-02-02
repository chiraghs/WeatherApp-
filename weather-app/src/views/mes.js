import * as firebase from 'firebase/app'

import 'firebase/messaging'

var firebaseConfig = require(`../config/firebase-secrets.js`)

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
  });

/* messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  }); */