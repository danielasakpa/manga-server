const User = require('../models/user');
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


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// passport.serializeUser((user, done) => {
//     done(null, user.id); // Store the user ID in the session
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user); // Retrieve the user from the database using the stored ID
//     } catch (err) {
//       done(err);
//     }
//   });