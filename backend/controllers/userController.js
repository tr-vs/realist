const User = require('../models/userModel');
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

        res.status(200).json({ email, idToken, spotifyToken });
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

        res.status(200).json({ email, idToken, spotifyToken });
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

        const user = await User.findOneAndUpdate(
            { _id },
            { refresh_token, access_token },
            { returnNewDocument: true }
        );

        const email = user.email;
        const idToken = createToken(user._id);
        const spotifyToken = user.access_token ? true : false;

        res.status(200).json({ email, idToken, spotifyToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = {
    signupUser,
    loginUser,
    addToken,
};
