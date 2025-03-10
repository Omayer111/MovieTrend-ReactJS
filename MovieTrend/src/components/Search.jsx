import React from "react";
import { useState } from "react";

const Search = ({ search, setSearch }) => {
  // const [localSearch, setLocalSearch] = useState("");
  return (
    <>
      <div className="search">
        <div>
          <img src="../../public/search.svg" alt="Search Icon" />
          <input
            type="text"
            placeholder="Search for a movie"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
