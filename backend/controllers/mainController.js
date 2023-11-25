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
            'username nowPlaying pfp'
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

        const [userProfile, topSongs, topArtists] = await Promise.all([
            getUserProfile(user.access_token, user.refresh_token),
            getTop(
                user.access_token,
                user.refresh_token,
                'tracks',
                10,
                'long_term'
            ),
            getTop(
                user.access_token,
                user.refresh_token,
                'artists',
                10,
                'long_term'
            ),
        ]);

        user.pfp = userProfile.images[1].url;

        const resultObject = {
            ...userProfile,
            topSongs,
            topArtists,
        };

        res.status(200).json(resultObject);
        await user.save();
    } catch (err) {
        res.status(401).json({ error: 'User not connected to Spotify!' });
    }
};

module.exports = {
    community,
    profile,
};
