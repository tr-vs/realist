require('dotenv').config({ path: '../.env' });

const User = require('../models/userModel');
const {
    getUserProfile,
    getNowPlaying,
    getTop,
    recommendThreeTracks,
} = require('../services/spotify');
const jwt = require('jsonwebtoken');
const Passage = require('@passageidentity/passage-node');

const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: 'HEADER',
});

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '999d' });
};

const checkValidUsername = async (req, res) => {
    const { username } = req.params;

    const exists = await User.findOne({ username });

    if (exists) {
        res.status(400).json({ error: 'Username already in use' });
    } else {
        res.status(200).json({ username, idToken: 'false' });
    }
};

const loginUser = async (req, res) => {
    try {
        // Authenticate request using Passage
        const userID = await passage.authenticateRequest(req);

        if (userID) {
            // User is authenticated
            const userData = await passage.user.get(userID);
            const email = userData.email;
            const user = await User.findOne({ email });
            const idToken = createToken(user._id);
            const spotifyToken = user.access_token ? true : false;

            // create a token
            const { username } = user;

            res.status(200).json({ username, idToken, spotifyToken });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signupUser = async (req, res) => {
    const { username } = req.body;

    try {
        const userID = await passage.authenticateRequest(req);

        const passageUser = await passage.user.get(userID);
        const email = passageUser.email;
        const school = passageUser.user_metadata.school;

        const user = await User.create({
            email,
            username,
            school: school.toLowerCase(),
        });

        const idToken = createToken(user._id);
        const spotifyToken = false;

        res.status(200).json({ username, idToken, spotifyToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addToken = async (req, res) => {
    const { authorization } = req.headers;
    const { refresh_token, access_token } = req.body;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        const profile = await getUserProfile(access_token, refresh_token);

        const nowPlaying = await getNowPlaying(access_token, refresh_token);
        if (
            nowPlaying === undefined ||
            (nowPlaying.track === undefined &&
                nowPlaying.currently_playing_type !== 'track')
        ) {
            res.status(401).json({ error: 'No recently played tracks' });
        }

        const topFive = await getTop(
            access_token,
            refresh_token,
            'tracks',
            5,
            'short_term'
        );

        if (topFive === undefined)
            res.status(401).json({ error: 'No top five songs' });

        const artistIds = topFive.items
            .slice(3, 5)
            .map((item) => item.artists[0].id)
            .join('&3C');

        if (artistIds.length === 0)
            res.status(401).json({ error: 'No artists' });

        const trackIds = topFive.items
            .slice(0, 3)
            .map((item) => item.id)
            .join('&3C');

        const threeRec = await recommendThreeTracks(
            access_token,
            refresh_token,
            artistIds,
            trackIds
        );

        const threeRecID = threeRec.map((rec) => rec.id);

        let pfp = [];
        if (profile.images[0]?.url !== undefined) {
            pfp = profile.images.map((image) => image.url);
        }

        const user = await User.findOneAndUpdate(
            { _id },
            {
                refresh_token,
                access_token,
                pfp,
                nowPlaying: JSON.stringify(nowPlaying),
                recommended: threeRecID,
            },
            { returnNewDocument: true }
        );

        const { username } = user;
        const idToken = createToken(user._id);

        res.status(200).json({ username, idToken, spotifyToken: true });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

const removeToken = async (req, res) => {
    const { authorization } = req.headers;
    const { username, idToken } = req.body;

    if (!authorization)
        return res.status(401).json({ error: 'Authorization token required' });

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        await User.findOneAndUpdate(
            { _id },
            {
                pfp: [
                    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
                    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
                ],
                $unset: {
                    access_token: 1,
                    refresh_token: 1,
                    now_playing: 1,
                },
            }
        );

        res.status(200).json({ username, idToken, spotifyToken: false });
    } catch (err) {
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = {
    signupUser,
    loginUser,
    addToken,
    removeToken,
    checkValidUsername,
};
