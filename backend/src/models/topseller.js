const mongoose = require('../mongo/mongo');

const topsellerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['headphones', 'speakers', 'earphones', 'keyboard', 'speaker', 'mouse'],
    required: true,
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('topsellerdata', topsellerSchema);