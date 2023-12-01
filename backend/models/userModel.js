const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
    },
    school: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    access_token: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    nowPlaying: {
        type: String,
    },
    pfp: [
        {
            type: String,
            default:
                'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
        },
        {
            type: String,
            default:
                'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
        },
    ],
    followers: [{ type: String }],
    following: [{ type: String }],
});

module.exports = mongoose.model('User', userSchema);
