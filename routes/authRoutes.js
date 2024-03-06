const express = require('express');
const router = express.Router();
const { login, googleAuthCallback } = require('../controllers/authController');
const passport = require('passport');


const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Login
router.post('/login', login);

router.get('/google', googleAuth);

router.get('/google/callback', googleAuthCallback);

module.exports = router;
