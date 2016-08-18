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

var visual_recognition = watson.visual_recognition({
  api_key: '7f4c6ff49846adceb1e7df5ed12e1c4e3db3f9dc',
  version: 'v3',
  version_date: '2016-05-20'
});
var fs = require('fs');


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

app.get('/stores/:lat/:lng', function(req,res,next) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    findNearbyStore(lat,lng, function(stores) {
        res.json(stores);
    });
});

app.get('/classify', function(req,res,next) {
    imageClassify(function(response) {
        res.json(response);
    });
});

function findNearbyStore(latitude, longitude, callback) {

    var url = "https://api.foursquare.com/v2/venues/search?ll="+latitude+","+longitude+"&oauth_token=UMJ5I0PFQYPZ3IY30X4SUU01XRQL2DZWQPBC3SGM430X2IQZ&categoryId=52f2ab2ebcbc57f1066b8b46&v=20160818&limit=10"
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var stores = JSON.parse(body).response.venues;
            callback(stores);
        }
    })
}


function imageClassify(callback) {

    var params = {
      images_file: fs.createReadStream('new_image.jpg'),
      // url: 'http://www.englishteastore.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/t/p/tpgt_40b_pg-tips-40-count-tea-bags.jpg',
      // url: 'http://di3-2.shoppingshadow.com/pi/i.ebayimg.com/00/$(KGrHqV,!rkFDpdi)wO3BRCfg2GvgQ~~_32-540x540-0-0.JPG',
      classifier_ids: ['pgtips_1163458861']
    };

    visual_recognition.classify(params, function(err, watsonResponse) {
      if (err) {
        console.log(err);
      } else {
        //watsonResponse
        console.log(watsonResponse);
        
        //Get score and classification
        var images = watsonResponse.images;
        if (images[0].error) {
            return callback({err: images[0].error.description})
        }
        console.log(images[0]);
        if (images[0].classifiers.length > 0) {
            result = images[0].classifiers[0].classes[0];
            
            //this indicates a positive classification
            callback({classification: "PGTips", confidence: result.score})
        } else {
            callback({classification: "NotPGTips"});
        }
      }
    });

}