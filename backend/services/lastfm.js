const querystring = require('querystring');
const fetch = require('node-fetch');
require('dotenv').config()  // add this to import .env variablesconst params = stringify({

const getTopArtists = async (username, limit, period) => {

    const response = querystring.stringify({
        method: 'user.getTopArtists',
        user: username,
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
        limit: limit,
        period: period
    });
    const data = await fetch(`https://ws.audioscrobbler.com/2.0/?${response}`).then(r=> r.json());
    console.log(data.topartists.artist.map((x) => x.name));
    return data.topartists;
}


getTopArtists('chasin_jasonnn', 10, '3day');