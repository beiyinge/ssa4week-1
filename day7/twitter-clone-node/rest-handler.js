// rest handler
var db = require('./dbHandler.js');

exports.sendtweet = function (req, res) {
    console.log('sendtweet');

    db.addTweet()
}

exports.gettweets = function (req, res) {
    console.log('gettweets');
}

exports.userinfo = function (req, res) {
    console.log('userinfo');
}