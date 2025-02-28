import React from "react";
import Search from "./components/Search";
import Trending from "./components/Trending";
import MovieList from "./components/MovieList";
import { Client } from "appwrite";
import { updateSearchCount } from "../src/appwrite/appwrite";

import { useState, useEffect } from "react";
import { useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [movieData, setMovieData] = useState([]);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useDebounce(() => setDebouncedSearch(search), 1000, [search]);

  const fetchTrending = async (search = "") => {
    try {
      if (search) {
        const endpoint = `${API_BASE_URL}/search/movie?query=${search}`;
        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();
        setMovieData(data);
        console.log(data);
        if (data.results.length > 0) {
          await updateSearchCount(search, data.results[0]);
        }
        return;
      }

      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      setMovieData(data);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setError(`Error fetching movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchTrending(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="../public/hero-img.png" alt="Hero Logo" />
          <h1>
            Find <span className="text-gradient">Movies</span> To Watch
          </h1>
        </header>
        <Search search={search} setSearch={setSearch} />
        {search ? (
          <MovieList movieData={movieData} />
        ) : (
          <>
            <Trending movieData={movieData} />{" "}
            <MovieList movieData={movieData} />
          </>
        )}
      </div>
      <h2>{error}</h2>
    </main>
  );
};

export default App;
