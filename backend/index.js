const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const app = express();

dotenv.config();

// Connect to MongoDB
require('./src/mongo/mongo'); // Adjust path if needed

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
}));
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// All routes
app.use(require('./src/routes/routes')); // Adjust path if routes are nested

// Start the server
const PORT = process.env.PORT || 7000; // Updated to 7001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});