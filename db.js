const mongoose = require('mongoose');

// MongoDB connection URL
// const monourl = "mongodb://localhost:27017/hotels";
require('dotenv').config();
// Connect to MongoDB
const monourl = process.env.DB_URL;
mongoose.connect(monourl);

// Get the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.on('connected', () => {
  console.log('MongoDB connected successfully');
});

// Event listener for connection error
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Export the database connection
module.exports = db;
