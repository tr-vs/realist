const fetch = require('node-fetch');

const refreshToken = async (refresh_token) => {
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
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=BQCH5ft8By5_C7fbNeAt_rx42s18QXtYTCAHVu_POgoQ8nfHa_8YLFY4LtQ8X2XPFuo7odoCHWQdqFmntxlM-FmjNPi5nBAeaEN-W1HSKP7eoNIR4lArwZ-KJN3C1kCYu7dhr67Bc7qgkLV0YNBW-pR_ACW1tDC-8G7mz8Hsu11IqRQQ9CkVzopFmDx7kYj5dnNrZUmYx8n-0ks0dQAGkQ`,
    };

    await fetch('https://accounts.spotify.com/api/token', authOptions)
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                });
            }
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
};

const getTop = async (token, refresh_token, type, limit, time_range) => {
    await fetch(
        `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${time_range}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then(async (response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data.items.map((x) => x.name));
                });
            } else {
                const errorHeader = response.headers.get('www-authenticate');
                const strippedError = errorHeader.substring(
                    errorHeader.indexOf('error_description="') +
                        'error_description="'.length,
                    errorHeader.length - 1
                );

                if (strippedError === 'The access token expired') {
                    const refreshedToken = await refreshToken(refresh_token);
                    console.log(refreshedToken);
                }
            }
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
};

const getRecentlyPlayed = async (token, refresh_token, limit) => {
    await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then(async (response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(
                        data.items.map((x) => x.track).map((x) => x.name)
                    );
                });
            } else {
                console.log(response);
            }
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
};

const getNowPlaying = async (token, refresh_token) => {
    await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(async (response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data.item.name);
                });
            } else if (response.status === 204) {
                getRecentlyPlayed(token, refresh_token, 1);
            }
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
};

getTop(
    'BQDuV2EkceX6_Wzz7ftjJBwMqVQuiI85yfoY_1Tke6qI31jDxPNx4vQEFqM42nr2HffzBFJjHGW9fAd_Bmhnf1pvBoQy0fob3dqWwX6YDeArobk0RC6MnSD-wf_EaoRAPgH4tKQMqv2U4Pkr_r301TiPXRNqt77eTnH8Od9ms4WXS1pvzCh8oy9Azq4P9xefqqWMYQBXgkBWDnr6K-O-dQ',
    'AQB_M-Tledv7iCq5RCxkc0maxBH4KCP_LtOMSbCtVprTmYtRW95ZYyqTjZQu_50pvSZVMjrsXJlptEWrmEfJm-OwBroAl5KFGdx3Eq_W4q4fSAFMa_i7aZFHs3j0sh8qxlQ',
    'tracks',
    '10',
    'long_term'
);

getRecentlyPlayed(
    'BQDuV2EkceX6_Wzz7ftjJBwMqVQuiI85yfoY_1Tke6qI31jDxPNx4vQEFqM42nr2HffzBFJjHGW9fAd_Bmhnf1pvBoQy0fob3dqWwX6YDeArobk0RC6MnSD-wf_EaoRAPgH4tKQMqv2U4Pkr_r301TiPXRNqt77eTnH8Od9ms4WXS1pvzCh8oy9Azq4P9xefqqWMYQBXgkBWDnr6K-O-dQ',
    'AQB_M-Tledv7iCq5RCxkc0maxBH4KCP_LtOMSbCtVprTmYtRW95ZYyqTjZQu_50pvSZVMjrsXJlptEWrmEfJm-OwBroAl5KFGdx3Eq_W4q4fSAFMa_i7aZFHs3j0sh8qxlQ',
    '1'
);

getNowPlaying(
    'BQDuV2EkceX6_Wzz7ftjJBwMqVQuiI85yfoY_1Tke6qI31jDxPNx4vQEFqM42nr2HffzBFJjHGW9fAd_Bmhnf1pvBoQy0fob3dqWwX6YDeArobk0RC6MnSD-wf_EaoRAPgH4tKQMqv2U4Pkr_r301TiPXRNqt77eTnH8Od9ms4WXS1pvzCh8oy9Azq4P9xefqqWMYQBXgkBWDnr6K-O-dQ',
    'AQB_M-Tledv7iCq5RCxkc0maxBH4KCP_LtOMSbCtVprTmYtRW95ZYyqTjZQu_50pvSZVMjrsXJlptEWrmEfJm-OwBroAl5KFGdx3Eq_W4q4fSAFMa_i7aZFHs3j0sh8qxlQ'
);

module.exports = {
    refreshToken,
    getTop,
    getNowPlaying,
};
