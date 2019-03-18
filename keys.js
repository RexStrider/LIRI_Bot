console.log("keys are loaded!");

exports.spotify = {
	id: process.env.SPOTIFY_ID,
	secret: process.env.SPOTIFY_SECRET
};

exports.dotEnv = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	pass: process.env.DB_PASS
}