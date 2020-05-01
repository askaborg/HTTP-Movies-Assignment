import React from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'

export default class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: null
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    this.fetchMovie(id)
  }

  componentWillReceiveProps(newProps) {
    const { id } = this.props.match.params
    const { newId } = newProps.match.params

    if (id !== newId) {
      this.fetchMovie(newId)
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.message))
  }

  updateMovie = () => {
    const { id } = this.state.movie
    const { history } = this.props

    history.push(`/update-movie/${id}`)
  }

  deleteMovie = () => {
    const { id } = this.state.movie
    const { deletedMovie, history } = this.props

    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => console.log('Delete', res.data))
      .catch(err => console.log(err.message))
    deletedMovie(id)
    history.push('/')
  }

  // saveMovie = () => {
  //   const addToSavedList = this.props.addToSavedList
  //   addToSavedList(this.state.movie)
  // }

  render() {
    const { movie } = this.state
    const { saveMovie, updateMovie, deleteMovie } = this

    if (!movie) {
      return <div>Loading movie information...</div>
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={movie} />
        <div className="save-button" onClick={saveMovie}>
          Save
        </div>
        <button onClick={updateMovie}>
          Update
        </button>
        <button onClick={deleteMovie}>
          Delete
        </button>
      </div>
    )
  }
}
