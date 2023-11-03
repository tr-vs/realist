const express = require('express');
const {
    userAuth,
    callback,
    refreshToken,
} = require('../controllers/spotifyController');

const router = express.Router();

// user auth route
router.get('/auth', userAuth);

// callback route
router.get('/call_back', callback);

module.exports = router;
