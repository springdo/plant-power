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
    // TURNING OFF THE ACTIONS AS THEY SEEM TO JUST WORK ON THE LAPTOP?
    // actions: [{
    //   action: 'OPEN_PROM',
    //   title: 'Prometheus'
    // },{
    //   action: 'OPEN_GRAFANA',
    //   title: 'Grafana'
    // }],
    badge: './plant-icon.png',
    icon: './flower-icon.png',
    badge: 'https://plant-power.apps.microshift.is-in-the.cloud/plant.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener( "notificationclick",
  (event) => {
    event.notification.close();
    console.info("Firebase SW: notificationclick event ::", event)
    if (event.action === "OPEN_PROM") {
      console.info("Firebase SW: OPEN_PROM")
      // User selected the Archive action.
      clients.openWindow(`/?event=${event.action}`)
      // windowClient.navigate("https://prometheus.apps.microshift.is-in-the.cloud")
    } else if (event.action === "OPEN_GRAFANA") {
      console.info("Firebase SW: OPEN_GRAFANA")
      // User selected the Archive action.
      clients.openWindow("https://grafana.apps.microshift.is-in-the.cloud");
    } else {
      // User selected (e.g., clicked in) the main body of notification.
      // clients.openWindow(`/?event=${JSON.stringify(event)}`);
      clients.openWindow(`/?event=${event.action}`);
    }
  },false,);