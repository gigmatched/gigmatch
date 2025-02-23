// routes/user.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/UserController');
const User = require('../models/User');

// Profil getirme rotası (korumalı rota)
router.get('/profile', auth, getUserProfile);

// Profil güncelleme rotası (korumalı rota)
router.put('/profile', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullname, genre, artistType, minFee, availability, city, country , wantsEmails, emailType } = req.body;

    // Kullanıcıyı bul
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // Güncellemeleri yap
    if (fullname) user.fullname = fullname;
    if (genre) user.genre = genre;
    if (artistType) user.artistType = artistType;
    if (minFee) user.minFee = minFee;
    if (availability) user.availability = availability;
    if (city) user.city = city;
    if (country) user.country = country;
    if (wantsEmails !== undefined) user.wantsEmails = wantsEmails;
    if (emailType) user.emailType = emailType;

    await user.save();

    res.json({ message: 'Profil güncellendi.', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası. Profil güncellenemedi.' });
  }
});

module.exports = router;