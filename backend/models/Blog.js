const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverImage: {
    type: String, // URL veya dosya yolu
    required: false
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);