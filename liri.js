require("dotenv").config();

var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var command = process.argv[2];
var input = process.argv[3];

function log_Data(str = '', type = '', time = moment().format('MM/DD/YYYY hh:mm:ss')){

    if (type) {
        fs.appendFileSync('./log.txt', type + " request made at: " + time + '\n');
    }
    if (str) {
        console.log(str);
    
    fs.appendFileSync('./log.txt', str);
    }
}

function get_Tweets() {
    log_Data('',"Tweet")

    twitter.get('statuses/user_timeline', function(err, response) {})

client.stream('statuses/filter', {track: 'twitter'}, function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet.text);
    });

    stream.on('error', function(error) {
        console.log(error);
    });
})