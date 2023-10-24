const express = require('express');
// const bodyParser = require('body-parser')
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

const app = express();
const PORT = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// Create a list containing up to 500 registration tokens.
// These registration tokens come from the client FCM SDKs.
// plant-power laptop / laptop_localhost / mobile_no_install 
const registrationTokens = [
    'fJ0W0LaRwhy9oNI1FyLt5E:APA91bHlN4Vt1sx5hEkxsjp-xKhYesyOhEqCsWpcICKGPzT16sZwQGzg_OOxpnq7ynVuFtYZBjzfJbYaYrDbh9fUmehLHPFAAgVwgPC34p5vsTOkQaj6HVqgM0Imj1X9z-dRAfwtJipy',
    'dhCLq_2aG0XcYRz3ONkY1Q:APA91bFmRiJEW4u3e_xgQc96HMEJNszk91DQRYw823Bl6D-4qYWBfQAe-NEyB67n2dl-At5w5gVh97WlF2O4oVzBKlJ9mXitjkfseqsWl2aUzsgqwagbC1_SZI48HUyys5bi9F0gUTJO',
    'cq8UumURJIjYvlq8uvtO4o:APA91bFSvEl_snvCMbSnejWsZvwym_SzQJm_AuXUJy6JZYmuQgbVQtIIbBY-j9NQ_oSH_QnYIEwhRckvnTqxg1W0Ufm-Ac3rUS-79t32FUerLf00wXJ7qXiVKP3osfjwQfyotFf6AmVh'
  ];


const messageTemplate = {
    tokens: registrationTokens,
    notification: {
        title: "🚰 Thirsty Plant 🪴",
        body: "Please water XYZ",
        click_action: 'https://prometheus.apps.microshift.is-in-the.cloud'
    },
 };

app.use(express.json()); //Used to parse JSON bodies

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/sendalert', (req, res) => {
    // req.body
    console.info('Alert received ::' , req.body)
    console.info('Sending message to FCM ::' , messageTemplate)
    admin.messaging().sendMulticast(messageTemplate)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        res.send(response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
        res.status(500).send(error);
    });



});
app.use('/', express.static('public'))

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));