const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header.
      token = req.headers.authorization.split(' ')[1];

      // Verify token.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Retrieve user details and attach it to req.user, omitting password.
      req.user = await User.findById(decoded.userId).select('-password');
      console.log('Auth Middleware: Token found; user info loaded:', req.user);

      return next();
    } catch (error) {
      console.error('Auth Middleware error:', error);
      return res.status(401).json({ message: 'Geçersiz token' });
    }
  }

  return res.status(401).json({ message: 'Token bulunamadı' });
};

module.exports = protect;