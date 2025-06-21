import React, { useEffect, useState } from "react";
import { getFavorites, removeFromFavorites } from "../favorites/AddToFavorites";
import Spinner from "../components/Spinner";

const UserPanel = () => {
  console.log("UserPanel");

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      const favs = await getFavorites();
      setFavorites(favs); // Store favorite movies in state
      setLoading(false);
      console.log(favs);
    };

    fetchFavorites();
  }, []);

  // Handle remove favorite
  const handleRemoveFavorite = async (movieId) => {
    await removeFromFavorites(movieId);
    setFavorites((prev) => prev.filter((movie) => movie.movie_id !== movieId)); // Update UI
  };

  return (
    <div className="wrapper">
      <div className="all-movies">
        <h2 className="text-white mt-20 text-center">Your Favorites</h2>

        {loading ? (
          <Spinner />
        ) : favorites.length === 0 ? (
          <p className="text-white text-center">No favorite movies found.</p>
        ) : (
          <ul>
            {favorites.map((movie) => (
              <li key={movie.movie_id} className="movie-card">
                <img
                  src={
                    movie.movie[0]
                      ? movie.movie[0]
                      : "../../public/No-poster.png"
                  }
                  alt={movie.movie[1]}
                />
                <h3>{movie.movie[1]}</h3>
                <div className="content">
                  <div className="rating">
                    <img src="../public/star.svg" alt="star" />
                    <p>{movie.movie[2]}</p>
                  </div>

                  <p className="content lang">{movie.movie[3]}</p>
                  <p className="content year">{movie.movie[4]}</p>

                  {/* Remove from Favorites Button */}
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2 cursor-pointer "
                    onClick={() => handleRemoveFavorite(movie.movie_id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
