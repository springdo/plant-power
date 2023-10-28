const express = require('express');
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
'f76XKAQ6OWcEUer07M7_F3:APA91bHajkK3eFXfwzMTMUMS_xEUb4X8C8eD6H0_Lz6VB1y2kKwH3mQr8ethChd4diwDnTZkLbNISdCOlSyiuTZ_sONzjmDjSwlIAYB3yZVPJoTXBRRFeOZP7TsUCFH3elBHbagqneVV',
'f76XKAQ6OWcEUer07M7_F3:APA91bHzDbCXrlwN14eQD6z_vJv98DldaXjP2P2_OgOeWA-ZskO0U297c9b1rWgXQq7y_UW7Guln9QYdPMSR_awAfYPiqTnRMErPsC9UvcQw_JzmboSLmBMa65ZPamfy5lDZy2PGT2YQ'
];




app.use(express.json()); //Used to parse JSON bodies

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/sendalert', async (req, res) => {
    // req.body
    let payload_returns = [];
    console.info('Alert received ::' , req.body)
    const fcm_sent = await req.body.alerts.forEach(item => {
        let messageTemplate = {
            tokens: registrationTokens,
            data: {
                title: "🚰 Thirsty Plant 🌻",
                body: "Please water XYZ 212",
                icon: 'https://plant-power.apps.microshift.is-in-the.cloud/plant.png'
            }
         };
        console.info("ALERT FIRING ::", item );
        messageTemplate.data.title = `🚰 Thirsty Plant - ${item.labels.sensor} 🪴`
        messageTemplate.data.body = `💦🪴 Please water plant ${item.labels.sensor} in the ${item.labels.instance}`
        console.info('Sending message to FCM ::' , messageTemplate)
        // fire and forget #YOLO otherwise have to deal with async nonsense :/
        admin.messaging().sendEachForMulticast(messageTemplate)
        // .then((response) => {
        //     // Response is a message ID string.
        //     console.info('Successfully sent message:', response);
        //     payload_returns.push(response)
        // })
        // .catch((error) => {
        //     console.log('Error sending message:', error);
        //     payload_returns.push(error)
        //     // res.status(500).send(error);
        // });
    })
    // fcm_sent.then(blah => {
        res.send(payload_returns);
    // }) 
});

app.use('/', express.static('public'))

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));