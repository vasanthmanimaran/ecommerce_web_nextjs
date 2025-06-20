const mongoose = require('../mongo/mongo');

const imageSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  button: String,
  imageUrl: String, 
}, { timestamps: true });


module.exports = mongoose.model('bannerimage', imageSchema);
