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
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state,
            })
    );
};

module.exports = {
    userAuth,
};
