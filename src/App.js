import React, { useState } from 'react'
import './App.css';
import MoviesList from './components/MoviesList';


function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false)

  async function fetchMoviesHandler() {
    setIsLoading(true);
    const response = await fetch('https://swapi.py4e.com/api/films/')
    const data = await response.json();
    const transformedMovies = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date
      }
    })
    setMovies(transformedMovies);
    setIsLoading(false);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies}/>}
        {!isloading && movies.length === 0 && <p>Found no movies</p>}
        {isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}


export default App;