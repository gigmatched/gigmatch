const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const gigRoutes = require('./routes/gig');
const blogRoutes = require('./routes/blog');
const testRoutes = require('./routes/test');
const matchRoutes = require('./routes/match');
const subscriptionRoutes = require('./routes/subscription');
const googleAuthRoutes = require('./routes/googleAuth');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

// Mongoose settings
mongoose.set('strictQuery', false);

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'https://gigmatch.io', 'https://www.gigmatch.io', 'https://gigmatch-frontend.vercel.app/', 'https://api.gigmatch.io/'], // Include production domain as needed
  credentials: true,
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Çok fazla istek yapıldı, lütfen daha sonra tekrar deneyin.'
});
app.use(limiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/test', testRoutes);
app.use('/api/match', matchRoutes);
app.use('/api', subscriptionRoutes);

// Mount the Google OAuth callback route
// This handles the callback at /auth/google/callback
app.use('/', googleAuthRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Bir hata oluştu!');
});

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB bağlantısı başarılı');
  app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
  });
})
.catch((err) => {
  console.error('MongoDB bağlantı hatası:', err);
});

module.exports = app;