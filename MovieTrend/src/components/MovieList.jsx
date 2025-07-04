import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import {
  AddToFavorites,
  getFavorites,
  RemoveFromFavorites,
} from "../favorites/AddToFavorites";
import MovieDetails from "./MovieDetails";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`,
  },
};

const MovieList = ({ movieData }) => {
  const { isAuthenticated, user } = useAuth();
  const [starMovie, setStarMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated) {
        const favs = await getFavorites({ user });
        const favoriteMovieIds = favs.map((movie) => movie.movie_id); // Extracting only the movie IDs
        setStarMovie(favoriteMovieIds);
      } else {
        setStarMovie([]); // Reset if user logs out
      }
    };

    fetchFavorites();
  }, [user, isAuthenticated]); // ✅ Re-fetch when user changes

  const [notification, setNotification] = useState(null);

  if (!movieData || !movieData.results || movieData.results.length === 0) {
    return <h2 className="wrapper">No movies found.</h2>;
  }

  const handleFavoriteClick = async (movie, giveStar) => {
    if (!isAuthenticated) {
      setNotification({
        message: "Please sign in to add to favorites",
        type: "error",
      });

      // Remove notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);

      return;
    }

    if (giveStar) {
      await AddToFavorites({ user, movie });
      setStarMovie((prev) => [...prev, movie.id]);
    } else {
      // Remove from favorites logic
      // console.log("Removing from favorites", movie);
      await RemoveFromFavorites({ user, movie });
      setStarMovie((prev) => prev.filter((id) => id !== movie.id));

      // change here
    }
  };

  return (
    <>
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
          {movieData.results
            .slice(0, 300)
            .filter((movie) => !movie.adult)
            .map((movie, index) => (
              <li
                key={movie.id}
                className="movie-card hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedMovie(movie)} // 🖱️ Open details on click
              >
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
                    <img src="../../public/star.svg" alt="star" />
                    <p>{movie.vote_average.toFixed(1)}</p>
                  </div>

                  <p className="content lang">{movie.original_language}</p>
                  <p className="content year">
                    {movie.release_date
                      ? movie.release_date.substr(0, 4)
                      : "Not available"}
                  </p>

                  <div
                    className="w-full flex items-center justify-center  mt-2"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (starMovie.includes(movie.id)) {
                        await handleFavoriteClick(movie, false);
                      } else {
                        await handleFavoriteClick(movie, true);
                      }
                    }}
                  >
                    <div className="h-6 w-6 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                      <img
                        className="h-4 w-4"
                        src={
                          starMovie.includes(movie.id)
                            ? "../../public/star-filled.svg"
                            : "../../star-empty.svg"
                        }
                        alt="star"
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* <button
        className={
          "fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        }
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        top
      </button> */}
    </>
  );
};

export default MovieList;
