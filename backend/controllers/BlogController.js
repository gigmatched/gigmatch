const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

// Get all published blog posts with pagination
exports.getPublishedBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;

    // Build query
    const query = { status: 'published' };
    if (category) {
      query.category = category;
    }

    // Execute query with pagination
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'fullname')
      .select('-content'); // Exclude content for list view

    // Get total count for pagination
    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blogs'
    });
  }
};

// Get a single blog post by slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const blog = await Blog.findOne({ 
      slug, 
      status: 'published' 
    })
    .populate('author', 'fullname')
    .populate({
      path: 'comments',
      match: { status: 'approved', parentComment: null },
      options: { sort: { createdAt: 1 } },
      populate: {
        path: 'replies',
        match: { status: 'approved' },
        options: { sort: { createdAt: 1 } }
      }
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment view count
    await blog.incrementViewCount();

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blog post'
    });
  }
};

// Get featured blog posts
exports.getFeaturedBlogs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    // Instead of calling Blog.findFeatured, use a query to get featured blogs
    const featuredBlogs = await Blog.find({ 
      isFeatured: true, 
      status: 'published' 
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .populate('author', 'fullname');
    
    res.status(200).json({
      success: true,
      data: featuredBlogs
    });
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured blogs'
    });
  }
};

// Search blog posts
exports.searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const blogs = await Blog.search(query);
    
    res.status(200).json({
      success: true,
      data: blogs,
      count: blogs.length
    });
  } catch (error) {
    console.error('Error searching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching blogs'
    });
  }
};

// Get blog posts by category
exports.getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find({ 
      category, 
      status: 'published' 
    })
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'fullname')
    .select('-content');
    
    const total = await Blog.countDocuments({ 
      category, 
      status: 'published' 
    });
    
    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blogs by category'
    });
  }
};

// ADMIN CONTROLLERS

// Create a new blog post (admin only)
exports.createBlog = async (req, res) => {
  try {
    const { 
      title, 
      excerpt, 
      content, 
      category, 
      coverImage, 
      isFeatured, 
      status,
      seoMetaDescription,
      readTime
    } = req.body;
    
    // Create new blog post
    const blog = new Blog({
      title,
      excerpt,
      content,
      author: req.user._id, // From auth middleware
      category,
      coverImage,
      isFeatured: isFeatured || false,
      status: status || 'draft',
      seoMetaDescription,
      readTime
    });
    
    await blog.save();
    
    res.status(201).json({
      success: true,
      data: blog,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating blog post'
    });
  }
};

// Update a blog post (admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID'
      });
    }
    
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Update fields
    const {
      title,
      excerpt,
      content,
      category,
      coverImage,
      isFeatured,
      status,
      seoMetaDescription,
      readTime
    } = req.body;
    
    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (category) blog.category = category;
    if (coverImage) blog.coverImage = coverImage;
    if (isFeatured !== undefined) blog.isFeatured = isFeatured;
    if (status) blog.status = status;
    if (seoMetaDescription) blog.seoMetaDescription = seoMetaDescription;
    if (readTime) blog.readTime = readTime;
    
    await blog.save();
    
    res.status(200).json({
      success: true,
      data: blog,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating blog post'
    });
  }
};

// Delete a blog post (admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID'
      });
    }
    
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Delete associated comments first
    await Comment.deleteMany({ blog: id });
    
    // Delete the blog post
    await blog.remove();
    
    res.status(200).json({
      success: true,
      message: 'Blog post and associated comments deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting blog post'
    });
  }
};

// Get all blog posts for admin (including drafts)
exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'fullname');
    
    const total = await Blog.countDocuments();
    
    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching all blogs'
    });
  }
};

// Get a single blog post by ID for admin
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID'
      });
    }
    
    const blog = await Blog.findById(id)
      .populate('author', 'fullname');
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching blog post'
    });
  }
};
