import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";

const Navbar = ({ onHomeClick }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-100 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          onClick={() => {
            navigate("/");
            onHomeClick();
            setIsMenuOpen(false); // Close the menu when logo is clicked
            // Reset search when logo is clicked
          }}
          className="text-white text-2xl  font-bold text-gradient-header cursor-pointer  active:scale-95 hover:scale-105 transition-transform duration-300"
        >
          MovieTrend
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {isAuthenticated ? (
            <>
              <li className="border border-white rounded-full p-1 hover:bg-bottom transition duration-200 hover:scale-107 transition-transform duration-300">
                <FaUserAstronaut
                  className="text-white h-10 w-10 cursor-pointer "
                  onClick={() => {
                    navigate("/user-panel");
                    setIsMenuOpen(false); // Close the menu when user icon is clicked}}
                  }}
                />
              </li>
              <li
                className="text-white text-[20px] font-semibold cursor-pointer px-5 py-2 rounded transition 
             duration-200 hover:bg-gradient-to-r from-red-900  to-rose-900 hover:text-white focus:outline-none focus:ring-2 
             focus:ring-purple-800 focus:ring-offset-2 active:scale-95 border border-amber-100"
                onClick={() => {
                  logout();
                  navigate("/login");
                  setIsMenuOpen(false); // Close the menu when logout is clicked
                }} // Navigate to login page
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li
                className="text-white text-[20px] font-semibold cursor-pointer px-5 py-2 rounded transition 
             duration-200 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 
             focus:ring-purple-800 focus:ring-offset-2 active:scale-95 border border-amber-100"
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </li>
              <li
                className="text-white text-[20px] font-semibold cursor-pointer px-5 py-2 rounded transition 
             duration-200 hover:bg-purple-800 hover:text-white focus:outline-none focus:ring-2 
             focus:ring-purple-800 focus:ring-offset-2 active:scale-95 border border-amber-100"
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }}
              >
                Register
              </li>
            </>
          )}
        </ul>

        {/* hamburger menu button */}
        <button
          className="md:hidden text-white focus:outline-none cursor-pointer"
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

      {/* Mobile Menu conditional rendering based on the state value */}
      <div
        className={`md:hidden bg-dark-100 absolute top-16 left-0 w-full px-5 py-4 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="space-y-4 flex flex-col items-center">
          {isAuthenticated ? (
            <>
              <li>
                <FaUserAstronaut
                  className="text-white h-10 w-10 cursor-pointer"
                  onClick={() => {
                    navigate("/user-panel");
                    setIsMenuOpen(false);
                  }}
                />
              </li>
              <li
                className="text-white text-[20px] cursor-pointer mt-1.5"
                onClick={() => {
                  logout();
                  navigate("/login");
                  setIsMenuOpen(false);
                }} // Navigate to login page
                // Navigate to login page
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li
                className="text-white text-[20px] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }} // Navigate to login page
              >
                Sign In
              </li>
              <li
                className="text-white text-[20px] cursor-pointer"
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }} // Navigate to register page
              >
                Register
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
