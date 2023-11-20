const { getNowPlaying, getUserProfile, getTop} = require('../services/spotify');
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
    const user = req.user;

    if (user.access_token && user.refresh_token) {
        // send api call
        return getUserProfile(user.access_token, user.refresh_token);
    } else {
        res.status(401).json({ error: 'User not connected to Spotify!' });
    }
};

const topSongs = async (req, res, type, limit, time_range) => {
    const user = req.user;

    if (user.access_token && user.refresh_token) {
        // send api call
        return getTop(user.access_token, user.refresh_token, type, limit, time_range);
    } else {
        res.status(401).json({ error: 'User not connected to Spotify!' });
    }
};

const nowPlaying = async (req, res) => {
    const user = req.user;

    if (user.access_token && user.refresh_token) {
        // send api call
        return getNowPlaying(user.access_token, user.refresh_token);
    } else {
        res.status(401).json({ error: 'User not connected to Spotify!' });
    }
};

const topArtists = async (username, limit, period) => {

    return get(user.access_token, user.refresh_token, username, limit, period);

};


module.exports = {
    community,
    profile,
    topSongs,
    nowPlaying,
    topArtists
};
