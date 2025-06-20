const mongoose = require('../mongo/mongo');

const cardSchema = new mongoose.Schema({
    title: String,
    alt: String,
    imageUrl: String,
}, { timestamps: true });


module.exports = mongoose.model('carddata', cardSchema);
