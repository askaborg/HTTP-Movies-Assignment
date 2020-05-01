import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import SavedList from './Movies/SavedList'
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
import UpdateMovie from './Movies/UpdateMovie'

const App = () => {
  const [movies, setMovies] = useState([])
  const [savedList, setSavedList] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.message))
  }, [])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie])
  }

  const updateMovies = newMovie => {
    const newMovies = movies.map(movie =>
      (movie.id === newMovie.id && newMovie) || movie)
    setMovies(newMovies)
  }

  const deletedMovie = id => {
    const newMovies = movies.filter(movie => movie.id !== id)
    setMovies(newMovies)
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => {
          return <MovieList {...props} movies={movies} />
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} movies={movies}
            addToSavedList={addToSavedList} deletedMovie={deletedMovie} />
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovie {...props} movies={movies}
            updateMovies={updateMovies} />
        }}
      />
    </>
  )
}

export default App
