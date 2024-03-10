const express = require('express');
const router = express.Router();
const { login, logout, passportLogin } = require('../controllers/authController');
const passport = require('passport');


const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Login
router.post('/login', login);

router.get("/login/success", passportLogin);

router.get("/logout", logout);

router.get('/google', googleAuth);

router.get('/google/callback', passport.authenticate("google", {
    successRedirect: `https://manga-server-luxr.onrender.com/api/auth/login/success`,
    failureRedirect: "/login/failed",
    failureFlash: true
}));

module.exports = router;
