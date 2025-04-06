// backend/routes/test.js
const express = require('express');
const router = express.Router();

// Test route for blog functionality
router.get('/blog-test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Blog API is working correctly!',
    timestamp: new Date().toISOString()
  });
});

// Test route for checking blog database connection
router.get('/blog-db-test', async (req, res) => {
  try {
    const Blog = require('../models/Blog');
    const count = await Blog.countDocuments();
    
    res.json({
      success: true,
      message: 'Blog database connection successful',
      blogCount: count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Blog database connection failed',
      error: error.message
    });
  }
});

module.exports = router;
