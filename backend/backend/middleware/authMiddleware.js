// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token'ı header'dan al
      token = req.headers.authorization.split(' ')[1];

      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');
      console.log('Auth Middleware: Token bulundu ve kullanıcı bilgisi alındı:', req.user); // Log ekleyin

      return next(); // Fonksiyonu burada sonlandırmak için return kullanın
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Geçersiz token' }); // return ekleyin
    }
  }

  return res.status(401).json({ message: 'Token bulunamadı' }); // return ekleyin
};

module.exports = protect;