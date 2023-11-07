const express = require('express');
const { nowPlaying, callback } = require('../controllers/spotifyController');

const router = express.Router();

// require auth for all spotify api routes
router.use(requireAuth);

// user auth route
router.get('/nowPlaying', userAuth);

module.exports = router;
