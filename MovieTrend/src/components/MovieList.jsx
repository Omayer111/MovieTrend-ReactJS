import React from "react";

const MovieList = ({ movieData }) => {
  if (!movieData || !movieData.results || movieData.results.length === 0) {
    return <h2 className="wrapper">No movies found.</h2>;
  }
  return (
    <div className="all-movies">
      <h2>Popular</h2>
      <ul>
        {movieData.results.slice(0, 300).map((movie, index) => (
          <li key={movie.id} className="movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "../../public/No-poster.png"
              }
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <div className="content">
              <div className="rating">
                <img src="../public/star.svg" alt="star" />
                <p>{movie.vote_average.toFixed(1)}</p>
              </div>

              <p className="content lang">{movie.original_language}</p>
              <p className="content year">
                {movie.release_date
                  ? movie.release_date.substr(0, 4)
                  : "Not available"}
              </p>
              <img
                className="h-7 w-6 ml-15 lg:ml-20 cursor-pointer"
                src="../../public/star-empty.svg"
                alt="star"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
