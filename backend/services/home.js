require('dotenv').config({ path: '../.env' });

const User = require('../models/userModel');
const { getTop, getNowPlaying } = require('./spotify');

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
            (nowPlaying.track === undefined && nowPlaying.currently_playing_type !== 'track')
        ) {
            console.log(user.username)
            continue;
        }

        user.nowPlaying = JSON.stringify(nowPlaying);

        await user.save();

    }
};

module.exports = {
    updateNowPlaying,
};
