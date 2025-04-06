const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const { checkGigsForNewArtist } = require('../matching');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Kayıt rotası (Register)
router.post('/register', async (req, res) => {
  try {
    const { fullname, email, password, role, genre, artistType, minFee, availability } = req.body;

    // Zorunlu alanlar
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({ message: 'Lütfen tüm zorunlu alanları doldurun.' });
    }

    // Email zaten kayıtlı mı kontrol ediyoruz
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email ile daha önce kayıt olunmuş.' });
    }

    // Yeni bir kullanıcı nesnesi oluşturuyoruz
    const newUser = new User({
      fullname,
      email,
      password,
      role,
      genre: role === 'artist' ? genre : undefined,
      artistType: role === 'artist' ? artistType : undefined,
      minFee: role === 'artist' ? minFee : undefined,
      availability: role === 'artist' ? availability : undefined
    });

    // Kullanıcıyı kaydediyoruz
    await newUser.save();

    // Eğer yeni kullanıcı bir sanatçı ise
    if (role === 'artist') {
      // Sanatçıya uygun gig önerilerini kontrol et
      await checkGigsForNewArtist(newUser);
      
      // Sanatçı için hoş geldin e-postası gönder
      const artistMsg = {
        to: email,
        from: 'welcome@gigmatch.io',
        templateId: "d-bdb37166037c492ab592764be59e1840" // Replace with your actual artist template ID
      };
      await sgMail.send(artistMsg);
    }

    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
});

// Giriş rotası (Login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email ve şifre gereklidir.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz kimlik bilgileri.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz kimlik bilgileri.' });
    }
    // Sign the token with a payload containing userId and role.
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ 
      message: 'Giriş başarılı', 
      token,
      user: { fullname: user.fullname, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
});

module.exports = router;