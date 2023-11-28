const User = require('../models/userModel');
const { getUserProfile } = require('../services/spotify');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        // create a token
        const idToken = createToken(user._id);
        const spotifyToken = user.access_token ? true : false;
        const { username } = user;

        res.status(200).json({ username, idToken, spotifyToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signupUser = async (req, res) => {
    const { email, password, username, school, bio } = req.body;

    try {
        const user = await User.signup(email, password, username, school, bio);

        // create a token
        const idToken = createToken(user._id);
        const spotifyToken = user.access_token ? true : false;

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

        let pfp = [];
        if (profile.images[0]?.url !== undefined) {
            pfp = profile.images.map((image) => image.url);
        }

        const user = await User.findOneAndUpdate(
            { _id },
            { refresh_token, access_token, pfp },
            { returnNewDocument: true }
        );

        const { username } = user;
        const idToken = createToken(user._id);

        res.status(200).json({ username, idToken, spotifyToken: true });
    } catch (error) {
        console.error(error);
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
};
