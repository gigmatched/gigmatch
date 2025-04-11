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

// ******************* PUBLIC ROUTES *******************
// These static routes are defined first so that requests like /published 
// match getPublishedBlogs and are not mistaken for a dynamic parameter.
router.get('/published', getPublishedBlogs);          // GET /api/blogs/published?page=1&limit=9
router.get('/slug/:slug', getBlogBySlug);               // GET /api/blogs/slug/sample-blog-post
router.get('/featured', getFeaturedBlogs);              // GET /api/blogs/featured?limit=3
router.get('/search', searchBlogs);                     // GET /api/blogs/search?query=...
router.get('/category/:category', getBlogsByCategory);  // GET /api/blogs/category/music-business

// ******************* ADMIN ROUTES *******************
// All admin routes are explicitly prefixed with '/admin' so that there's no conflict.
router.post('/', auth, adminAuth, createBlog);          // POST /api/blogs/
router.put('/admin/:id', auth, adminAuth, updateBlog);    // PUT /api/blogs/admin/:id
router.delete('/admin/:id', auth, adminAuth, deleteBlog); // DELETE /api/blogs/admin/:id
router.get('/admin/all', auth, adminAuth, getAllBlogs);   // GET /api/blogs/admin/all
router.get('/admin/:id', auth, adminAuth, getBlogById);   // GET /api/blogs/admin/:id

module.exports = router;