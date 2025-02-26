import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div>
        <img src="../../public/search.svg" alt="Search Icon" />
        <input type="text" placeholder="Search for a movie" />
      </div>
    </div>
  );
};

export default Search;
