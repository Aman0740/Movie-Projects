const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true }  // Add this line to store the poster path
});

module.exports = mongoose.model('Movie', movieSchema);
