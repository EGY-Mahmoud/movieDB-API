import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import TvCards from "./TvCards";
import "../../App.css";

const Tv = () => {
  const apiUrl = "https://api.themoviedb.org/3/trending/tv";
  const imgPath = "https://image.tmdb.org/t/p/original";
  const [tv, setTv] = useState([]);
  const [selectedTv, setSelectedTv] = useState({});
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
    setSelectedTv(results[0]);
    setTv(results);
    console.log(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderMovies = () =>
    tv.map((tv) => (
      <TvCards key={tv.id} tv={tv} selectedTv={setSelectedTv} />
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
            TV <span style={{ color: "#48ff00" }}> Trailer </span> App
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
          backgroundImage: `url('${imgPath}${selectedTv.backdrop_path}')`,
        }}
      >
        {/*console.log(selectedMovie)*/}
        <div className="hero-content max-content">
          {/*<button className={"btn btn-outline-light"}>play</button>*/}
          <h4 className={"hero-tv-title"}>{selectedTv.name}</h4>
          {selectedTv.overview ? (
            <p className={"hero-overview"}> {selectedTv.overview} </p>
          ) : null}
        </div>
      </div>
      <div className="container2 max-content">{renderMovies()}</div>
    </div>
  );
};

export default Tv;
