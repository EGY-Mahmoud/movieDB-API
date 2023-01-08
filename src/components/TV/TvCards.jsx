import React from "react";
import "../../App.css"


const MovieCards = ({ tv , selectedTv }) => {
  const imgPath = "https://image.tmdb.org/t/p/w500/";
  return (
    <div className={"movie_card"} onClick={()=> selectedTv(tv)}>
      {tv.poster_path ? (
        <img className={"movie-cover"} src={`${imgPath}${tv.poster_path}`} alt="" />
      ) : <div className={"movie-notfound"}>not available</div>}
      <h5 className={"movie-title"}>{tv.title}</h5>
    </div>
  );
};

export default MovieCards;
