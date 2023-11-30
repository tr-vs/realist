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

const following = async (req, res) => {
    const { following } = req.user;

    try {
        const followingUsers = await User.find(
            {
                username: { $in: following },
            },
            'username nowPlaying pfp'
        );

        res.status(200).json(followingUsers);
    } catch (err) {
        res.status(400).json({ error: error.message });
    }
};

const profile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });

        if (user === null)
            res.status(401).json({ error: 'User does not exist' });
        else if (user.access_token === undefined) {
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
                followers: user.followers,
                following: user.following,
            };

            res.status(200).json(resultObject);
            await user.save();
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'User does not exist' });
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
    const user = req.user;
    try {
        const { pfp, nowPlaying, recommended } = user;

        const resultObject = {
            pfp: pfp[1],
            nowPlaying: JSON.parse(nowPlaying),
            threeRec: recommended,
        };

        res.status(200).json(resultObject);
    } catch (err) {
        console.log(err);
        res.status(401).json({
            error: 'User not connected to Spotify!',
        });
    }
};

const follow = async (req, res) => {
    const user = req.user;
    const { otherUsername } = req.body;

    try {
        const otherUser = await User.findOne({ username: otherUsername });

        user.following.push(otherUsername);
        otherUser.followers.push(user.username);

        await otherUser.save();
        await user.save();
        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Following failed' });
    }
};

const unfollow = async (req, res) => {
    const user = req.user;
    const { otherUsername } = req.body;

    try {
        const otherUser = await User.findOne({ username: otherUsername });

        let index = user.following.indexOf(otherUsername);
        user.following.splice(index, 1);

        index = otherUser.followers.indexOf(user.username);
        otherUser.followers.splice(index, 1);

        await user.save();
        await otherUser.save();
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(401).json({ error: 'Unfollowing failed' });
    }
};

module.exports = {
    community,
    profile,
    navbar,
    sidebar,
    follow,
    unfollow,
    following,
};
