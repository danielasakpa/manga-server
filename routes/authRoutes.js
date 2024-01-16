const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Login
router.post('/login', login);

module.exports = router;
