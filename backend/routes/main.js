const express = require('express');
const { community, profile } = require('../controllers/mainController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all page routes
router.use(requireAuth);

// community tab
router.get('/community', community);

// profile page
router.get('/profile/:username', profile);

module.exports = router;
