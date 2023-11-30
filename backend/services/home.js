require('dotenv').config({ path: '../.env' });

const User = require('../models/userModel');
const { getTop, getNowPlaying, recommendThreeTracks } = require('./spotify');

const updateNowPlaying = async () => {
    const users = await User.find({
        access_token: { $exists: true },
    });
    for (const user of users) {
        let nowPlaying = await getNowPlaying(
            user.access_token,
            user.refresh_token
        );

        if (
            nowPlaying === undefined ||
            (nowPlaying.track === undefined &&
                nowPlaying.currently_playing_type !== 'track')
        ) {
            console.log(user.username);
            continue;
        }

        user.nowPlaying = JSON.stringify(nowPlaying);

        await user.save();
    }
};

const updateRecommended = async () => {
    const users = await User.find({
        access_token: { $exists: true },
    });
    for (const user of users) {
        const { access_token, refresh_token } = user;

        const topFive = await getTop(
            access_token,
            refresh_token,
            'tracks',
            5,
            'short_term'
        );

        if (topFive === undefined) continue;

        const artistIds = topFive.items
            .slice(3, 5)
            .map((item) => item.artists[0].id)
            .join('&3C');

        if (artistIds.length === 0) continue;

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

        const threeRecID = threeRec.map((rec) => rec.id);

        user.recommended = threeRecID;
        await user.save();
    }
};

module.exports = {
    updateNowPlaying,
    updateRecommended,
};
