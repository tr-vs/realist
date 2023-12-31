const {
    getNowPlaying,
    getUserProfile,
    getTop,
    recommendThreeTracks,
} = require('../services/spotify');

const { getTopArtists } = require('../services/lastfm');
const User = require('../models/userModel');
const Time = require('../models/timeModel');
const Playlist = require('../models/playlistModel');

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
        if (communityUsers.length === 0) {
            res.status(400);
        } else {
            const playlist = await Playlist.findOne({
                school: user.school,
            });

            if (playlist === null) {
                res.status(201).json({ communityUsers });
            } else {
                const { playlistID } = playlist;
                res.status(200).json({ communityUsers, playlistID });
            }
        }
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
                nowPlaying: { $exists: true },
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
            const resultObject = {
                pfp: user.pfp,
                connected: false,
                followers: user.followers,
                following: user.following,
            };
            res.status(200).json(resultObject);
        } else {
            const [topSongs, topArtists] = await Promise.all([
                getTop(
                    user.access_token,
                    user.refresh_token,
                    'tracks',
                    10,
                    'short_term'
                ),
                getTop(
                    user.access_token,
                    user.refresh_token,
                    'artists',
                    10,
                    'short_term'
                ),
            ]);

            songs = topSongs.items.map((item) => item.id);
            artists = topArtists.items.map((item) => item.id);

            const followingArray = await User.find(
                { username: { $in: user.following } },
                'username pfp'
            );

            const followersArray = await User.find(
                { username: { $in: user.followers } },
                'username pfp'
            );

            const following = followingArray.reduce((accumulator, user) => {
                accumulator[user.username] = {
                    pfp: user.pfp,
                };
                return accumulator;
            }, {});

            const followers = followersArray.reduce((accumulator, user) => {
                accumulator[user.username] = {
                    pfp: user.pfp,
                };
                return accumulator;
            }, {});

            const resultObject = {
                pfp: user.pfp,
                songs,
                artists,
                followers,
                following,
                connected: true,
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
        const users = await User.find({}, 'username pfp');

        const usernames = users.map((user) => user.username);
        const pfps = users.map((user) => user.pfp[1]);

        let userToPfp = {};

        for (let i = 0; i < usernames.length; i++)
            userToPfp[usernames[i]] = pfps[i];

        res.status(200).json({ pfp: user.pfp[1], pfps, usernames, userToPfp });
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

const timestamp = async (req, res) => {
    try {
        const { updatedAt } = await Time.findOne({});

        res.status(200).json({ updatedAt });
    } catch (err) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    community,
    profile,
    navbar,
    sidebar,
    follow,
    unfollow,
    timestamp,
    following,
};
