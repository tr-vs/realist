const express = require('express');
const { home, profile } = require('../controllers/mainController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all page routes
router.use(requireAuth);

// user auth route
router.get('/home', home);

// user profile route
//router.get('/profile', profile);

module.exports = router;
