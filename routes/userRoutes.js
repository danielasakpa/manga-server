const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const { validateUserId } = require('../middlewares/validateInput');

// Get all users (requires authentication)
router.get('/', authMiddleware, getAllUsers);

// Get one user (requires authentication)
router.get('/:id', authMiddleware, validateUserId, getOneUser);

// Create a user (no authentication required)
router.post('/', createUser);

// Update a user (requires authentication)
router.patch('/:id', authMiddleware, validateUserId, updateUser);

// Delete a user (requires authentication)
router.delete('/:id', authMiddleware, validateUserId, deleteUser);

module.exports = router;