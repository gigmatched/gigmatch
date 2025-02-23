const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User'); // Example user model import
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://gigmatch.io/auth/google/callback" // Your redirect URI
);

router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Authorization code not provided');
  }

  try {
    // Exchange code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Verify the ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    // Example: Find or create user in your database
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      // Create new user using details from Google
      user = new User({
        fullname: payload.name,
        email: payload.email,
        // Set any defaults for new users
        // You can set role as needed (e.g., "fan" or "artist")
      });
      await user.save();
    }

    // Generate your own auth token (JWT) for your application,
    // so you maintain your own session logic.
    const appToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirect back to your frontend with your JWT appended
    res.redirect(`https://gigmatch.io/profile?token=${appToken}`);
  } catch (error) {
    console.error('Google Auth error:', error);
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;