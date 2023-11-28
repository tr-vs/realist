const express = require('express');
const {
    signupUser,
    loginUser,
    addToken,
    removeToken,
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// update spotify token for user
router.patch('/token', addToken);

router.patch('/disconnectSpotify', removeToken);

module.exports = router;
