const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteCategory: { type: String }, // Add this field for related product matching
});

module.exports = mongoose.model('User', userSchema);
