// models/Gig.js
const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  genre: { 
    type: String, 
    enum: ['rock', 'rnb/hiphop', 'rap', 'yöresel', 'tekno', 'house', 'electronic', 'pop', 'klasik', 'caz', 'indie', 'soul', 'alternatif'], 
    required: true 
  },
  lookingFor: [{ type: String, enum: ['cover', 'orijinal', 'mix', 'vokalist', 'grup', 'dj', 'enstrümantalist'] }],
  budget: { type: Number, required: true },
  status: { type: String, enum: ['open', 'matched', 'completed'], default: 'open' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // başvuran sanatçıların userId'leri
  suggestedArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // önerilen sanatçıların userId'leri
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gig', gigSchema);
