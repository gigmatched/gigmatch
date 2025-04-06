const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true // For search functionality
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500,
    index: true // For search functionality
  },
  content: {
    type: String,
    required: true,
    index: true // For search functionality
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'musician-album', 
      'music-technology', 
      'music-business', 
      'musician-guides', 
      'music-events', 
      'music-venues'
    ],
    index: true // For category filtering
  },
  coverImage: {
    type: String, // URL to image
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true // For featured posts filtering
  },
  viewCount: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date,
    default: Date.now,
    index: true // For sorting by date
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  readTime: {
    type: Number, // Estimated read time in minutes
    default: 5
  },
  seoMetaDescription: {
    type: String,
    maxlength: 160 // Standard SEO meta description length
  },
  relatedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for comments
blogSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blog'
});

// Pre-save hook to generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }
  next();
});

// Method to increment view count
blogSchema.methods.incrementViewCount = async function() {
  this.viewCount += 1;
  return this.save();
};

// Static method to find featured posts
blogSchema.statics.findFeatured = function(limit = 5) {
  return this.find({ isFeatured: true, status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .populate('author', 'fullname')
    .select('-content');
};

// Static method for search
blogSchema.statics.search = function(query) {
  return this.find({
    $and: [
      { status: 'published' },
      {
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { excerpt: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } }
        ]
      }
    ]
  })
  .sort({ publishedAt: -1 })
  .populate('author', 'fullname');
};

module.exports = mongoose.model('Blog', blogSchema);
