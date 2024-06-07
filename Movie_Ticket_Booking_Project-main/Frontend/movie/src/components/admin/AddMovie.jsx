import React, { useState } from 'react';
import "./addmovie.css";
import { useNavigate } from 'react-router-dom';

function AddMovie() {
  const navigate = useNavigate();
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    duration: '',
    language: '',
    release_date: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleAddMovie = async () => {
    try {
      const response = await fetch('http://localhost:4000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Movie added successfully!', responseData);
      navigate("/adminhome");
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };


  return (
    <div className='add-movie'>
      <div className="container mt-5 add-movie-container">
        <div className="col-md-6">
          <div className="add-movie-card">
            <div className="add-movie-header">
              <div className="card-header">
                <h2>Add Movie</h2>
              </div>
            </div>
            <div className="add-movie-form">
              <div className="add-movie-info">
                <label>Title:</label>
                <input
                  className="add-movie-input"
                  type="text"
                  name="title"
                  value={newMovie.title}
                  onChange={handleInputChange}
                />
                <label>Description:</label>
                <input
                  className="add-movie-input"
                  type="text"
                  name="description"
                  value={newMovie.description}
                  onChange={handleInputChange}
                />
                <label>Duration:</label>
                <input
                  className="add-movie-input"
                  type="text"
                  name="duration"
                  value={newMovie.duration}
                  onChange={handleInputChange}
                />
                <label>Language:</label>
                <input
                  className="add-movie-input"
                  type="text"
                  name="language"
                  value={newMovie.language}
                  onChange={handleInputChange}
                />
                <label>Release Date:</label>
                <input
                  className="add-movie-input"
                  type="date"
                  name="release_date"
                  value={newMovie.release_date}
                  onChange={handleInputChange}
                />
                <label>Image:</label>
                <input
                  className="add-movie-input"
                  type="text"
                  name="image"
                  value={newMovie.image}
                  onChange={handleInputChange}
                />
                <button className="add-movie-button" onClick={handleAddMovie}>
                  Add Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;