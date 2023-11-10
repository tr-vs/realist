const express = require('express');
const { home } = require('../controllers/mainController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all page routes
router.use(requireAuth);

// user auth route
router.get('/home', home);

module.exports = router;
