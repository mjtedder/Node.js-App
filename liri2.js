// REQUIRED DEPENDENCIES =============================================
require ('dotenv').config()
var moment = require('moment')
var axios = require('axios')
var fs = require('fs')
var keys = require('./keys')
var Spotify = require('node-spotify-api')


// KEYS ==============================================================
var spotify = new Spotify(keys.spotify)

// SAVING USER INPUT TO VARIABLES ====================================
var command = process.argv[2]
var input = process.argv[3]


// SWITCH-CASE STATEMENT FOR LIRI COMMANDS ===========================
function startApp(command, input) {
    switch (command) {
        case 'concert-this':
        console.log(keys)
        console.log(input)
        break;
    }
}






// 'movie-this' (OMDB API)============================================





// 'concert-this' (Bands In Town API)=================================









// 'spotify-this-song' (Spotify API)==================================








// 'do-what-it-says' (fs.ReadFile)====================================


// CALL START FUNCTION ===============================================

startApp(command, input)