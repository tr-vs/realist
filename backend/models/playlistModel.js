const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    school: String,
    playlistID: String,
});

module.exports = mongoose.model('Playlist', playlistSchema);
