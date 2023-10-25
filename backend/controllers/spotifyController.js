const userAuth = async (req, res) => {
    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    // authorization request
    const scope =
        'user-read-playback-state user-read-recently-played user-top-read';
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scope,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                state: state,
            })
    );
};

module.exports = {
    userAuth,
};
