
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../home.css";

function EditMovie() {
  const { movie_id } = useParams();
  const [movie, setMovie] = useState({});
  const [editedMovie, setEditedMovie] = useState({
    title: '',
    duration: '',
    language: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/movies/${movie_id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Movie:', data);
        setMovie(data[0]);
        setEditedMovie(data[0]); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setError('Error fetching movie details');
        setLoading(false);
      });
  }, [movie_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie(prevState => ({ ...prevState, [name]: value }));
  };

 
  
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/movies/${movie_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...movie, ...editedMovie }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Movie updated successfully!', responseData);
      navigate('/adminhome');
    } catch (error) {
      console.error('Error updating movie details:', error);
      setError('Error updating movie details');
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

 

  return (
    <>
    <div className='editmovie-container'>
      <div className="edit-movie-form">
        <h2>Edit Movie</h2>
        <div className="input-container">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedMovie.title || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={editedMovie.duration || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label>Language:</label>
          <input
            type="text"
            name="language"
            value={editedMovie.language || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <label>Release Date:</label>
          <input
            type="text"
            name="release_date"
            value={movie.release_date || ''}
            disabled
          />
        </div>
        <div className="button-container">
          <button onClick={handleUpdate}>Update Movie</button>
        </div>
      </div>
    </div>
  </>
  );
}

export default EditMovie;