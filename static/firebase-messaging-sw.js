importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAOwX71ihpi5p4W4yxUy6zzJN9sdZAsGqI",
    authDomain: "plant-power-834e3.firebaseapp.com",
    projectId: "plant-power-834e3",
    storageBucket: "plant-power-834e3.appspot.com",
    messagingSenderId: "246926058220",
    appId: "1:246926058220:web:86829f2317725b009c7bc9",
    measurementId: "G-PTVC5BYXEL"
  });


// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Firebase SW: Received background message ', payload);

  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: '/icon.png'
  // };

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});