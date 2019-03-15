require("dotenv").config();

let keys = require("./keys.js");

let spotify = new Spotify(keys.spotify);

// get command
let command = process.argv[2];

// get name of concert/song/movie
let name = process.argv[3];

// commands to implement
   // `concert-this`
   // `spotify-this-song`
   // `movie-this`   
   // `do-what-it-says`


