const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const googleAuthCallback = async (req, res, next) => {
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}login` }, async (error, user, info) => {
        if (error) {
            return res.send({ message: error.message });
        }
        if (user) {
            try {
                // Redirect the user to the React app
                res.redirect(`${process.env.CLIENT_URL}`);
            } catch (error) {
                // error msg 
                return res.send({ message: error.message });
            }
        }
    })(req, res, next);
}

const passportLogin = (req, res) => {
    if (req.user) {

        const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        /// Create an object with the token and user ID
        const authData = {
            token,
            userId: req.user._id
        };

        // Set the cookie options
        const cookieOptions = {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        };

        // Set the authData object as an HTTP-only cookie
        res.cookie('auth_data', authData, cookieOptions);
        res.json({
            message: "Authentication successful"
        })
    }
}


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Create and sign a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // Return success response with the token
        res.json({
            userId: user._id,
            message: 'Authentication successful',
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const logout = (req, res) => {
    req.session = null
    req.logout();
    res.redirect(`${process.env.CLIENT_URL}login`);
}

module.exports = {
    login,
    logout,
    passportLogin,
    googleAuthCallback
};
