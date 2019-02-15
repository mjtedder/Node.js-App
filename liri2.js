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
            console.log("I'm sorry, LIRI doesn't recognize that command.")

    }
}






// 'movie-this' (OMDB API)============================================





// 'concert-this' (Bands In Town API)=================================









// 'spotify-this-song' (Spotify API)==================================








// 'do-what-it-says' (fs.ReadFile)====================================


// CALL START FUNCTION ===============================================

startApp(command, input)