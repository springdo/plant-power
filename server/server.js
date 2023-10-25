const express = require('express');
const bodyParser = require('body-parser')
const admin = require("firebase-admin");
const serviceAccount = require("./secrets/firebase.json");

const app = express();
const PORT = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// Create a list containing up to 500 registration tokens.
// These registration tokens come from the client FCM SDKs.
const registrationTokens = [
'f5gthoppsAPamTa2-b-d56:APA91bHSOiXuLFwpzUIZgbLrQ0E-As684Y4mXI_VLp63b3mFQ77a5EMlkdQdDtn7GMHQ13oCyhMwDIVgnJwQUZzYChbxGQnMCrw9TT44uimjvAWpgINooYzhF85rlFvQIa7jl9uD82bt',
'fJ0W0LaRwhy9oNI1FyLt5E:APA91bHlN4Vt1sx5hEkxsjp-xKhYesyOhEqCsWpcICKGPzT16sZwQGzg_OOxpnq7ynVuFtYZBjzfJbYaYrDbh9fUmehLHPFAAgVwgPC34p5vsTOkQaj6HVqgM0Imj1X9z-dRAfwtJipy',
'f76XKAQ6OWcEUer07M7_F3:APA91bHajkK3eFXfwzMTMUMS_xEUb4X8C8eD6H0_Lz6VB1y2kKwH3mQr8ethChd4diwDnTZkLbNISdCOlSyiuTZ_sONzjmDjSwlIAYB3yZVPJoTXBRRFeOZP7TsUCFH3elBHbagqneVV'
];


const messageTemplate = {
    tokens: registrationTokens,
    data: {
        title: "🚰 Thirsty Plant 🌻",
        body: "Please water XYZ 212",
        icon: 'https://plant-power.apps.microshift.is-in-the.cloud/plant.png'
    },
    fcm_options: {
        link: 'https://prometheus.apps.microshift.is-in-the.cloud'
    }
 };

app.use(express.json()); //Used to parse JSON bodies

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/sendalert', (req, res) => {
    // req.body
    console.info('Alert received ::' , req.body)
    console.info('Sending message to FCM ::' , messageTemplate)
    admin.messaging().sendEachForMulticast(messageTemplate)
    .then((response) => {
        // Response is a message ID string.
        console.info('Successfully sent message:', response);
        res.send(response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
        res.status(500).send(error);
    });



});
app.use('/', express.static('public'))

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));