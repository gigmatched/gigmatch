// backend/routes/test.js

const express = require('express');
const router = express.Router();

// Basit bir test rotası
router.get('/hello', (req, res) => {
  res.json({ message: 'Merhaba, GigMatch Backend!' });
});

module.exports = router;