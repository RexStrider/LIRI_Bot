require(`dotenv`).config();

let keys = require(`./keys.js`);

let axios = require(`axios`);

// get command
let command = process.argv[2];

// get a concert/song/movie
let media = process.argv.slice(3).join(` `);;
// console.log(media);

// commands to implement
   // `concert-this`
   if (command == `concert-this`) {
	   axios.get(`https://rest.bandsintown.com/artists/${media}/events?app_id=codingbootcamp`)
	   .then( response => {
			// console.log(response.data);
			
			let data=response.data;
			for(i=0; i < data.length; i++) {
				console.log(`---------------------------------`);
				// console.log(data[i].lineup);
				let lineup = data[i].lineup.join(` `);
				console.log(lineup);
				let venue = data[i].venue;
				console.log(venue.name);
	    		console.log(`${venue.city}, ${venue.region}, ${venue.country}`);
				// console.log(venue);
				console.log(data.datetime);
			}
			console.log(`---------------------------------`);
	   })
   }
   // `spotify-this-song`
   if (command == `spotify-this-song`) {
	//    let query = `https://api.spotify.com/v1/search/q=`+media;
	   spotifyThisSong(`track`, media);
   }
   // `movie-this`   
   if (command === `movie-this`) {
	   // We then run the request with axios module on a URL with a JSON
		axios.get(`http://www.omdbapi.com/?t=${media}&y=&plot=short&apikey=trilogy`)
		.then( response => {
			let data = response.data;
			console.log(`Movie Title: ${data.Title}`);
			console.log(`Year: ${data.Year}`);
			console.log(`${data.Ratings[0].Source}: ${data.Ratings[0].Value}`);
			console.log(`${data.Ratings[1].Source}: ${data.Ratings[1].Value}`);
			console.log(`Produced in; ${data.Country}`);
			console.log(`Original Language: ${data.Language}`);
			console.log(`Plot: ${data.Plot}`);
			console.log(`Actors; ${data.Actors}`);
		});
   }
   // `do-what-it-says`

function spotifyThisSong(type, song) {
	let Spotify = require(`node-spotify-api`);

	let spotify = new Spotify(keys.spotify);

	spotify.search({
		type: type,
		query: song,
		limit: 5
	}, function(error, data) {
		if (error) {
			return console.log(`Error occurred: ${error}`);
		}

		let tracks = data.tracks.items;

		console.log(`-------------------------`);
		for (i in tracks) {
			let artists = [];
			for (j in tracks[i].artists) {
				artists.push(tracks[i].artists[j].name);
			}
			console.log(`Artist: ${artists.join(", ")}`);
			console.log(`Song: ${tracks[i].name}`);
			console.log(`Preview URL: ${tracks[i].preview_url}`);
			console.log(`Album: ${tracks[i].album.name}`);
			console.log(`-------------------------`);	
		}
	});
}
