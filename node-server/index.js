const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const axios = require('axios');
const querystring = require('querystring');
const envToken = require('./env.js');
const token = process.env.token || envToken;
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': 'b9101fd1-37c4-4d23-9366-b9af5cc95bab',
    'password': 'd7kb4FwXUbCk',
    'version': '2018-03-16'
});
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    username: 'b9101fd1-37c4-4d23-9366-b9af5cc95bab',
    password: 'd7kb4FwXUbCk'
  });


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
        res.json(response.data);
    })
    .catch( (error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

app.post('/analyzesong', async (req, res) => {
    const lyrics = req.body.lyrics;

    const parameters = {
        'text': lyrics ,
        'features': {
          'emotion': {
          },
          'concepts': {
              'limit': 8
          },
          'entities': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
          },
          'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 3
          }
        }
    };

    try {

        natural_language_understanding.analyze(parameters, function(err, response) {
            if (err) {
                console.log('error:', err);
                res.sendStatus(404);
            } else {
                console.log('RESPONSE FROM NLU', JSON.stringify(response, null, 2));
                res.send(JSON.stringify(response, null, 2));
                // var text = req.body.lyrics;

                // var toneParams = {
                //   'tone_input': { 'text': text },
                //   'content_type': 'application/json'
                // };
                // toneAnalyzer.tone(toneParams, function (error, analysis) {
                //   if (error) {
                //     console.log(error);
                //   } else {
                //       const responseObject = {
                //           nlu: JSON.stringify(response, null, 2),
                //           tone: JSON.stringify(analysis, null, 2)
                //       };
                //     console.log('RESPONSE FROM TONE', JSON.stringify(analysis, null, 2));
                //     res.send(responseObject);
                //   }
                // }); 0;
            }
        });
    } catch(error) {
        res.sendStatus(404);
    }
});

app.listen(PORT, ()=> {
    console.log(`App listening on ${PORT}`);
});