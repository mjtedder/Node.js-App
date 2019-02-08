//todo:
//get "do-what-it-says" command working for liri bot
//

require("dotenv").config();

//setting variables to require NPM packages for app to work
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var request = require('request');
var axios = require('axios');
var fs = require('fs');

//getting API keys
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

// saving user inputs to a variable
var command = process.argv[2];
var input = process.argv[3];

//Uses moment.js to log timestamps each time liri app is used
function logData(str = '', type = '', time = moment().format('MM/DD/YYYY hh:mm:ss')) {

    if (type) {
        fs.appendFileSync('./log.txt', type + " request made at: " + time + '\n');
    }
    if (str) {
        console.log(str);

        fs.appendFileSync('./log.txt', str);
    }
}

//Twitter=======================================================
function getTweets() {
    logData('', "Tweet")

    twitter.get('statuses/user_timeline', function (err, response) {
        if (err) {
            return console.log(err);
        }
        for (tweet of response) {
            var timestamp = moment(tweet.created_at, 'ddd MMM DD hh:mm:ss ZZ YYYY').format('MM/DD/YY hh:mm:ss')

            logData(timestamp + ' ' + tweet.text + "\n");
        }
        logData('\n')
    });
}

//Get names of various artists=============================
var getArtistNames = function (artist) {
    return artist.name;
}

//Spotify=================================================
var searchSong = function (title) {

    if (title === undefined) {
        title = "All Apologies";
    }

    spotify.search({
            type: 'track',
            query: title
        },
        function (err, response) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var tracks = response.tracks.items;

            for (var i = 0; i < tracks.length; i++) {

                logData("Artist: " + tracks[i].artists.map(getArtistNames) + '\n' +
                    "Song Name: " + tracks[i].name + '\n' +
                    "Preview: " + tracks[i].preview_url + '\n' +
                    "Album Name: " + tracks[i].album.name + '\n\n', +
                    "------------------------------------------------")
            }
        })
}

//OMDB
var searchMovie = function (movieTitle) {
    if (movieTitle === undefined) {
        movieTitle = "Eternal Sunshine Of The Spotless Mind"
    }

    var queryUrl = 'https://omdbapi.com/?t=' + movieTitle + '&y=&plot=full&tomatoes=true&apikey=trilogy'

    axios.get(queryUrl).then(
        function (response) {
            var movie = response.data;
            logData(
                "Title: " + movie.Title + '\n' +
                "Year: " + movie.Year + '\n' +
                "IMDB Score: " + movie.imdbRating + '\n' +
                "Rotten Tomatoes Rating: " + movie.Ratings[1].Value + '\n' +
                "Country: " + movie.Country + '\n' +
                "Language: " + movie.Language + '\n' +
                "Plot: " + movie.Plot + '\n' +
                "Actors: " + movie.Actors + '\n',
                "-----------------------------------------------------------"
            );
        });

}

if (!command) {
    var data = fs.readFileSync('./random.txt', 'utf8');
    var arr = data.split(',');
    comand = arr[0];
    input = arr[1];
}


//using switch-case statements to givi liri bot commands
switch (command) {
    case 'get-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        searchSong(input);
        break;
    case 'movie-this':
        searchMovie(input);
        break;
    default:
        console.log("I'm sorry, LIRI doesn't recognize that command.");
}




//client.stream('statuses/filter', {track: 'twitter'}, function(stream) {
//stream.on('data', function(tweet) {
//console.log(tweet.text);
//});

//stream.on('error', function(error) {
// console.log(error);
//});
//})