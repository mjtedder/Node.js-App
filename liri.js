// REQUIRED DEPENDENCIES =============================================
require('dotenv').config()
var moment = require('moment')
var axios = require('axios')
var fs = require('fs')
var keys = require('./keys')
var Spotify = require('node-spotify-api')
var chalk = require('chalk')
var Twitter = require('twitter')


// KEYS ==============================================================
var spotify = new Spotify(keys.spotify)
var t = new Twitter(keys.twitter)

// SAVE CONSOLE.LOG METHOD TO VARIABLE================================
var log = console.log

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
        case 'get-tweets':
            getTweets(input)
            break;
        case 'do-what-it-says':
            doThis();
            break;
        default:
            log(chalk.greenBright("\nI'm sorry, LIRI doesn't recognize that command.\n"))
            log(chalk.greenBright('Commands that LIRI recognizes include:\n'))
            log(chalk.greenBright(" spotify-this-song \n movie-this \n concert-this \n get-tweets \n do-what-it-says \n"))
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
            log(chalk.greenBright('\nTitle: ' + movie.Title + '\n' +
                'Year: ' + movie.Year + '\n' +
                'IMDB Score: ' + movie.imdbRating + '\n' +
                'Rotten Tomatoes Rating: ' + movie.Ratings[1].Value + '\n' +
                'Country: ' + movie.Country + '\n' +
                'Language: ' + movie.Language + '\n' +
                'Plot: ' + movie.Plot + '\n' +
                'Actors: ' + movie.Actors + '\n',
                '----------------------------------------------------------------------------------------------'))
        }).catch(function (error) {
            log(chalk.redBright(error))
        })
}

// 'concert-this' (Bands In Town API)=================================
function bandsThis(input) {
    var queryUrl = 'https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp&date=upcoming'
    axios.get(queryUrl)
        .then(function (response) {
            var jsonData = response.data
            for (i = 0; i < jsonData.length; i++) {
                log(chalk.greenBright('\nName: ' + input + '\n' +
                'Venue: ' + jsonData[i].venue.name + '\n' +
                'Location: ' + jsonData[i].venue.city + ', ' + jsonData[i].venue.region + '\n' +
                'Date: ' + moment(jsonData[i].datetime).format('MMMM Do YYYY') + '\n' +
                '-----------------------------------------------------------------------'))

            }
        }).catch(function (error) {
            log(chalk.redBright(error))
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
            console.log(colors.body('Result ' + i +'\n' +
            'Track: ' + song[i].name + '\n' +
            'Artist(s): ' + song[i].artists.map(getArtistNames) + '\n' +
            'URL: ' + song[i].href + '\n' +
            'Album: ' + song[i].album.name + '\n' +
            '-----------------------------------------------------------'))
        }
    }).catch(function (err) {
        log(chalk.redBright(err))
    })
}

// 'get-tweets' (twitter API)
function getTweets(input) {
    // set up params
    var params = {
        q: input,
        count: 10,
        result_type: 'recent',
        lang: 'en'
    }
    t.get('search/tweets', params, function(err, data, response) {
        if(!err) {
            // loop through the returned tweets
            for(let i = 0; i < data.statuses.length; i++) {
                // Get the tweet ID of the returned data
                // var id = { id: data.statuses[i].id_str }
                var name = data.statuses[i].user.screen_name
                var text = data.statuses[i].text
                var url = data.statuses[i].user.url
                var followers = data.statuses[i].user.followers_count
                var createdAt = data.statuses[i].user.created_at
                log(chalk.greenBright('\nTwitter Handle: ' + '@' + name + '\n' +
                'Tweet: ' + text + '\n' +
                'Followers: ' + followers + '\n' +
                'Date Tweeted: ' + moment(createdAt).format('MMM Do YYYY, h:mm:ss a') + '\n' +
                '-------------------------------------------------'))
            }
        } else {
            log(chalk.redBright(err))
        }
    })
}


// 'do-what-it-says' (fs.readFile)====================================
function doThis(input) {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if(error) {
            return log(chalk.redBright(error))
        }
        // console.log(colors.body(data));
        var dataArray = data.split(',')
        if (dataArray.length === 2) {
            startApp(dataArray[0], dataArray[1])
        } else if (dataArray.length === 1) {
            startApp(dataArray[0])
        }
    })
}

// CALL START FUNCTION ===============================================

startApp(command, input)