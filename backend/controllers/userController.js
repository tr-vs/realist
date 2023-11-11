const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signupUser = async (req, res) => {
    const { email, password, username, school, bio } = req.body;

    try {
        const user = await User.signup(email, password, username, school, bio);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addToken = async (req, res) => {
    const { token } = req.body;
};

module.exports = {
    signupUser,
    loginUser,
    addToken,
};
