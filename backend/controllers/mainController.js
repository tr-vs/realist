const { getNowPlaying, getUserProfilePic } = require('../services/spotify');
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
    const user = req.user;

    if (user.access_token && user.refresh_token) {
        // send spi call
    } else {
        res.status(401).json({ error: 'User not connected to Spotify!' });
    }
};

module.exports = {
    community,
};
