const express = require('express');
const { userAuth } = require('../controllers/spotifyController');

const router = express.Router();

// user auth route
router.get('/auth', userAuth);
