const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');  // Import path module to serve static files

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Add this line

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Routes
app.use('/movies', require('./routes/movieRoutes'));  // Movie routes
app.use('/auth', require('./routes/authRoutes'));  // Auth routes

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
