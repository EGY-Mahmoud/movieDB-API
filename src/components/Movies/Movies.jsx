import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import MovieCards from "./MovieCards";
import "../../App.css";

const Movies = () => {
  const apiUrl = "https://api.themoviedb.org/3/trending/movie";
  const imgPath = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchkey, setSearchkey] = useState("");

  const fetchMovies = async (searchkey) => {
    const type = searchkey
      ? "search"
      : "day?api_key=52bbcddeda849047525b51d6f8a12361";
    const {
      data: { results },
    } = await axios.get(`${apiUrl}/${type}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: searchkey,
      },
    });
    setSelectedMovie(results[0]);
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () =>
    movies.map((movie) => (
      <MovieCards
        key={movie.id}
        movie={movie}
        selectedMovie={setSelectedMovie}
      />
    ));

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchkey);
  };

  return (
    <div className="Movie">
      <header className="header">
        <div className="header-content max-content">
          <span>
            Movie <span style={{ color: "#48ff00" }}> Trailer </span> App
          </span>
          <form onSubmit={searchMovies}>
            <input
              placeholder=" search . . ."
              type="text"
              onChange={(e) => setSearchkey(e.target.value)}
            />
            <button className="btn btn-success" type={"submit"}>
              search
            </button>
          </form>
        </div>
      </header>
      <div
        className="hero"
        style={{
          backgroundImage: `url('${imgPath}${selectedMovie.backdrop_path}')`,
        }}
      >
        {/*console.log(selectedMovie)*/}
        <div className="hero-content max-content">
          {/*<button className={"btn btn-outline-light"}>play</button>*/}
          <h1 className={"hero-title"}>{selectedMovie.title}</h1>
          {selectedMovie.overview ? (
            <p className={"hero-overview"}> {selectedMovie.overview} </p>
          ) : null}
        </div>
      </div>
      <div className="container2 max-content">{renderMovies()}</div>
    </div>
  );
};

export default Movies;
