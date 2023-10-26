const express = require('express');

const app = express();
const PORT = 3001;


app.use(express.json()); //Used to parse JSON bodies

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
app.post('/sendalert', (req, res) => {
    // req.body
    console.info('Alert received ::' , req.body)
    res.status(500).send(req.body)
});

app.use('/', express.static('public'))

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));