const querystring = require('querystring');
const fetch = require('node-fetch');

const refreshToken = async () => {
    const refresh_token = req.query.refresh_token;

    const authOptions = {
        method: 'POST',
        headers: {
            Authorization:
                'Basic ' +
                Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID +
                        ':' +
                        process.env.SPOTIFY_CLIENT_SECRET
                ).toString('base64'),
            body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
        },
    };

    fetch('https://accounts.spotify.com/api/token', authOptions)
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    const access_token = data.access_token;
                    res.send({ access_token });
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
};

const getTop = async (token, type, limit, time_range) => {
    const result = await fetch(
        `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${time_range}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data.items.map((x) => x.name));
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
};

module.exports = {
    refreshToken,
    getTopArtists,
};
