const express = require('express');
const {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/userController');

const router = express.Router();

// GET all users
router.get('/', getUsers);

// GET a single user
router.get('/:id', getUser);

// POST a new user
router.post('/', createUser);

// DELETE a new user
router.delete('/:id', deleteUser);

// UPDATE a new user
router.patch('/:id', updateUser);

module.exports = router;
