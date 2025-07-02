import React, { useState } from "react";

const genresList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  // ...add more as needed
];

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  // ...add more as needed
];

const years = Array.from({ length: 2025 - 1970 }, (_, i) => 2024 - i);

const Filter = ({ onFilter, load }) => {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [minRating, setMinRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({
      genre,
      year,
      language,
      minRating,
    });
  };

  const handleReset = () => {
    setGenre("");
    setYear("");
    setLanguage("");
    setMinRating("");
    onFilter({});
    load(true); // Reset loading state to true
  };

  return (
    <form
      className="flex flex-wrap justify-between gap-4 items-end bg-[#18122b] p-4 rounded-xl shadow mt-10 mb-10"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-white mb-1">Genre</label>
        <select
          className="px-3 py-2 rounded bg-[#221a38] text-white"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All</option>
          {genresList.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-white mb-1">Year</label>
        <select
          className="px-3 py-2 rounded bg-[#221a38] text-white"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">All</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-white mb-1">Language</label>
        <select
          className="px-3 py-2 rounded bg-[#221a38] text-white"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">All</option>
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-white mb-1">Min Rating</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          className="px-3 py-2 rounded bg-[#221a38] text-white w-20"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
      </div>
      <div className="flex pr-10 gap-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Apply
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Filter;
