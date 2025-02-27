import React from "react";

const Trending = ({ movieData }) => {
  if (!movieData || !movieData.results || movieData.results.length === 0) {
    return <p className="header">No trending movies found.</p>;
  }

  return (
    <div className="trending">
      <h2>Trending</h2>
      <ul>
        {movieData.results.slice(0, 10).map((movie, index) => (
          <li key={movie.id}>
            <p>{index + 1}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
