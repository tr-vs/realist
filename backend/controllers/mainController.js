const {
    getNowPlaying,
    getUserProfile,
    getTop,
} = require('../services/spotify');
const { getTopArtists } = require('../services/lastfm');
const User = require('../models/userModel');

const community = async (req, res) => {
    const user = req.user;

    try {
        const communityUsers = await User.find(
            {
                _id: { $ne: user._id },
                school: user.school,
                nowPlaying: { $exists: true },
            },
            'username nowPlaying'
        );

        res.status(200).json(communityUsers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const profile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });

        const userProfile = await getUserProfile(
            user.access_token,
            user.refresh_token
        );
        const nowPlaying = await getNowPlaying(
            user.access_token,
            user.refresh_token
        );
        const topSongs = await getTop(
            user.access_token,
            user.refresh_token,
            'tracks',
            10,
            'long_term'
        );
        const topArtists = await getTop(
            user.access_token,
            user.refresh_token,
            'artists',
            10,
            'long_term'
        );

        const resultObject = {
            ...userProfile,
            ...nowPlaying,
            topSongs,
            topArtists,
        };
        console.log(resultObject);
        res.status(200).json(resultObject);
    } catch (err) {
        res.status(401).json({ error: 'User not connected to Spotify!' });
    }
};

module.exports = {
    community,
    profile,
};
