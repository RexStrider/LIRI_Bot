require(`dotenv`).config();

// api keys
let keys = require(`./keys.js`);

// file system library
let fs = require("fs");

// api call library
let axios = require(`axios`);

// date library
let moment = require(`moment`);

// The users command
let command = process.argv[2];

// The requested concert/song/movie
let query = process.argv.slice(3).join(` `);

// handles spotify-this-song feature
function spotifyThisSong(type, song) {
	let Spotify = require(`node-spotify-api`);

	// creates spotify object
	let spotify = new Spotify(keys.spotify);

	// sends request to spotify
	spotify.search({
		type: type,
		query: song,
		limit: 5
	}, function(error, data) {
		if (error) {
			return console.log(`Error occurred: ${error}`);
		}

		// logs songs retrieved from spotify
		let tracks = data.tracks.items;

		console.log(`---------------------------------`);
		for (i in tracks) {

			let artists = [];
			for (j in tracks[i].artists)  {
				artists.push(tracks[i].artists[j].name);
			}
			console.log(`Artist: ${artists.join(", ")}`);

			console.log(`Song: ${tracks[i].name}`);

			console.log(`Preview URL: ${tracks[i].preview_url}`);

			console.log(`Album: ${tracks[i].album.name}`);

			console.log(`---------------------------------`);	
		}
	});
}

// handles concert-this feature
function concertThis(query) {
	// Bands in Town API can't handle qoutation marks surounding the query string,
	// so I check to see if a single or double qoutation mark is at the first index
	// and if I find one I nuke all of them... tactically... 
	if (query.indexOf("\"") === 0 || query.indexOf("\'") === 0) {
		// this function call is removing all single and double quotation marks in the string
		query = query.replace(/['"]+/g, '');
	}

	// sends request to Bands in Town API
	axios.get(`https://rest.bandsintown.com/artists/${query}/events?app_id=${keys.bandsInTown.key}`)
	.then( response => {
		
		// logs events retrieved from Bands in Town API
		let data=response.data;

		for(i=0; i < data.length; i++) {
			console.log(`---------------------------------`);

			let lineup = data[i].lineup.join(`, `);
			console.log(lineup);

			let venue = data[i].venue;
			console.log(venue.name);

			let venueAry = [];
			if (venue.city) venueAry.push(venue.city);
			if (venue.region) venueAry.push(venue.region);
			if (venue.country) venueAry.push(venue.country);
			console.log(venueAry.join(`, `));

			console.log(moment(data[i].datetime).format("MM/DD/YYYY"));
		}
		console.log(`---------------------------------`);
	});
}

// handles movie-this feature
function movieThis(query) {
	// sends request to OMDB API
	axios.get(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=${keys.omdb.key}`)
	.then( response => {

		// logs movies retrieved from OMDB API
		let data = response.data;

		console.log(`---------------------------------`);

		console.log(`Movie Title: ${data.Title}`);

		console.log(`Year: ${data.Year}`);

		console.log(`${data.Ratings[0].Source}: ${data.Ratings[0].Value}`);

		console.log(`${data.Ratings[1].Source}: ${data.Ratings[1].Value}`);

		console.log(`Produced in; ${data.Country}`);

		console.log(`Original Language: ${data.Language}`);

		console.log(`Plot: ${data.Plot}`);

		console.log(`Actors; ${data.Actors}`);

		console.log(`---------------------------------`);
	});
}

// handles do-what-it-says features
function doWhatItSays() {
	
	// retrieves requests in random text file
	fs.readFile(`random.txt`, `utf8`, (error, data) => {
		if (error) { console.log(error); }
		else {
			
			// text is divided by ',' character
			let ary = data.split(`,`);

			// sends commands back to LIRI function
			for(let i = 0; i < ary.length; i = i + 2) {
				runLiriBot(ary[i], ary[i+1]);
			}
		}
	});
}

function runLiriBot(command, query) {
	// concert-this
	if (command == `concert-this`) {
		if (!query) query = "Comethazine";
		concertThis(query);
	}
	// spotify-this-song
	else if (command == `spotify-this-song`) {
		if (!query) query = "The Sign";
		spotifyThisSong(`track`, query);
	}
	// movie-this  
	else if (command == `movie-this`) {
		if (!query) query = `Mr. Nobody`;
		movieThis(query);
	}
	// do-what-it-says
	else if (command == `do-what-it-says`) {
		doWhatItSays();
	}
	// command not recognized
	else {
		console.log("Sorry, I do not understand. Try one of the following commands.\n");
		console.log("concert-this <name of band>");
		console.log("spotify-this-song <name of song>");
		console.log("movie-this <name of movie>");
		console.log("do-what-it-says\n");
	}
}

runLiriBot(command, query);