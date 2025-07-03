const mongoose = require('../mongo/mongo');

const cardSchema = new mongoose.Schema({
  title: String,
  alt: String,
  imageUrl: String,
  price: Number,
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('carddata', cardSchema);