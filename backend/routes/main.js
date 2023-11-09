const express = require('express');
const { posts } = require('../controllers/mainController');

const router = express.Router();

// require auth for all page routes
router.use(requireAuth);

// user auth route
router.get('/home', home);

module.exports = router;
