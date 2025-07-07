const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// DB
require('./src/mongo/mongo');

// Middleware - Updated CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', // For local development
    'https://ecommerce-web-nextjs-6.onrender.com' // Your live frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/', require('./src/routes/routes'));

const PORT = process.env.PORT || 7004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});