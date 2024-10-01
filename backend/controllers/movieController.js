const Movie = require('../models/movie');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Directory to store the images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Create unique filenames
  }
});

const upload = multer({ storage: storage }).single('poster'); // Handle single image file upload

// Create new movie
exports.createMovie = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send('Error uploading file');
    }

    const { title, genre, director, releaseYear, description } = req.body;

    // Check if an image was uploaded
    const poster = req.file ? req.file.path : '';

    try {
      const newMovie = new Movie({
        title,
        genre,
        director,
        releaseYear,
        description,
        poster // Save the image path to the database
      });

      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).send('Error creating movie');
    }
  });
};
