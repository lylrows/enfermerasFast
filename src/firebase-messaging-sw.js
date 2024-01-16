// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyAKrp4cBm_f1FnI3TbXWRmSMBB-TnMIfoA",
    authDomain: "enfermeras-ya.firebaseapp.com",
    projectId: "enfermeras-ya",
    storageBucket: "enfermeras-ya.appspot.com",
    messagingSenderId: "822462509669",
    appId: "1:822462509669:web:fca7373f29c4a16f5fcc8c",
    measurementId: "G-Z3LSRVLHPY"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();