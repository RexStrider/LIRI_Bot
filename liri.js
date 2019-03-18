require("dotenv").config();

let keys = require("./keys.js");

let axios = require("axios");

// get command
let command = process.argv[2];

// get a concert/song/movie
let type = process.argv[3];

// commands to implement
   // `concert-this`
   if (command == "concert-this") {
	   axios.get("https://rest.bandsintown.com/artists/" + type + "/events?app_id=codingbootcamp")
	   .then( response => {
			// console.log(response.data);
			
			let data=response.data;
			for(i=0; i < data.length; i++) {
				console.log("---------------------------------");
				// console.log(data[i].lineup);
				let lineup = "";
				for(j=0; j < data[i].lineup.length; j++) {
					if (j == (data[i].lineup.length - 1)) lineup += data[i].lineup[j];
					else lineup += data[i].lineup[j] + " ";
				}
				console.log(lineup);
				let venue = data[i].venue;
				console.log(venue.name + ", " + venue.city + ", " + venue.region + ", " + venue.country);
				console.log(data.datetime);
			}
			console.log("---------------------------------");
	   })
   }
   // `spotify-this-song`
   if (command == "spotify-this-song") {
	   let query = "https://api.spotify.com";
	   spotifyThisSong(type, query);
   }
   // `movie-this`   
   if (command === "movie-this") {
	   // We then run the request with axios module on a URL with a JSON
		axios.get("http://www.omdbapi.com/?t=" + type + "&y=&plot=short&apikey=trilogy")
		.then( response => {
				console.log(response);
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
