const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  fullname: { 
    type: String, 
    required: function() { return this.role !== 'fan'; } // Required for all except fans
  },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function() { return this.role !== 'fan'; } // Required for non-fans (including admin)
  },
  role: { 
    type: String, 
    enum: ['artist', 'organizer', 'fan', 'admin'], // admin added here
    required: true 
  },
  // Fields valid only for artists/organizers (and optionally admins if applicable):
  genre: [{
    type: String,
    enum: ['rock', 'rnb/hiphop', 'rap', 'yöresel', 'tekno', 'house', 'electronic', 'pop', 'klasik', 'caz', 'indie', 'soul', 'alternatif']
  }],
  artistType: [{
    type: String,
    enum: ['cover', 'orijinal', 'mix', 'vokalist', 'grup', 'dj', 'enstrümantalist']
  }],
  minFee: { type: Number }, // minimum fee
  availability: [{
    date: { type: Date, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    available: { type: Boolean, default: true }
  }],
  wantsEmails: { type: Boolean, default: true },
  emailType: { 
    type: String, 
    enum: ['artist', 'organizer', 'fan', 'admin'], // admin added here, if needed
    // Require emailType for non-fans if the user wants emails.
    required: function() { return this.wantsEmails && this.role !== 'fan'; },
    default: function() {
      if (this.role === 'fan') return 'fan';
      if (this.role === 'artist') return 'artist';
      if (this.role === 'organizer') return 'organizer';
      if (this.role === 'admin') return 'admin';
      return undefined;
    }
  },
  createdAt: { type: Date, default: Date.now }
});

// Password Hashing (Skip hashing for fans or if password is not modified)
UserSchema.pre('save', async function (next) {
  if (this.role === 'fan' || !this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Allow passwordless matching for fans, normal for others.
UserSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.role === 'fan') return true;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);