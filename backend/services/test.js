const querystring = require('querystring');
const {
    refreshToken,
    getTop,
    getNowPlaying,
    getRecentlyPlayed,
    recommendThreeTracks,
} = require('./spotify');

const bon = async () => {
    const access_token =
        'BQCxmGp9Q4P8k3YWiAesT70rMZCpIZ9W0gaqJhKGkECqexlBR4IJWaLrZ0PRMADhD1mKLtz8ygceE1B9umQSYegStL6mfUCctl4JcgDlOjw0qXFNrojojOPJM3ehWldLkkeAlKbpbJTwOYkgxB9DvDuVeRkX3Rl5xRea49pH0anHthZJfHHXNJ67BHPmVQQk36KbMMgIKCFEthx_cOl-ysHfdA';
    const refresh_token =
        'AQB8267IFHJjDyi7xoa-6B-Cf7U29gNj93ljzT45Nq6BqyFiG0xNiFsRhoc6pqd4CTQNSB-VAVu1qghWQkt_Dmuw0O0DHfWO58kXXHIPaTfWdd7XX37tyxhb6zHNBOMwXi8';
    const topFive = await getTop(
        access_token,
        refresh_token,
        'tracks',
        5,
        'short_term'
    );
    if (topFive === undefined) console.log('asdfasd');
    else {
        const artistIds = topFive.items
            .slice(3, 5)
            .map((item) => item.artists[0].id)
            .join('&3C');
        console.log(artistIds.length);

        const trackIds = topFive.items
            .slice(0, 3)
            .map((item) => item.id)
            .join('&3C');

        const threeRec = await recommendThreeTracks(
            access_token,
            refresh_token,
            artistIds,
            trackIds
        );
    }
};

bon();
