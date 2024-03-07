const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Passport.js with Google OAuth2.0
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://manga-server-luxr.onrender.com/api/auth/google/callback'
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            // Here you can save the user's information to your database
            const userEmail = profile.emails[0].value;

            // Find the user by email
            let user = await User.findOne({ email: userEmail });

            if (user) {
                // User already exists, just return the user
                return done(null, user);
            } else {
                // Create a new user
                const newUser = new User({
                    username: profile.displayName,
                    email: userEmail,
                    password: profile.id
                });

                // Save the new user and return it
                user = await newUser.save();
                return done(null, user);
            }
        } catch (err) {
            return done(err);
        }
    }
));


const googleAuthCallback = async (req, res, next) => {
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: false }, async (error, user, info) => {
        if (error) {
            return res.send({ message: error.message });
        }
        if (user) {
            try {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

                /// Create an object with the token and user ID
                const authData = {
                    token,
                    userId: user._id
                };
                
                // Set the authData object as an HTTP-only cookie
                res.cookie('auth_data', authData);

                // Redirect the user to the React app
                res.redirect(`${process.env.CLIENT_URL}`);
            } catch (error) {
                // error msg 
                return res.send({ message: error.message });
            }
        }
    })(req, res, next);
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

module.exports = {
    login,
    googleAuthCallback
};
