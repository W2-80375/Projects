import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'; 
import "./home.css";
import AnimalLandscape from "./Image/AnimalLandscape.jpg";
import idiot from "./Image/idiot.jpg";
import anab from "./Image/anab.jpg";

function Home() {
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

  return (
    <>
    <div className='home'>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={AnimalLandscape} className="d-block w-100" alt="animal" />
            <div className="carousel-caption d-none d-md-block">
             
            </div>
          </div>
          <div className="carousel-item">
            <img src={anab} className="d-block w-100" alt="landscapeHanuman" />
            <div className="carousel-caption d-none d-md-block">
             
            </div>
          </div>
          <div className="carousel-item">
            <img src={idiot} className="d-block w-100" alt="landscapeSalaar" />
            <div className="carousel-caption d-none d-md-block">
            
            </div>
          </div>
        </div>
      </div>
      

      <div className="row row-cols-1 row-cols-md-3 g-2">
        {movies.map((movie, index)=>( 
        <div className="col" key={index}>
            <Link to={`/moviedetails/${movie.movie_id}`}>
          <div className="card card-with-fixed-height">
            <img src={movie.image} className="card-img-top" alt={movie.title} />
            <div className="card-body">
              <center>
              <h5 className="card-title">{movie.title}</h5>
              <p>Language: {movie.language}</p> 
              </center>            
            </div>
          </div>
          </Link>
        </div>
         ))}
      </div>


      </div>
    </>
  )
}

export default Home
