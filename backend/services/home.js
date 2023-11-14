require('dotenv').config({ path: '../.env' });

const User = require('../models/userModel');
const fetch = require('node-fetch');
const { getTop, getNowPlaying } = require('./spotify');

const community = async () => {
    const communityUsers = await User.find({ access_token: { $exists: true } });
    console.log(communityUsers.length);
    for (const user of communityUsers) {
        const nowPlaying = await getNowPlaying(
            user.access_token,
            user.refresh_token
        );
        console.log(nowPlaying);
    }
};

module.exports = {
    community,
};
