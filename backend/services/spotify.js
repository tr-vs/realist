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
    
    const response = await fetch(
        `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&time_range=${time_range}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
      
    if (response.status === 200) {
        response.json().then((data) => {
            console.log(data.items.map((x) => x.name));
            return data.items;
        });
    } else {
        const errorHeader = response.headers.get('www-authenticate');
        const strippedError = errorHeader.substring(
            errorHeader.indexOf('error_description="') +
                'error_description="'.length,
            errorHeader.length - 1
        );
        // console.log(strippedError);
        if (strippedError === 'The access token expired') {
            const refreshedToken = await refreshToken(refresh_token);
            getTop(refreshedToken, refresh_token, type, limit, time_range);
        }
    }
    
};

const getRecentlyPlayed = async (token, refresh_token, limit) => {
    const response = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    if (response.status === 200) {
        response.json().then((data) => {

            const tracks = data.items.map((x) => x.track).map((x) => x.name);
            const ids = data.items.map((x) => x.track).map((x) => x.id);
            console.log(tracks[0]);
            console.log(ids[0]);
            return data.items;

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
            getRecentlyPlayed(refreshedToken, refresh_token, limit);
        }
    }
    
};

const getNowPlaying = async (token, refresh_token) => {
   const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (response.status === 200) {
        response.json().then((data) => {
            console.log(data.items);
            return data.items;
        });
    } else if (response.status === 204) {
        getRecentlyPlayed(token, refresh_token, 1);
    }else {
        const errorHeader = response.headers.get('www-authenticate');
        const strippedError = errorHeader.substring(
            errorHeader.indexOf('error_description="') +
                'error_description="'.length,
            errorHeader.length - 1
        );

        if (strippedError === 'The access token expired') {
            const refreshedToken = await refreshToken(refresh_token);
            getNowPlaying(refreshedToken, refresh_token)
        }
    }
        
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
                    console.log(data.images[1].url) // grabs url of image that's 300x300
                    return data.images;
                    
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
                console.log(data.album.images[1].url);
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



module.exports = {
    refreshToken,
    getTop,
    getNowPlaying,
    getUserProfilePic
};
