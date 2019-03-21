require(`dotenv`).config();

let keys = require(`./keys.js`);

let fs = require("fs");

let axios = require(`axios`);

let moment = require(`moment`);

// get command
let command = process.argv[2];

// get a concert/song/movie
let query = process.argv.slice(3).join(` `);

// handles spotify-this-song feature
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

function concertThis(query) {
		if (query.indexOf("\"") === 0 || query.indexOf("\'") === 0) {
			query = query.replace(/['"]+/g, '');
		}

		axios.get(`https://rest.bandsintown.com/artists/${query}/events?app_id=${keys.bandsInTown.key}`)
		.then( response => {
			
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

function movieThis(query) {
	axios.get(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=${keys.omdb.key}`)
	.then( response => {

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

function doWhatItSays() {
	fs.readFile(`random.txt`, `utf8`, (error, data) => {
		if (error) { console.log(error); }
		else {
			let ary = data.split(`,`);

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
		console.log("Sorry, I do not understand.");
	}
}

runLiriBot(command, query);