import React, { useRef } from 'react'
import classes from './AddMovies.module.css'

const AddMovies = (props) => {

    const titleRef = useRef(null);
    const openingTextRef = useRef(null);
    const releaseDateRef = useRef(null);
    
    function submitHandler(e) {
        e.preventDefault();

        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value,
        }
        props.onAddMovie(movie);
    }
    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' ref={titleRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor='opening-text'>Opening Text</label>
                <textarea rows='4' id='opening-text' ref={openingTextRef}></textarea>
            </div>
            <div className={classes.control}>
                <label htmlFor='date'>Release Date</label>
                <input type='text' id='date' ref={releaseDateRef}></input>
            </div>
            <button>Add Movie</button>
        </form>
    )
}

export default AddMovies
