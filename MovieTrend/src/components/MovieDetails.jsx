import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`,
  },
};

const MovieDetails = ({ movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true);
      try {
        let res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
          options
        );

        const data = await res.json();
        const trailer = data.results?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
        console.log("Trailer Key:", trailer ? trailer.key : "No trailer found");
      } catch (err) {
        setTrailerKey(null);
      }
      setLoading(false);
    };
    fetchTrailer();
  }, [movie.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm mt-20">
      <div className="relative bg-[#18122b] rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-8 flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-red-400 text-3xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Poster */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/No-poster.png"
            }
            alt={movie.title}
            className="w-48 h-72 rounded-xl object-cover shadow-lg mb-4"
          />
          <span className="bg-yellow-500 text-black text-sm font-semibold px-3 py-1 rounded-full shadow mb-2">
            {movie.original_language?.toUpperCase()}
          </span>
          <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {movie.release_date ? movie.release_date.substr(0, 4) : "N/A"}
          </span>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-lg font-semibold">
              <img src="/star.svg" alt="star" className="w-5 h-5 mr-1" />
              {Number(movie.vote_average).toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">
              {movie.vote_count} votes
            </span>
          </div>
          <p className="text-gray-200 mb-6 text-lg leading-relaxed">
            {movie.overview || "No overview available."}
          </p>

          {/* Trailer */}
          <div className="w-full aspect-video rounded-lg shadow-lg bg-black pb-5">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Loading trailer...
              </div>
            ) : trailerKey ? (
              <iframe
                title="Movie Trailer"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full "
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Trailer not available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
