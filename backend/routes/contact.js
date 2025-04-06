const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
  
    // Process the contact message - e.g., store in database, send email, etc.
    const { name, email, message } = req.body;
    console.log(`Received contact message from ${name} (${email}): ${message}`);
  
    // Respond with a success message.
    return res.status(200).json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi. En kısa zamanda sizinle iletişime geçeceğiz.',
    });
  }
);

module.exports = router;