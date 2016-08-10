var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

exports.initdb = initdb;
function initdb() {
    var filename = 'scratch.db';
    var dbexists = false;
    try {
        fs.accessSync(filename);
        dbexists = true;
    } catch (ex) {
        dbexists = false;
    }

    var db = new sqlite3.Database('scratch.db');

    if (!dbexists) {
        db.serialize(function() {
            var createUserTableSql = "CREATE TABLE IF NOT EXISTS USER " +
                        "(USERID         CHAR(25)    PRIMARY KEY     NOT NULL," +
                        " NAME           CHAR(50)                    NOT NULL, " + 
                        " PASSWORD       CHAR(50)                    NOT NULL)"; 

            var createTweetTableSql = "CREATE TABLE IF NOT EXISTS TWEET " +
                        "(USERID        CHAR(25)    NOT NULL," +
                        " TWEET         CHAR(140)   NOT NULL, " + 
                        " DATE          TEXT        NOT NULL)"; 

            var createFollowerTableSql = "CREATE TABLE IF NOT EXISTS FOLLOWER " +
                        "(USERID        CHAR(25)    NOT NULL," +
                        " FOLLOWERID    CHAR(140)   NOT NULL)"; 

            db.run(createUserTableSql);
            db.run(createTweetTableSql);
            db.run(createFollowerTableSql);

            var insertUserSql = "INSERT INTO USER (USERID, NAME, PASSWORD) " +
                "VALUES ('shuvo',   'Shuvo Ahmed',      'shuvopassword')," +
                    "('abu',     'Abu Moinuddin',    'abupassword')," +
                    "('charles', 'Charles Walsek',   'charlespassword')," +
                    "('beiying', 'Beiying Chen',     'beiyingpassword')," +
                    "('swarup',  'Swarup Khatri',    'swarup');"; 
            
            var insertFollowerSql = "INSERT INTO FOLLOWER (USERID, FOLLOWERID) " +
            "VALUES ('shuvo', 'abu')," +
                    "('abu', 'swarup')," +
                    "('abu', 'charles')," +
                    "('beiying', 'shuvo');";
                    

            var insertTweetSql = "INSERT INTO TWEET (USERID, TWEET, DATE) " +
                "VALUES ('shuvo',      'Welcome to Tweeter Clone',                     '2016-08-05 12:45:00'), " +
                        "('abu',        'Tweet by Abu',                                 '2016-08-05 12:46:00'), " +
                        "('abu',        'Lets do Node.js',                              '2016-08-08 12:46:00'), " +
                        "('abu',        'Lunch Time!',                                  '2016-08-08 12:30:00'), " +
                        "('abu',        'We are in 2-nd week of boot camp training!',   '2016-08-08 08:30:00'), " +
                        "('shuvo',      'SQLite is easy configuration!',                '2016-08-05 09:30:00'), " +
                        "('shuvo',      'Rio Olympic!',                                 '2016-08-05 09:30:00'), " +
                        "('shuvo',      'Welcome to 2nd week of boot camp...',          '2016-08-08 08:30:00'), " +
                        "('charles',    'SQLite is cool!',                              '2016-08-05 11:30:00'), " +
                        "('charles',    'Not bad for a Mainframe developer...',         '2016-08-08 09:30:00'), " +
                        "('charles',    'Having fun with HTML / CSS!',                  '2016-08-05 11:30:00'), " +
                        "('charles',    'Github!',                                      '2016-08-05 11:30:00'), " +
                        "('beiying',    'Twitter - Cloned!',                            '2016-08-08 13:30:00'), " +
                        "('swarup',     'Tweet, tweet!',                                '2016-08-05 11:30:00'), " +
                        "('shuvo',      'First week of boot camp complete!',            '2016-08-05 16:47:00');"; 
        
            db.run(insertFollowerSql);
            db.run(insertUserSql);
            db.run(insertTweetSql);

            db.each("SELECT * FROM TWEET", function(err, row) {
                console.log(row.USERID + ": " + row.TWEET);
            });
        });
    }   
    db.close();
}

exports.addTweet = addTweet;
function addTweet(userId, msg) {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database('scratch.db');
        var insertTweetSql = "INSERT INTO TWEET (USERID, TWEET, DATE) " +
                "VALUES ('" + userId + "','" + msg + "', '" + Date.now() + "');";
        db.run(insertTweetSql, (err) => {
            if(err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

exports.getFollowersJSON = getFollowersJSON;
function getFollowersJSON(userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT USERID, FOLLOWERID FROM FOLLOWER "
            + "  WHERE USERID = '" + userId + "'";
        var followers = [];
        db.each(query,
            function(err, row) {
                followers.push(row.FOLLOWERID);
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(JSON.stringify(followers));
                }
        });
    });
}

exports.getTweetsJSON = getTweetsJSON;
function getTweetsJSON(userId) {
    return new Promise((resolve, reject) => {
        console.log('getTweetsJSON');
        var db = new sqlite3.Database('scratch.db');
        var query = "SELECT TWEET, DATE FROM TWEET "
            + "  WHERE USERID = '" + userId + "'";
        var tweets = [];
        db.each(query,
            function(err, row) {
                var tweet = { user: userId, msg: row.TWEET, date: row.DATE};
                tweets.push(tweet);
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    tweets.sort(descDateCompare);
                    resolve(JSON.stringify(tweets));
                }
        });
    });
}


exports.getFollowedTweetsJSON = getFollowedTweetsJSON;
function getFollowedTweetsJSON(userId) {
    return new Promise((resolve, reject) => {
        console.log('getFollowedTweetsJSON');
        var db = new sqlite3.Database('scratch.db');
        var query = "SELECT T.USERID, T.TWEET, T.DATE, F.USERID as FOLLOWERID FROM TWEET T, FOLLOWER F "
            + " WHERE T.USERID = F.USERID AND F.FOLLOWERID = '" + userId + "'";
        console.log('query=' + query);
        var tweets = [];
        db.each(query,
            function(err, row) {
                var tweet = { userId: row.USERID, msg: row.TWEET, 
                            date: row.DATE };
                tweets.push(tweet);
                console.log(JSON.stringify(tweet));
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    tweets.sort(descDateCompare);
                    resolve(JSON.stringify(tweets));
                }
        });
    });
}

function descDateCompare(a, b) {
    // sort in descending date order
    var aDate = new Date(a.date);
    var bDate = new Date(b.date);

    if(bDate > aDate) {

        return(-1);
    }
    else if(bDate < aDate) {

        return(1);
    }
    else {

        return(0);
    }  
}

exports.getUserInfoJSON = getUserInfoJSON;
function getUserInfoJSON(userId) {
    return new Promise((resolve, reject) => {
        console.log('getUserInfo');
        var db = new sqlite3.Database('scratch.db');
        var query = "SELECT NAME FROM USER "
            + "  WHERE USERID = '" + userId + "'";
        var user;
        db.each(query,
            function(err, row) {
                user = { userId: userId, name: row.NAME };
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    resolve(JSON.stringify(user));
                }
        });
    });
}
/*
initdb();
var db = new sqlite3.Database('scratch.db');
getFollowersJSON('abu').then(
    (followers) => {
        console.log('followers = ' + followers);
    }).catch((err) => {
        console.log('db error = ' + err);
    }
);

db.close();
*/