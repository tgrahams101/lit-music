const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const axios = require('axios');
const querystring = require('querystring');
const envToken = require('./env.js');
const token = process.env.token || envToken;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get('/api/token', (req, res) => {
    console.log('TOKEN IN ENV VARIABLE', token);
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