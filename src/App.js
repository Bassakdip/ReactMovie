import React, { useCallback, useEffect, useState } from 'react'
import './App.css';
import MoviesList from './components/MoviesList';
import AddMovies from './components/AddMovies';


function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async() => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://movies-8b1e9-default-rtdb.firebaseio.com/movies.json')
      if (!response.ok) {
        throw new Error("Something went wrong...retrying");
      }
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
    }
    catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie = {addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isloading && error && <p>{error}</p>}
        {isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}


export default App;
