// controllers/userController.js
const User = require('../models/User');
const sendEmail = require('../utils/email');

// Kullanıcı profilini getir
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('User Controller: Kullanıcı ID:', userId); // Log ekleyin

    const user = await User.findById(userId).select('-password');
    console.log('User Controller: Kullanıcı bilgisi:', user); // Log ekleyin

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('User Controller Hatası:', error); // Daha detaylı log
    res.status(500).json({ 
      success: false, 
      message: 'Sunucu hatası. Profil alınamadı.',
      error: error.message // Hata mesajını ekleyin
    });
  }
};

// Kullanıcı profilini güncelle ve email gönder
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullname, genre, artistType, minFee, availability, city, country, wantsEmails, emailType } = req.body;

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

    // Email gönder
    if (wantsEmails) {
      const subject = 'Profil Güncellemesi';
      const text = `Merhaba ${user.fullname}, profiliniz başarıyla güncellendi.`;
      const html = `<p>Merhaba ${user.fullname},</p><p>Profiliniz başarıyla güncellendi.</p>`;
      await sendEmail(user.email, subject, text, html);
    }

    res.json({ message: 'Profil güncellendi.', user });
  } catch (error) {
    console.error('User Controller Hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası. Profil güncellenemedi.', error: error.message });
  }
};