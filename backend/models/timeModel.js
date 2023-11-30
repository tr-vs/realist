const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeSchema = new Schema(
    {
        nextPostDate: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Time', timeSchema);
