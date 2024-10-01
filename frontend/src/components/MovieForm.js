import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null); // State for image
  const [director, setDirector] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [description, setDescription] = useState('');
  
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the selected image file to state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = new FormData();
    movieData.append('title', title);
    movieData.append('poster', image); // Append the image to FormData
    movieData.append('director', director);
    movieData.append('releaseYear', releaseYear);
    movieData.append('description', description);

    try {
      const response = await axios.post('/movies', movieData, {
        headers: {
          'Content-Type': 'multipart/form-data' // To handle image uploads
        }
      });
      if (response.status === 201) {
        alert('Movie added successfully!');
        navigate('/movies');  // Redirect to the movie list after adding
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie.');
    }
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Movie Poster:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
          />
        </div>
        <div>
          <label>Director:</label>
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Release Year:</label>
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default MovieForm;
