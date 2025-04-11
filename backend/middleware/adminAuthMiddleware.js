module.exports = (req, res, next) => {
  // Ensure req.user is set prior by your authentication middleware
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: 'Access denied. Admins only.'
  });
};