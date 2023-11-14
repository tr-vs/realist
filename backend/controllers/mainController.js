const { getNowPlaying, getUserProfilePic } = require('../services/spotify');

const home = async (req, res) => {
    console.log(getNowPlaying());
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
    home,
};
