import React from "react";
import "../../App.css"


const MovieCards = ({ movie , selectedMovie }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500/";
  return (
    <div className={"movie_card"} onClick={()=> selectedMovie(movie)}>
      {movie.poster_path ? (
        <img className={"movie-cover"} src={`${imgPath}${movie.poster_path}`} alt="" />
      ) : <div className={"movie-notfound"}>not available</div>}
      <h5 className={"movie-title"}>{movie.title}</h5>
    </div>
  );
};

export default MovieCards;
