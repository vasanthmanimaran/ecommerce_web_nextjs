const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MongoDB_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Failed:", err));

module.exports = mongoose;

