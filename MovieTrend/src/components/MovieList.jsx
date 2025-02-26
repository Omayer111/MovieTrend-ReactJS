import React from "react";

const MovieList = ({ movieData }) => {
  if (!movieData || !movieData.results || movieData.results.length === 0) {
    return <p>No trending movies found.</p>;
  }
  return (
    <div className="all-movies">
      <h2>Popular</h2>
      <ul>
        {movieData.results.slice(10, 300).map((movie, index) => (
          <li key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <div className="content">
              <div className="rating">
                <img src="../public/star.svg" alt="star" />
                <p>{movie.vote_average.toFixed(2)}</p>
              </div>

              <p className="content lang">{movie.original_language}</p>
              <p className="content year">{movie.release_date.substr(0, 4)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
