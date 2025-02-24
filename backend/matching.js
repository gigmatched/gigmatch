// server/matching.js

const User = require('./models/User');
const Gig = require('./models/Gig');

/**
 * Gig'e en uygun sanatçıları bulur ve öneri olarak ekler.
 * @param {Object} gig - Gig nesnesi.
 * @returns {Array} - Önerilen sanatçıların listesi.
 */
async function matchArtistsToGig(gig) {
  try {
    // 1. Tüm artistleri çek
    const artists = await User.find({ role: 'artist' });

    // 2. Filtre uygulamaları
    let suitableArtists = artists.filter(artist => {
      // a. Tarih uyumu
      const gigDate = new Date(gig.date).toISOString().split('T')[0];
      const isAvailable = artist.availability.some(av => {
        const avDate = new Date(av.date).toISOString().split('T')[0];
        return avDate === gigDate && av.available === true;
      });
      if (!isAvailable) return false;

      // b. Bütçe uyumu (Gig bütçesi >= sanatçının minFee)
      if (typeof artist.minFee !== 'number' || gig.budget < artist.minFee) return false;

      // c. Genre uyumu
      if (!artist.genre || !artist.genre.some(g => gig.genre.includes(g))) return false;

      // d. Artist type uyumu
      if (!artist.artistType || !artist.artistType.some(type => gig.lookingFor.includes(type))) return false;

      return true;
    });

    // 3. Sıralama ve sınırlama
    if (suitableArtists.length > 3) {
      suitableArtists.sort((a, b) => {
        // Daha önce tamamlanmış gig sayısına göre sırala (varsayımsal alan)
        // Eğer `completedGigsCount` yoksa sadece profil oluşturma tarihine göre sırala
        return (b.completedGigsCount || 0) - (a.completedGigsCount || 0) || new Date(a.createdAt) - new Date(b.createdAt);
      });
    }

    // İlk 3 sanatçıyı al
    suitableArtists = suitableArtists.slice(0, 3);

    // 4. Gig'e önerilen sanatçıları ekleme
    gig.suggestedArtists = suitableArtists.map(artist => artist._id);
    await gig.save();

    return suitableArtists;
  } catch (error) {
    console.error('Eşleştirme hatası:', error);
    return [];
  }
}

/**
 * Yeni bir sanatçı eklendiğinde uygun gig'lere öneri ekler.
 * @param {Object} artist - Sanatçı nesnesi.
 */
async function checkGigsForNewArtist(artist) {
  try {
    const openGigs = await Gig.find({ status: 'open' });

    for (let gig of openGigs) {
      // a. Tarih uyumu
      const gigDate = new Date(gig.date).toISOString().split('T')[0];
      const isAvailable = artist.availability.some(av => {
        const avDate = new Date(av.date).toISOString().split('T')[0];
        return avDate === gigDate && av.available === true;
      });
      if (!isAvailable) continue;

      // b. Bütçe uyumu
      if (typeof artist.minFee !== 'number' || gig.budget < artist.minFee) continue;

      // c. Genre uyumu
      if (!artist.genre || !artist.genre.some(g => gig.genre.includes(g))) continue;

      // d. Artist type uyumu
      if (!artist.artistType || !artist.artistType.some(type => gig.lookingFor.includes(type))) continue;

      // e. Öneri sayısı 3'ten azsa ekle
      if (gig.suggestedArtists.length < 3 && !gig.suggestedArtists.includes(artist._id)) {
        gig.suggestedArtists.push(artist._id);
        await gig.save();
      }
    }
  } catch (error) {
    console.error('Yeni sanatçı için gig öneri hatası:', error);
  }
}

module.exports = { matchArtistsToGig, checkGigsForNewArtist };
