const express = require('express');
// const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(express.json()); //Used to parse JSON bodies

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/sendalert', (req, res) => {
    // req.body
    console.info('Sending Alert :' , req.body)
    res.send(req.body);
});
app.use('/', express.static('public'))

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));