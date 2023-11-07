const getNowPlaying = require('../services/spotify');

const nowPlaying = async (req, res) => {
    console.log(getNowPlaying());
};
