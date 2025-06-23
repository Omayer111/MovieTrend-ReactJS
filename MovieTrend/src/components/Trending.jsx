import React from "react";

const Trending = ({ trending }) => {
  if (!trending || trending.length === 0) {
    return <p className="header">No trending movies found.</p>;
  }

  return (
    <div className="trending">
      <h2 className="text-3xl font-bold mb-6 text-white">Most Searched</h2>
      <ul>
        {trending.map((movie, index) => (
          <li key={movie.movie_id} className="trending-card">
            <div className="relative">
              <img src={movie.poster_url} alt={movie.title} className="trending-img" />
              <span className={`absolute top-2 left-2 bg-gradient-to-r bg-gradient-to-r from-green-400 to-yellow-500 to-amber-900 to-teal-700 text-black text-lg font-bold px-3 py-1 rounded-full shadow`}>
                #{index + 1}
              </span>
            </div>
            <div className="mt-3 text-center">
              <p className="text-lg font-semibold text-white truncate">{movie.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;