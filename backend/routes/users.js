const express = require('express');
const {
    signupUser,
    loginUser,
    addToken,
} = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// update spotify token for user
router.patch('/token', addToken);

module.exports = router;
