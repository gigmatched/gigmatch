// backend/routes/blog.js

const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { body, validationResult } = require('express-validator');
const protect = require('../middleware/authMiddleware'); // Düzenlenmiş import

// Blog oluşturma (Admin veya Yazar yetkisi gerektirebilir)
router.post('/', protect, [
  body('title').notEmpty().withMessage('Başlık gerekli'),
  body('excerpt').notEmpty().withMessage('Excerpt gerekli').isLength({ max: 500 }).withMessage('Excerpt en fazla 500 karakter olabilir'),
  body('content').notEmpty().withMessage('İçerik gerekli'),
  // coverImage isteğe bağlı olduğu için validasyona gerek yok
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { title, excerpt, content, coverImage } = req.body;

  try {
    const blog = await Blog.create({
      title,
      excerpt,
      content,
      author: req.user._id,
      coverImage
    });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Tüm blogları listeleme
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username email').sort({ publishedAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Belirli bir blogu getirme
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username email');

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog bulunamadı' });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Blog güncelleme (Sadece oluşturucu veya admin)
router.put('/:id', protect, [
  body('title').optional().notEmpty().withMessage('Başlık boş olamaz'),
  body('excerpt').optional().notEmpty().withMessage('Excerpt boş olamaz').isLength({ max: 500 }).withMessage('Excerpt en fazla 500 karakter olabilir'),
  body('content').optional().notEmpty().withMessage('İçerik boş olamaz'),
  // coverImage isteğe bağlı olduğu için validasyona gerek yok
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog bulunamadı' });
    }

    // Sadece oluşturucu veya admin yetkisi varsa güncelleyebilir
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Bu blogu güncelleme yetkiniz yok' });
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Blog silme (Sadece oluşturucu veya admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog bulunamadı' });
    }

    // Sadece oluşturucu veya admin yetkisi varsa silebilir
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Bu blogu silme yetkiniz yok' });
    }

    await blog.remove();

    res.status(200).json({ success: true, message: 'Blog silindi' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;