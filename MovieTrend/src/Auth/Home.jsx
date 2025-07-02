import Search from "../components/Search";
import Trending from "../components/Trending";
import MovieList from "../components/MovieList";
import { updateSearchCount, getTrending } from "../appwrite/appwrite";
import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchpage, setSearchPage] = useState(1);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filters, setFilters] = useState({});

  const handleFilter = (criteria) => setFilters(criteria);

  // useDebounce is a custom hook that delays the execution of the function until after a specified delay (1000ms in this case) commonly used to prevent excessive API calls while the user is typing in the search input.

  const onHomeClick = () => {
    setSearch("");
    setPage(1); // Reset page to 1 when home is clicked
    setSearchPage(1); // Reset search page to 1 when home is clicked
  };

  useDebounce(() => setDebouncedSearch(search), 1000, [search]);

  const fetchTrending = async (search = "") => {
    try {
      if (search) {
        const endpoint = `${API_BASE_URL}/search/movie?query=${search}&page=${searchpage}&include_adult=false`;

        // fetch returns a promise which resolves to the response of the request, and we need to await it to get the actual data. same goes for response.json() which also returns a promise that resolves to the JSON data.

        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();
        setMovieData(data);
        setLoading(false);
        console.log(data);

        // If there are results, update the search count to know what movies are most searched by user in the database

        if (data.results.length > 0) {
          await updateSearchCount(search, data.results[0]);
        }
        return;
      }
      // If no search term is provided, fetch trending movies
      let endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}&include_adult=false`;

      if (filters.genre) endpoint += `&with_genres=${filters.genre}`;
      if (filters.year) endpoint += `&primary_release_year=${filters.year}`;
      if (filters.language)
        endpoint += `&with_original_language=${filters.language}`;
      if (filters.minRating)
        endpoint += `&vote_average.gte=${filters.minRating}`;

      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      setMovieData(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setError(`Error fetching movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchTrending(debouncedSearch); // Fetch movies based on the debounced search term
  }, [debouncedSearch, page, searchpage, filters]); // Fetch movies when the debounced search term changes

  useEffect(() => {
    const fetchTrendingData = async () => {
      const trendingData = await getTrending(); // Assuming this function returns a Promise from appwrite to know the trending movies
      setTrending(trendingData);
    };

    fetchTrendingData();
  }, []);

  return (
    <main>
      {/* wrapper class is used to center the content and apply padding */}
      <Navbar
        onHomeClick={onHomeClick} // Pass the onHomeClick function to the Navbar component
      />
      {/* for the navbar to reset the search state when the user clicks on the home button. */}
      <div className="wrapper">
        <header>
          <p className="mt-10 text-amber-50 text-4xl font-bold text-center">
            Find <span className="text-gradient">Movies</span> To Watch
          </p>
        </header>
        {/* passing the search state and setSearch function as props to the Search component not as copy of the state, so that the Search component can update the search state in the Home component. */}

        <Search search={search} setSearch={setSearch} setLoading={setLoading} />
        {search ? (
          loading ? (
            <Spinner />
          ) : (
            <>
              <MovieList movieData={movieData} />
              <Pagination page={searchpage} setPage={setSearchPage} />
            </>
          )
        ) : loading ? (
          <Spinner />
        ) : (
          <>
            <Trending trending={trending} />
            <Filter onFilter={handleFilter} />
            <MovieList movieData={movieData} />
            <Pagination page={page} setPage={setPage} />
          </>
        )}
      </div>
      <h2>{error}</h2>
    </main>
  );
};

export default Home;
