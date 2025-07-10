const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String
});     

module.exports = mongoose.model('Address', addressSchema);