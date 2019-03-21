# LIRI_Bot
Language Interpretation and Recognition Interface: A command line node app that takes in parameters and gives you back data.

### Setup
1. run the command 'npm install', this should get the node modules requried to run LIRI

2. You will need to set up your environment variables. This is where you will be storing your API keys

    * create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys
SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# OMDB API key
OMDB_KEY=your-omdb-key

# Bands In Town API key
BIT_KEY=your-bands-in-town-key

```

    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

   * You can get a key from OMDB here <http://www.omdbapi.com/apikey.aspx>

   * There should be a way to get a bands in town api key, however when I travel to the link <https://manager.bandsintown.com/bandsintown-api> I get redirected to <https://manager.bandsintown.com/manage/pages>, even when I'm logged in. Just use the the key 'codingbootcamp'

### Running LIRI BOT

* There are several commands that LIRI understands

    1. concert-this <name of band>

        * runs a query on the Bands in Town API using the name of the band

        * returns the name of the venue, the venue location, and the date of the concert for several concerts that the band is playing at

![alt text][concert]

    2. movie-this <name of movie>

        * runs a query on the OMDB API using the name of the movie

        * returns the following information;

             ```
                * Title of the movie.
                * Year the movie came out.
                * IMDB Rating of the movie.
                * Rotten Tomatoes Rating of the movie.
                * Country where the movie was produced.
                * Language of the movie.
                * Plot of the movie.
                * Actors in the movie.
            ```
![alt text][movie]

    3. spotify-this-song <name of song>

        * runs a query on the Spotify API using the name of a song

        * returns the Artists name, songs name, preview link, and albums name for several songs. Sometimes Spotify provides covers to the song, sometimes it provides the actual song, sometimes it provides songs with similar names.

![alt text][spotify]

    4. do-what-it-says

        * runs a query using the information stored in the random.txt file

![alt text][do-it-01]

![alt text][do-it-02]

* LIRI is basically a script run through node, so all commands must be run in the following way,

    * node liri <command> <query>

[concert]: ./images/concert-this-screenshot.png "concert-this command screenshot"
[movie]: ./images/movie-this-screenshot.png "movie-this command"
[spotify]: ./images/spotify-this-song-screenshot.png "spotify-this-song command"
[do-it-01]: ./images/do-what-it-says-01-screenshot.png "do-what-it-says command initial"
[do-it-02]: ./images/do-what-it-says-02-screenshot.png "do-what-it-says command continued"