const express = require('express');
const Client = require('node-rest-client').Client;
const client = new Client();
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors());
app.use(bodyParser());

app.post('/auth', (req, res) => {
    if(!req.body.clientId || !req.body.clientSecret) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ 'error': 'ClientId or ClientSecret not provided' }));
    } else {
        let url = 'https://accounts.spotify.com/api/token';
        let args = {
            data: 'grant_type=client_credentials',
            headers: { 
                'Authorization': `Basic ${Buffer.from(req.body.clientId + ':' + req.body.clientSecret).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        client.post(url, args, (data, response) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        });
    }
});

app.listen(port, () => {
    console.log(`Server is Up on PORT ${port}`);
});