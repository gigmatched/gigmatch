const express = require('express');
const router = express.Router();
const { 
  createComment, 
  getCommentsForBlog, 
  getAllComments,
  updateCommentStatus,
  deleteComment
} = require('../controllers/CommentController');
const auth = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminAuthMiddleware');
const optionalAuth = require('../middleware/optionalAuthMiddleware');

// Public routes (with optional auth for auto-approval of logged-in users)
router.post('/', optionalAuth, createComment);
router.get('/blog/:blogId', getCommentsForBlog);

// Admin routes (protected)
router.get('/admin/all', auth, adminAuth, getAllComments);
router.put('/admin/:id/status', auth, adminAuth, updateCommentStatus);
router.delete('/admin/:id', auth, adminAuth, deleteComment);

module.exports = router;
