var express = require('express');
var servlet = require('./servlet-handler.js');
var rest = require('./rest-handler.js');
var app = express();
var bodyParser = require("body-parser");
var db = require('./dbHandler.js');
//var session = require('express-session');
var cookieParser = cookieParser = require('cookie-parser');
// Use the session middleware


db.initdb();
//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
//app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));
app.use(cookieParser());
app.use(express.static('webapp'));
app.use(function (req, res, next) {
  console.log('my filter path=' + req.path);
  next();
});

//app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/servlet/signon', servlet.signon);
app.post('/servlet/signup', servlet.signup);
app.get('/rest/sendtweet', rest.sendtweet);
app.get('/rest/tweets/*', rest.gettweets);
app.get('/rest/followedtweets/*', rest.getfollowedtweets);
app.get('/rest/userinfo/*', rest.getuserinfo);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function cookieHandler(req, res, next) {
    console.log('cookieHandler called.');
    next();
}

