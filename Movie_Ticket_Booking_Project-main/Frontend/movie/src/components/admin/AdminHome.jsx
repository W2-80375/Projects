import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./adminhome.css";
import AnimalLandscape from "../Image/AnimalLandscape.jpg";
import idiot from "../Image/idiot.jpg";
import anab from "../Image/anab.jpg";



function HomeAdmin() {
  const [movies, setMovies] = useState([]);



  useEffect(() => {

    fetch('http://localhost:4000/movies')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);




  const handleDelete = (movie_id) => {

    fetch(`http://localhost:4000/movies/${movie_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {

        console.log('Movie deleted:', data);
        setMovies(prevMovies => prevMovies.filter(movie => movie.movie_id !== movie_id));
      })
      .catch(error => console.error('Error deleting movie:', error));
  };


  return (
    <>
      <div className='admin-home'>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={AnimalLandscape} className="d-block w-100" alt="animal" />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            <div className="carousel-item">
              <img src={anab} className="d-block w-100" alt="landscapeHanuman" />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
            <div className="carousel-item">
              <img src={idiot} className="d-block w-100" alt="landscapeSalaar" />
              <div className="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <Link to="/addmovie">
            <button type="button" className="btn btn-primary">Add Movie</button>
          </Link>
        </div>

        <div className="movie-cards row row-cols-1 row-cols-md-3 g-2">
          {movies.map((movie, index) => (
            <div className="movie-card col" key={index}>
              <div className="card card-with-fixed-height">
                <img src={movie.image} className="card-img-top" alt={movie.title} />
                <div className="card-body">
                  <center>
                    <h1 className="card-title">{movie.title}</h1>
                  </center>
                  <Link to={`/editmovie/${movie.movie_id}`}>
                    <button type="button" className="btn btn-primary">
                      Edit Movie
                    </button>
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(movie.movie_id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomeAdmin
