const getNowPlaying = require('../services/spotify');

const home = async (req, res) => {
    console.log(getNowPlaying());
};

module.exports = {
    home,
};
