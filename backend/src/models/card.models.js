const mongoose = require('../mongo/mongo');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  alt: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  price: {
    type: Number,
  },
  type: {
    type: String,
    enum: ['headphones', 'speakers', 'earphones', 'keyboard','speaker','mouse'],
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  }
}, { timestamps: true });

module.exports = mongoose.model('carddata', cardSchema);
