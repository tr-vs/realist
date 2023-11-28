const {
    getNowPlaying,
    getUserProfile,
    getTop,
    recommendThreeTracks,
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

        if (user.access_token === undefined) {
            const resultObject = { pfp: user.pfp };
            res.status(200).json(resultObject);
        } else {
            const [topSongs, topArtists] = await Promise.all([
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

            const resultObject = {
                pfp: user.pfp,
                topSongs,
                topArtists,
            };

            res.status(200).json(resultObject);
            await user.save();
        }
    } catch (err) {
        res.status(401).json({ error: 'User not connected to Spotify!' });
    }
};

const navbar = async (req, res) => {
    const user = req.user;

    try {
        res.status(200).json({ pfp: user.pfp[1] });
    } catch (err) {
        res.status(401).json({
            error: 'User has no affiliated profile picture!',
        });
    }
};

const sidebar = async (req, res) => {
    const { username } = req.params;
    try {
        const { pfp, access_token, refresh_token, nowPlaying } =
            await User.findOne({
                username,
            });

        const [topFive] = await Promise.all([
            getTop(access_token, refresh_token, 'tracks', 5, 'short_term'),
        ]);

        const artistIds = topFive.items
            .slice(3, 5)
            .map((item) => item.artists[0].id)
            .join('&3C');
        const trackIds = topFive.items
            .slice(0, 3)
            .map((item) => item.artists[0].id)
            .join('&3C');
        const threeRec = await recommendThreeTracks(
            access_token,
            refresh_token,
            artistIds,
            trackIds
        );

        const resultObject = {
            pfp: pfp[1],
            nowPlaying: JSON.parse(nowPlaying),
            threeRec,
        };

        res.status(200).json(resultObject);
    } catch (err) {
        res.status(401).json({
            error: 'User not connected to Spotify!',
        });
    }
};
module.exports = {
    community,
    profile,
    navbar,
    sidebar,
};
