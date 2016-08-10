// rest handler
var db = require('./dbHandler.js');

exports.sendtweet = function (req, res) {
    console.log('sendtweet');

    db.addTweet()
}

exports.gettweets = function (req, res) {
    console.log('gettweets');
    var parts = req.path.split('/');
    var userid = parts[3];

    db.getTweetsJSON(userid).then(
        (tweetsJSON) => {
            res.send(tweetsJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );   
}

exports.getfollowedtweets = function (req, res) {
    console.log('getfollowedtweets');
    console.log('path=' + req);
    var parts = req.path.split('/');
    var userid = parts[3];

    db.getFollowedTweetsJSON(userid).then(
        (tweetsJSON) => {
            res.send(tweetsJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );   
}

exports.getuserinfo = function (req, res) {
    console.log('getuserinfo');
    console.log('path=' + req);
    var parts = req.path.split('/');
    var userid = parts[3];

    db.getUserInfoJSON(userid).then(
        (userJSON) => {
            res.send(userJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );}

    exports.getfollowers = function (req, res) {
    console.log('getfollowers');
    console.log('path=' + req);
    var parts = req.path.split('/');
    var userid = parts[3];

    db.getFollowersJSON(userid).then(
        (usersJSON) => {
            res.send(usersJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );   
}
