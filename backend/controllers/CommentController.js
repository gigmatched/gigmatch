const Comment = require('../models/Comment');
const Blog = require('../models/Blog');
const mongoose = require('mongoose');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { blogId, name, email, content, parentCommentId } = req.body;
    
    // Validate blog exists
    const blog = await Blog.findOne({ 
      _id: blogId, 
      status: 'published' 
    });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found or not published'
      });
    }
    
    // Create comment object
    const commentData = {
      blog: blogId,
      author: {
        name,
        email
      },
      content,
      ipAddress: req.ip
    };
    
    // If user is logged in, add their user ID
    if (req.user) {
      commentData.author.userId = req.user._id;
      
      // Auto-approve comments from logged-in users
      commentData.status = 'approved';
    }
    
    // If it's a reply, add parent comment reference
    if (parentCommentId) {
      // Validate parent comment exists
      const parentComment = await Comment.findOne({ 
        _id: parentCommentId,
        blog: blogId,
        status: 'approved'
      });
      
      if (!parentComment) {
        return res.status(404).json({
          success: false,
          message: 'Parent comment not found'
        });
      }
      
      commentData.parentComment = parentCommentId;
    }
    
    // Create and save the comment
    const comment = new Comment(commentData);
    await comment.save();
    
    res.status(201).json({
      success: true,
      data: comment,
      message: req.user ? 'Comment posted successfully' : 'Comment submitted for approval'
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating comment'
    });
  }
};

// Get comments for a blog post (public)
exports.getCommentsForBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    
    const comments = await Comment.getApprovedForBlog(blogId);
    
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching comments'
    });
  }
};

// ADMIN CONTROLLERS

// Get all comments (admin only)
exports.getAllComments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status || 'pending'; // Default to pending for moderation
    
    const comments = await Comment.find({ status })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('blog', 'title slug');
    
    const total = await Comment.countDocuments({ status });
    
    res.status(200).json({
      success: true,
      data: comments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching all comments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching comments'
    });
  }
};

// Update comment status (admin only)
exports.updateCommentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const comment = await Comment.findById(id);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    comment.status = status;
    await comment.save();
    
    res.status(200).json({
      success: true,
      data: comment,
      message: `Comment ${status}`
    });
  } catch (error) {
    console.error('Error updating comment status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating comment status'
    });
  }
};

// Delete a comment (admin only)
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const comment = await Comment.findById(id);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }
    
    // If it's a parent comment, delete all replies too
    if (!comment.parentComment) {
      await Comment.deleteMany({ parentComment: id });
    }
    
    await comment.remove();
    
    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting comment'
    });
  }
};
