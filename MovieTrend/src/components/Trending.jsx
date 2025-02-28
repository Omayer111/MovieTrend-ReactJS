import React from "react";

const Trending = ({ trending }) => {
  console.log(trending);
  if (!trending || trending.length === 0) {
    return <p className="header">No trending movies found.</p>;
  }

  return (
    <div className="trending">
      <h2>Trending</h2>
      <ul>
        {trending.map((movie, index) => (
          <li key={movie.movie_id}>
            <p>{index + 1}</p>
            <img src={movie.poster_url} alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
