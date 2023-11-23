require('dotenv').config({ path: '../.env' });

const querystring = require('querystring');
const fetch = require('node-fetch');

const stateKey = 'spotify_auth_state';

const generateRandomString = (length) => {
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

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
                scope,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                state,
            })
    );
};

const callback = async (req, res) => {
    // your application requests refresh and access tokens
    // after checking the state parameter
    const code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[stateKey] : null;

    console.log(req.cookies);

    if (state === null || state !== storedState) {
        res.redirect(
            '/#' +
                querystring.stringify({
                    error: 'state_mismatch',
                })
        );
    } else {
        res.clearCookie(stateKey);

        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    Buffer.from(
                        process.env.SPOTIFY_CLIENT_ID +
                            ':' +
                            process.env.SPOTIFY_CLIENT_SECRET
                    ).toString('base64'),
            },
            body: `code=${code}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&grant_type=authorization_code`,
            json: true,
        };

        await fetch('https://accounts.spotify.com/api/token', authOptions)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        let access_token = data.access_token;
                        let refresh_token = data.refresh_token;
                        res.redirect(
                            'http://localhost:3001/profile#' +
                                querystring.stringify({
                                    refresh_token,
                                    access_token,
                                })
                        );
                    });
                } else {
                    res.redirect(
                        '/#' +
                            querystring.stringify({
                                error: 'invalid_token',
                            })
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

module.exports = {
    userAuth,
    callback,
};
