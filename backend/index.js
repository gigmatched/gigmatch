const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Import API routes
const googleAuthRoutes = require('./routes/googleAuth');
const blogRoutes = require('./routes/blog');

// Middleware (add any additional middleware here)
app.use(express.json());

// Mount API routes BEFORE static file serving
app.use('/api', googleAuthRoutes);
app.use('/api/blogs', blogRoutes);

// Serve static files if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  // Fallback: Send index.html for any unknown routes.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Bir hata oluştu!');
});

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB bağlantısı başarılı');
    // Only call app.listen() when not in a serverless environment (like Vercel)
    if (!process.env.VERCEL_ENV) {
      app.listen(PORT, () => {
        console.log(`Sunucu ${PORT} portunda çalışıyor`);
      });
    }
  })
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
  });

module.exports = app;