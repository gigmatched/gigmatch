const express = require('express');
const router = express.Router();

const {
  getPublishedBlogs,
  getBlogBySlug,
  getFeaturedBlogs,
  searchBlogs,
  getBlogsByCategory,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById
} = require('../controllers/BlogController');

const auth = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminAuthMiddleware');

// Public Routes
router.get('/published', getPublishedBlogs);                // Retrieve all published blogs
router.get('/slug/:slug', getBlogBySlug);                     // Retrieve a blog by its slug
router.get('/featured', getFeaturedBlogs);                    // Retrieve featured blogs
router.get('/search', searchBlogs);                           // Search blogs by query parameter
router.get('/category/:category', getBlogsByCategory);        // Retrieve blogs filtered by category

// Admin Routes (Protected)
router.post('/', auth, adminAuth, createBlog);                // Create a new blog post
router.put('/:id', auth, adminAuth, updateBlog);              // Update a blog post by ID
router.delete('/:id', auth, adminAuth, deleteBlog);           // Delete a blog post by ID
router.get('/admin/all', auth, adminAuth, getAllBlogs);       // Retrieve all blogs (admin view)
router.get('/admin/:id', auth, adminAuth, getBlogById);       // Retrieve a specific blog by ID (admin view)

module.exports = router;