// controllers/matchController.js
const Gig = require('../models/Gig');
const User = require('../models/User');

exports.getGigMatches = async (req, res) => {
  try {
    const { gigId } = req.params;
    
    // Gig'i bul
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ success: false, message: 'Gig not found.' });
    }
    
    // Filtre kriterleri
    const { date, genre, lookingFor, budget } = gig;
    
    // ±%5 Tolerans
    const budgetMin = budget * 0.95;
    const budgetMax = budget * 1.05;
    
    // 1. Bütçe Uygunluğu
    // 2. Genre
    // 3. ArtistType
    // 4. Availability
    
    // Temel filtre örneği (pseudocode)
    // Mongoose Sorgusu:
    const matchedArtists = await User.find({
      role: 'artist',
      // Bütçe
      minFee: { $gte: budgetMin, $lte: budgetMax },
      // Genre ortak eleman
      genre: { $in: genre },
      // Artist Type ortak eleman
      artistType: { $in: lookingFor }
      // Availability => Daha karmaşık bir sorgu, belki .filter() ile custom kontrol
    });
    
    // Availability Kontrolü
    // matchedArtists = matchedArtists.filter(artist => 
    //   artist.availability.some(av => av.date === gig.date && <saat kontrolü>)
    // );
    
    res.json({ success: true, data: matchedArtists });
  } catch (error) {
    console.error('MatchController getGigMatches Error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};