const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const passportLogin = (req, res) => {
    if (req.user) {

        const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        /// Create an object with the token and user ID
        const authData = {
            token,
            userId: req.user._id,
            message: "Authentication successful"
        };

        // Set the cookie options
        const cookieOptions = {
            secure: true,
            domain: "manga-website1.netlify.app",
            sameSite: 'none',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        };

        // Set the authData object as an HTTP-only cookie
        res.cookie('auth_data', authData, cookieOptions);
        res.redirect(`${process.env.CLIENT_URL}`)
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
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        // Perform user logout
        req.logout((err) => {
            if (err) {
                // Handle logout error
                return res.status(500).json({ success: false, msg: "Logout failed.", error: err });
            }
            // Redirect to the login page after successful logout
            return res.redirect(`${process.env.CLIENT_URL}login`);
        });
    } else {
        // User is already logged out
        return res.json({
            success: false,
            error: "User already logged out"
        });
    }
};


module.exports = {
    login,
    logout,
    passportLogin
};
