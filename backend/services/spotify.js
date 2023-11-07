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
<<<<<<< Updated upstream
                    console.log(
                        data.items.map((x) => x.track).map((x) => x.name)
                    );
=======

                    const tracks = data.items.map((x) => x.track).map((x) => x.name);
                    const ids = data.items.map((x) => x.track).map((x) => x.id);
                    console.log(tracks);
                    console.log(ids);
                    getTrackImage(token, refresh_token, ids[0]); // set
>>>>>>> Stashed changes
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
                    // ad issue w/ null
                    if(data.currently_playing_type == "ad"){
                    getRecentlyPlayed(token, refresh_token, 1);
                    }else{
                    console.log(data.item.name);
<<<<<<< Updated upstream
=======
                    getTrackImage(token, refresh_token, data.item.id);
                    }
>>>>>>> Stashed changes
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


const getUserProfilePic = async (token, refresh_token) => {
    await fetch(`https://api.spotify.com/v1/me/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(async (response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data.images[1].url) // grabs url of image
                    // for small prof pics, images are set to 64x64 pixels
                    // for enlarged pics, spotify arranges them to 200x200 pixels.
                });
            } 
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
};

<<<<<<< Updated upstream

const TOKEN = "BQBPt4KGbAHd4wHqFwIY2DstAZ7uFVwrlIL2bPPCfO_PFRqKBNpyf7enILcorl_ebfxJKfyGw_rZ3FA4nTY3a8mWu28nrv1GjyypHH8OEtpSpnj-wTJ9CSjUxUHVSy_QmZb4JrFMuEqS6q6wXqKWjKa-CHGXCGrWlxlpcC4mWJYsU9gFrljSdRoDQddH24oZ3M9WxZmsoxP0ZsB4uw"
const REFRESH = "AQAhGH0F7mHhSSNjZQBVmT921Pw3nDDH5swZ23652mgzN9LpBY1-eppvTsZGd10EizwMnlQiBPAI5s778MBBv0Bg_-50dBZrODFFVCw94MLw6FNCT8b_McXbLwGiUeEkqCw"
getTop(
 TOKEN, REFRESH,
    'tracks',
    '10',
    'long_term'
);
=======
const getTrackImage = async (token, refresh_token, id) => {
    await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(async (response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                console.log(data.album.images[1]);
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

}


const TOKEN = "BQA5cssRRxKpGZyMs4BI_b1m00iMZEvwp62jICv4NlEkggiMNoBXgu4w0fIxijf2q6id37FzZ_d6Dnva1jna-_qm6efkBsfRd8tqGIT3rUr2q-Y_XvKSxIw46Cr8RQhVC-1gr4XjhJIiy5HtlhDApn6i0t784Zi90hOQZqGrkJ_Klv4Aw8aVgAsQAet6-cjcwcgPmUKKl1_c4hCrGQ"
const REFRESH = "AQByy55JbnZrRQ6Mmh5r8kbXKuWzWeS2Kp1vxJt22xzTKwka6dWgeFfQ-OYmHwA_OF-hr055uIU3N0LEAbBxqh6XLtCGP0caKZNEMTfgd75uqP0Lm7ybZazBC4C2GsRSpYs"

getTop(
 TOKEN, REFRESH, 'tracks',
    '10',
    'long_term'
);
>>>>>>> Stashed changes

getRecentlyPlayed(
TOKEN, REFRESH,
    '1'
);

getNowPlaying(
 TOKEN, REFRESH
);

<<<<<<< Updated upstream
getUserProfilePic(TOKEN, REFRESH);
=======
getUserProfilePic(TOKEN, REFRESH); 
>>>>>>> Stashed changes

module.exports = {
    refreshToken,
    getTop,
    getNowPlaying,
};
