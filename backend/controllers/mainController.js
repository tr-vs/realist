const {
    getNowPlaying,
    getUserProfile,
    getTop,
    recommendThreeTracks
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

        user.pfp =
            userProfile.images[0]?.url !== undefined
                ? userProfile.images[0].url
                : user.pfp;

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

const navbar = async (req, res) => {
    const { username } = req.params;

    try {
        const { pfp } = await User.findOne({ username });

        res.status(200).json({ pfp });
    } catch (err) {
        res.status(401).json({
            error: 'User has no affiliated profile picture!',
        });
    }
};

const sidebar = async (req, res) => {

    const { username } = req.params;
    try {
        const { pfp, access_token, refresh_token} = await User.findOne({ username });

        const [nowPlaying, topFive] = await Promise.all([
            getNowPlaying(access_token, refresh_token),
            getTop(
                access_token,
                refresh_token,
                'tracks',
                5,
                'long_term'
            ),
        ]);

        const artistIds = topFive.items.slice(3, 5).map(item => item.artists[0].id).join('&3C')
        const trackIds = topFive.items.slice(0, 3).map(item => item.artists[0].id).join('&3C')
        const threeRec = await recommendThreeTracks(access_token, refresh_token, artistIds, trackIds)
        const resultObject = {
            pfp,
            ...nowPlaying,
            threeRec
        };
        console.log(resultObject)
        res.status(200).json(resultObject);
    } catch (err) {
        console.log(err)
        res.status(401).json({
            error: 'User not connected to Spotify!',
        });
    }
};
module.exports = {
    community,
    profile,
    navbar,
    sidebar
};
