const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/Users');
const bcrypt = require('bcryptjs');

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Local Strategy (Email/Password)
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      
      // If user not found
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Check password match
      const isMatch = await user.matchPassword(password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Success
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Get profile photo URL
      const photoURL = profile.photos && profile.photos.length > 0 
        ? profile.photos[0].value 
        : null;
      
      // Check if user exists
      let user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Update photo URL if it exists and user doesn't have one
        if (photoURL && !user.photoURL) {
          user.photoURL = photoURL;
          await user.save();
        }
        
        // User exists, return user
        return done(null, user);
      } else {
        // Create new user
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          photoURL: photoURL,
          // Generate a random secure password
          password: bcrypt.hashSync(Math.random().toString(36).slice(-8) + 
                                   Math.random().toString(36).slice(-8), 10)
        });
        
        await newUser.save();
        return done(null, newUser);
      }
    } catch (error) {
      return done(error);
    }
  }
));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/github/callback",
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Get email from GitHub profile (may be private)
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      
      if (!email) {
        return done(new Error('GitHub email not available. Please make your email public or use another login method.'));
      }
      
      // Get profile photo
      const photoURL = profile.photos && profile.photos.length > 0 
        ? profile.photos[0].value 
        : null;
      
      // Check if user exists
      let user = await User.findOne({ email });
      
      if (user) {
        // Update photo URL if it exists and user doesn't have one
        if (photoURL && !user.photoURL) {
          user.photoURL = photoURL;
          await user.save();
        }
        
        // User exists, return user
        return done(null, user);
      } else {
        // Create new user
        const newUser = new User({
          name: profile.displayName || profile.username,
          email,
          photoURL: photoURL,
          // Generate a random secure password
          password: bcrypt.hashSync(Math.random().toString(36).slice(-8) + 
                                   Math.random().toString(36).slice(-8), 10)
        });
        
        await newUser.save();
        return done(null, newUser);
      }
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = passport; 