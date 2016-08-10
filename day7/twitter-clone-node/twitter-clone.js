var express = require('express');
var servlet = require('./servlet-handler.js');
var rest = require('./rest-handler.js');
var app = express();
var bodyParser = require("body-parser");
var db = require('./dbHandler.js');
var cookieParser = require('cookie-parser')

db.initdb();

app.use(express.static('webapp'));
app.use(cookieParser;
app.use(cookieHandler);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/servlet/signon', servlet.signon);
app.post('/servlet/signup', servlet.signup);
app.get('/rest/sendtweet', rest.sendtweet);
app.get('rest/tweets/', rest.gettweets);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function cookieHandler(req, res, next) {
    console.log('cookieHandler called.');
    next();
}

