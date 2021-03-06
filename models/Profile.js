const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  tipe: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  premium: {
    type: Boolean
  },
  displayPicture: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  genre: {
    type: [String]
  },
  bio: {
    type: String
  },

  media: [
    {
      title: {
        type: String,
        required: true
      },
      mediatype: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  jadwal: [
    {
      title: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      tanggal: {
        type: Date,
        required: true
      },
      description: {
        type: String
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
