require("dotenv").config();

let keys = require("./keys.js");

let axios = require("axios");



// get command
let command = process.argv[2];

// get name of concert/song/movie
let name = process.argv[3];

// commands to implement
   // `concert-this`
   // `spotify-this-song`
   if (process.argv[2] == "spotify-this-song") {
	   let query = "";
	   spotifyThisSong(process.argv[3], query);
   }
   // `movie-this`   
   if (process.argv[2] === "movie-this") {
	   // We then run the request with axios module on a URL with a JSON
	axios.get("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy").then(
		function(response) {
			// Then we print out the imdbRating
			console.log("The movie's rating is: " + response.data.imdbRating);
		}
	);
   }
   // `do-what-it-says`

function spotifyThisSong(type, query) {
	let Spotify = require('node-spotify-api');

	let spotify = new Spotify(keys.spotify);
	
	spotify.search({
		type: type,
		query: query
	}, function(error, data) {
		if (error) {
			return console.log('Error occurred: ' + error);
		}
	
		console.log(data); 
	});
}
