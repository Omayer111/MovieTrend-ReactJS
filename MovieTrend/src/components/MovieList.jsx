import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

import {AddToFavorites,getFavorites} from "../favorites/AddToFavorites";

const MovieList = ({ movieData }) => {
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated);

  const [starMovie, setStarMovie] = useState([]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites()), [favorites];});


  const [notification, setNotification] = useState(null);

  if (!movieData || !movieData.results || movieData.results.length === 0) {
    return <h2 className="wrapper">No movies found.</h2>;
  }

  const handleFavoriteClick = async (movie) => {
    if (!isAuthenticated) {
      setNotification({
        message: "Please sign in to add to favorites",
        type: "error",
      });

      // Remove notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } else {
      console.log(localStorage.getItem("user"),movie);
      await AddToFavorites({user:localStorage.getItem("user"),movie});

      // const favs = getFavorites();
      // setFavorites((prev)=>[...prev,favs.movie_id]);

      // change here
    }
  };

  return (
    <div className="all-movies">
      <h2>Popular</h2>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center z-50 ${
            notification.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {notification.message}
        </div>
      )}

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

              {
                starMovie.includes(movie.id) ? (
                  <img
                    className="h-7 w-6 ml-15 lg:ml-20 cursor-pointer"
                    src="../../public/star-filled.svg"
                    alt="star"
                  />
                ) : (
                  <img
                    className="h-7 w-6 ml-15 lg:ml-20 cursor-pointer"
                    src="../../public/star-empty.svg"
                    alt="star"
                    onClick={() => handleFavoriteClick(movie)}
                  />
                )
              }




             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
