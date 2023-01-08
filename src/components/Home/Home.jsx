import React, { Component } from "react";
import axios from "axios";
export default class home extends Component {
  state = { movie: [], tv: [] };
  getMovies = async (mediaType) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=52bbcddeda849047525b51d6f8a12361`
    );
    // console.log(data.results);
    this.setState({ [mediaType]: data.results });
  };
  componentDidMount() {
    this.getMovies("movie");
    this.getMovies("tv");
  }

  render() {
    return (
      <>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4">
              <div className="item">
                <div className="topBorder w-25"></div>
                <h1>
                  Trinding <br /> Movies <br /> to watch now
                </h1>
                <br />
                <p className={"secondFontColor"}>Most Watched Movies By Days</p>
                <hr />
              </div>
            </div>
            {this.state.movie.slice(0, 10).map((value, index) => {
              return (
                <div key={index} className="col-md-2 my-3">
                  <div className="item">
                    <img
                      className="w-100"
                      src={"//image.tmdb.org/t/p/original" + value.poster_path}
                      alt=""
                    />
                    <h5>
                      {value.name} {value.title}
                    </h5>
                    <span className="vote">{value.vote_average}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row my-2">
            <div className="col-md-4">
              <div className="item">
                <div className="topBorder w-25"></div>
                <h1>
                  Trinding <br /> TV <br /> to watch now
                </h1>
                <br />
                <p className={"secondFontColor"}>Most Watched TV By Days</p>
                <hr />
              </div>
            </div>
            {this.state.tv.slice(0, 10).map((value, index) => {
              return (
                <div key={index} className="col-md-2 my-3">
                  <div className="item">
                    <img
                      className="w-100"
                      src={"//image.tmdb.org/t/p/original" + value.poster_path}
                      alt=""
                    />
                    <h5>
                      {value.name} {value.title}
                    </h5>
                    <span className="vote">{value.vote_average}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
