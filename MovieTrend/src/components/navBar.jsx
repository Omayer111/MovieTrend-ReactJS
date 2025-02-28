import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-100 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="text-white text-2xl font-bold text-gradient-header"
        >
          MovieTrend
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="/" className="text-light-100 hover:text-white transition">
              Home
            </a>
          </li>
          <li>
            <a
              href="/trending"
              className="text-light-100 hover:text-white transition"
            >
              Trending
            </a>
          </li>
          <li>
            <a
              href="/movies"
              className="text-light-100 hover:text-white transition"
            >
              Movies
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-light-100 hover:text-white transition"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-dark-100 absolute top-16 left-0 w-full px-5 py-4 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="space-y-4 text-center">
          <li>
            <a
              href="/"
              className="text-light-100 hover:text-white transition block"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/trending"
              className="text-light-100 hover:text-white transition block"
            >
              Trending
            </a>
          </li>
          <li>
            <a
              href="/movies"
              className="text-light-100 hover:text-white transition block"
            >
              Movies
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-light-100 hover:text-white transition block"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
