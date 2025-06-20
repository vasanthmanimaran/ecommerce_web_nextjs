const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors')

dotenv.config();
require('../backend/src/mongo/mongo'); // MongoDB connection
app.use(cors({
  origin: 'http://localhost:3001', // adjust this as needed
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads')); // to serve image files
app.use(require('./src/routes/routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

