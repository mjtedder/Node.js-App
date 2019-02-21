// REQUIRED DEPENDENCIES =============================================
require('dotenv').config()
var moment = require('moment')
var axios = require('axios')
var fs = require('fs')
var keys = require('./keys')
var Spotify = require('node-spotify-api')


// KEYS ==============================================================
var spotify = new Spotify(keys.spotify)

// SAVING USER INPUT TO VARIABLES ====================================
var command = process.argv[2]
var multipleWords = process.argv.slice(3)
var input = multipleWords.join(' ')


// SWITCH-CASE STATEMENT FOR LIRI COMMANDS ===========================
function startApp(command, input) {
    switch (command) {
        case 'concert-this':
            bandsThis(input)
            break;
        case 'spotify-this-song':
            spotifyThis(input)
            break;
        case 'movie-this':
            movieThis(input)
            break;
        case 'do-what-it-says':
            doThis();
            break;
        default:
            console.log("\nI'm sorry, LIRI doesn't recognize that command.\n");
            console.log('Commands that LIRI recognizes include:\n')
            console.log("spotify-this-song \n movie-this \n concert-this \n do-what-it-says \n")

    }
}

// 'movie-this' (OMDB API)============================================

function movieThis(input) {
    if (input === undefined) {
        input = 'Mr Nobody'
    }
    var queryUrl = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=full&tomatoes=true&apikey=trilogy'
    axios.get(queryUrl)
        .then(function (response) {
            var movie = response.data
            console.log('\nTitle: ' + movie.Title + '\n' +
                'Year: ' + movie.Year + '\n' +
                'IMDB Score: ' + movie.imdbRating + '\n' +
                'Rotten Tomatoes Rating: ' + movie.Ratings[1].Value + '\n' +
                'Country: ' + movie.Country + '\n' +
                'Language: ' + movie.Language + '\n' +
                'Plot: ' + movie.Plot + '\n' +
                'Actors: ' + movie.Actors + '\n',
                '----------------------------------------------------------------------------------------------')
        }).catch(function (error) {
            console.log(error)
        })
}

// 'concert-this' (Bands In Town API)=================================
function bandsThis(input) {
    var queryUrl = 'https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp&date=upcoming'
    axios.get(queryUrl)
        .then(function (response) {
            var jsonData = response.data
            for (i = 0; i < jsonData.length; i++) {
                console.log('\nName: ' + input)
                console.log('Venue: ' + jsonData[i].venue.name)
                console.log('Location: ' + jsonData[i].venue.city + ', ' + jsonData[i].venue.region)
                console.log('Date: ' + moment(jsonData[i].datetime).format('MMMM Do YYYY'))
                console.log('-----------------------------------------------------------------------')

            }
        }).catch(function (error) {
            console.log(error)
        })
}

// getArtistNames helper function
var getArtistNames = function(artist) {
    return artist.name
}

// 'spotify-this-song' (Spotify API)==================================
function spotifyThis(input) {
    spotify.search({
        type: 'track',
        query: input
    }).then(function (response) {
        var song = response.tracks.items
        for (var i = 0; i < song.length; i++) {
        console.log('Result ' + i)
        console.log('Track: ' + song[i].name)
        console.log('Artist(s): ' + song[i].artists.map(getArtistNames))
        console.log('URL: ' + song[i].href)
        console.log('Album: ' + song[i].album.name)
        console.log('-----------------------------------------------------------')
    }
    }).catch(function (err) {
        console.log(err)
    })
}






// 'do-what-it-says' (fs.ReadFile)====================================


// CALL START FUNCTION ===============================================

startApp(command, input)