const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
    index: true
  },
  author: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Optional, for registered users
    }
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null // null means it's a top-level comment
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  ipAddress: {
    type: String,
    select: false // Not included in query results by default
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for replies (nested comments)
commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment'
});

// Static method to get approved comments for a blog post
commentSchema.statics.getApprovedForBlog = function(blogId) {
  return this.find({ 
    blog: blogId, 
    status: 'approved',
    parentComment: null // Only get top-level comments
  })
  .sort({ createdAt: 1 })
  .populate({
    path: 'replies',
    match: { status: 'approved' },
    options: { sort: { createdAt: 1 } }
  });
};

// Static method to count approved comments for a blog post
commentSchema.statics.countApprovedForBlog = function(blogId) {
  return this.countDocuments({ blog: blogId, status: 'approved' });
};

module.exports = mongoose.model('Comment', commentSchema);
