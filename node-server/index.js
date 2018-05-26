const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const axios = require('axios');
const querystring = require('querystring');
const token = require('./env.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/token', (req, res) => {

    let body = {
        grant_type: 'client_credentials'
    };
    body = querystring.stringify(body);
    const url = 'https://accounts.spotify.com/api/token';
    const options = {
        method: 'POST',
        headers: { 
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        data: body,
        url,
    };
    axios(options)
    .then( (response) => {
        console.log(response);
        res.json(response.data);
    })
    .catch( (error) => {
        console.log(error);
        res.sendStatus(500);
    });

});

app.listen(PORT, ()=> {
    console.log(`App listening on ${PORT}`);
});