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
      // console.log(data);

      const LoadedMovies = [];

      for(const key in data){
        LoadedMovies.push({
          id: key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate,
          
        })
      }
      setMovies(LoadedMovies);
    }
    catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://movies-8b1e9-default-rtdb.firebaseio.com/movies.json',{
      method:'post',
      body:JSON.stringify(movie),
      headers:{
          'content-type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  async function handleDelete (id) {
    try {
      await fetch(
        `https://movies-8b1e9-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie = {addMovieHandler}/>
      </section>
      
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} handleDelete={handleDelete}/>}
        {!isloading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isloading && error && <p>{error}</p>}
        {isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}


export default App;
