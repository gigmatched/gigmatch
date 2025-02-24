// routes/gig.js
const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');
const auth = require('../middleware/authMiddleware');
const { matchArtistsToGig } = require('../matching'); // matching.js'den fonksiyonu içe aktarın

// POST /api/gigs/create
// Sadece organizer rolüne sahip kullanıcılar gig oluşturabilsin
router.post('/create', auth, async (req, res) => {
  try {
    const { _id, role } = req.user; 
    if (role !== 'organizer') {
      return res.status(403).json({ message: 'Sadece organizatörler gig oluşturabilir.' });
    }

    const { date, genre, lookingFor, budget } = req.body;

    // Zorunlu alanlar
    if (!date || !genre || !budget) {
      return res.status(400).json({ message: 'Lütfen gerekli alanları doldurun (date, genre, budget).' });
    }

    const newGig = new Gig({
      organizerId: _id,
      date,
      genre,
      lookingFor,
      budget
    });

    await newGig.save();

    // Gig oluşturulduktan sonra sanatçıları eşleştir
    const recommendedArtists = await matchArtistsToGig(newGig);

    if (recommendedArtists.length === 0) {
      res.status(201).json({ 
        message: 'Gig başarıyla oluşturuldu. Şu an size önerebileceğimiz bir sanatçı yok.', 
        gig: newGig 
      });
    } else {
      res.status(201).json({ 
        message: 'Gig başarıyla oluşturuldu ve önerilen sanatçılar eklendi.', 
        gig: newGig, 
        recommendedArtists: recommendedArtists 
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası. Gig oluşturulamadı.' });
  }
});

// GET /api/gigs
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.find({ status: 'open' }).populate('organizerId', 'fullname email');
    res.json(gigs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası. Gig listesi alınamadı.' });
  }
});

// POST /api/gigs/:id/apply
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const { userId, role } = req.user;

    if (role !== 'artist') {
      return res.status(403).json({ message: 'Sadece sanatçılar giglere başvurabilir.' });
    }

    const gigId = req.params.id;

    // Gig'i bul
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig bulunamadı.' });
    }

    // Gig'in durumu açık mı?
    if (gig.status !== 'open') {
      return res.status(400).json({ message: 'Bu gig için başvuru yapılamaz, açık değil.' });
    }

    // Aynı sanatçı daha önce başvurdu mu?
    const alreadyApplied = gig.applicants.includes(userId);
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Zaten bu gig\'e başvurdunuz.' });
    }

    // Başvuruyu ekle
    gig.applicants.push(userId);
    await gig.save();

    res.json({ message: 'Başvuru başarıyla yapıldı.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası. Başvuru yapılamadı.' });
  }
});

// GET /api/gigs/:id/applicants
router.get('/:id/applicants', auth, async (req, res) => {
  try {
    const { userId, role } = req.user;

    if (role !== 'organizer') {
      return res.status(403).json({ message: 'Sadece organizatörler başvuran sanatçıları görebilir.' });
    }

    const gigId = req.params.id;

    const gig = await Gig.findById(gigId).populate('applicants', 'fullname email');
    if (!gig) {
      return res.status(404).json({ message: 'Gig bulunamadı.' });
    }

    // Sadece gig'i oluşturan organizatör görebilir
    if (gig.organizerId.toString() !== userId) {
      return res.status(403).json({ message: 'Bu gig\'in başvuranlarını görme yetkiniz yok.' });
    }

    res.json(gig.applicants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sunucu hatası. Başvuran sanatçıları alınamadı.' });
  }
});

module.exports = router;