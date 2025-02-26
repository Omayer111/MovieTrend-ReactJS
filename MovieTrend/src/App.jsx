import React from "react";
import Search from "./components/Search";
import Trending from "./components/Trending";

const App = () => {
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="../public/hero-img.png" alt="Hero Logo" />
          <h1>
            Find <span className="text-gradient">Movies</span> That Are Trending
          </h1>
        </header>
        <Search />

        <Trending />
      </div>
    </main>
  );
};

export default App;
