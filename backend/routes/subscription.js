const express = require('express');
const router = express.Router();
const User = require('../models/User');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST /api/subscribe/fan (Fan Subscription Route)
router.post('/subscribe/fan', async (req, res) => {
  try {
    // 1. Get email from request body
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // 2. Create/update user with role 'fan'
    const user = await User.findOneAndUpdate(
      { email, role: 'fan' },
      {
        email,
        role: 'fan',
        unsubscribed: false,
        subscribedAt: new Date()
      },
      { upsert: true, new: true }
    );

    // 3. Send welcome email to fan using fan template
    const fanMsg = {
      to: email,
      from: 'welcome@gigmatch.io',
      templateId: "d-7bdae10d630548e9848b7ffd831957c3" // Replace with your fan template ID
    };
    await sgMail.send(fanMsg);

    // 4. Remove sensitive fields before sending the response (if any)
    const userResponse = user.toObject();
    delete userResponse.password;

    // Log for debugging purposes
    console.log("User subscribed:", userResponse);

    // 5. Send success response
    return res.status(200).json({
      success: true,
      message: 'Fan subscribed successfully!',
      user: userResponse
    });
  } catch (error) {
    console.error('Fan subscription error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;