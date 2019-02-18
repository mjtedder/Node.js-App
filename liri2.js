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
            console.log(input)
            //bandsThis(input)
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
    var queryUrl = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=full&tomatoes=true&apikey=trilogy'
    axios.get(queryUrl)
    .then(function (response){
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
    }).catch(function(error){
        console.log(error)
    })
}




// 'concert-this' (Bands In Town API)=================================









// 'spotify-this-song' (Spotify API)==================================








// 'do-what-it-says' (fs.ReadFile)====================================


// CALL START FUNCTION ===============================================

startApp(command, input)