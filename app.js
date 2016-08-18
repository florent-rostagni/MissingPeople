/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});

var request = require('request');
var extend = require('util')._extend;
var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');

// For local development, replace username and password
var config = extend({
    version: 'v1',
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
    username: process.env.STT_USERNAME || '81cc0c95-cc5d-4a2e-8a70-94ea5ad19766',
    password: process.env.STT_PASSWORD || 'WpCRvLQfwZaf'
}, vcapServices.getCredentials('speech_to_text'));

var authService = watson.authorization(config);


app.get('/chat/:message', function (req, res, next) {
    var message = req.params.message;
    http: //baskit-red.eu-gb.mybluemix.net/rehack
        //    'http://localhost:6006/redapi/rehack/
        request('http://baskit-red.eu-gb.mybluemix.net/rehack/?q=' + message, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body));

                res.json(JSON.parse(body).output.text[0]);
            }
        })
});

app.post("/token", function (req, res, next) {
    // Get token using your credentials
    authService.getToken({
        url: config.url
    }, function (err, token) {
        if (err)
            next(err);
        else
            res.send(token);
    });
})