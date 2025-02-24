// routes/match.js
const express = require('express');
const router = express.Router();
const { getGigMatches } = require('../controllers/MatchController');
const auth = require('../middleware/authMiddleware');

// Örnek bir eşleştirme rotası
// GET /api/match/gig/:gigId/matches
router.get('/gig/:gigId/matches', auth, async (req, res) => {
  try {
    const gigId = req.params.gigId;
    // Eşleştirme mantığınızı burada uygulayın
    // Örneğin, gig ile uyumlu sanatçıları bulabilirsiniz
    
    // Örnek yanıt
    res.json({ success: true, data: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Sunucu hatası.' });
  }
});

module.exports = router;