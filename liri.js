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
var fs = require('fs');

//getting API keys
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var command = process.argv[2];
var input = process.argv[3];

//Uses moment.js to log timestamps each time liri app is used
function logData(str = '', type = '', time = moment().format('MM/DD/YYYY hh:mm:ss')){

    if (type) {
        fs.appendFileSync('./log.txt', type + " request made at: " + time + '\n');
    }
    if (str) {
        console.log(str);
    
    fs.appendFileSync('./log.txt', str);
    }
}

//Twitter 
function getTweets() {
    logData('',"Tweet")

    twitter.get('statuses/user_timeline', function(err, response) {
        if(err) {
            return console.log(err);
        }
        for (tweet of response) {
            var timestamp = moment(tweet.created_at, 'ddd MMM DD hh:mm:ss ZZ YYYY').format('MM/DD/YY hh:mm:ss')

            logData(timestamp + ' ' + tweet.text + "\n");
        }
        logData('\n')
    });
}

//Spotify
function searchSong(title) {
    
    var track = {};

    if (title) {
        var params = {
            type: 'track',
            query: title,
            limit: 1
        }

        spotify.search(params, function(err, response) {
            
            if (err) {
                return console.log(err);
            }

            track = response.tracks.items[0];

            logData("Artist: " + track.artists[0].name + '\n' +
                "Song Name: " + track.name + '\n' +
                "Preview: " + track.preview_url + '\n' +
                "Album Name: " + track.album.name + '\n\n',
                "Song");
        
        });
    }   else {
        spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx').then(function(response) {
            
        track = response;

            logData("Artist: " + track.artists[0].name + '\n' +
                "Song Name: " + track.name + '\n' +
                "Preview: " + track.preview_url + '\n' +
                "Album Name: " + track.album.name + '\n\n',
                "Song");
        
        });
    } 
}

//OMDB
function searchMovie(title = "Mr. Nobody") {

    request('https://omdbapi.com/?t=' + title + '&apikey=trilogy', function(err, response, body) {
        var movie = JSON.parse(body);
        var tomatoScore = '';
        for( i of movie.Ratings) {
            i.Source === 'Rotten Tomatoes' ?
            tomatoScore = i.value : '';
        }

    logData(
        "Title: " + movie.Title + '\n' +
        "Year: " + movie.Year + '\n' +
        "IMDB Score: " + movie.imdbRating + '\n' +
        //"Rotten Tomatoes Rating: " + tomatoScore + '\n' +
        "Country: " + movie.Country + '\n' +
        "Language: " + movie.Language + '\n' +
        "Plot: " + movie.Plot + '\n' +
        "Actors: " + movie.Actors + '\n',
        "Movie"
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
        console.log('default case');
}




//client.stream('statuses/filter', {track: 'twitter'}, function(stream) {
    //stream.on('data', function(tweet) {
        //console.log(tweet.text);
    //});

    //stream.on('error', function(error) {
       // console.log(error);
    //});
//})