const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  band: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  genre: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },

  discography: [
    {
      title: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
