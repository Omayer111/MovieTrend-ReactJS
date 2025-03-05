import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";

import {useAuth} from '../context/AuthProvider';


const Navbar = () => {
  const {isAuthenticated,logout} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedin, setIsSignedin] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-100 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          onClick={() => navigate("/")}
          className="text-white text-2xl  font-bold text-gradient-header cursor-pointer"
        >
          MovieTrend
        </a>

        {/* Desktop Navigation */}
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">

          {isAuthenticated ? (
            <>
            <li><FaUserAstronaut className="text-white h-10 w-10 cursor-pointer" onClick={() => navigate("/user-panel")} /></li>
           <li
           className="text-white text-[20px] cursor-pointer mt-1.5"
           onClick={()=>{logout();
            navigate("/login");
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
                onClick={() => navigate("/login")} // Navigate to login page
              >
                Sign In
              </li>
              <li
                className="text-white text-[20px] cursor-pointer"
                onClick={() => navigate("/register")} // Navigate to register page
              >
                Register
              </li>
            </>
          )}
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
        <ul className="space-y-4 flex flex-col items-center">
        {isAuthenticated ? (
            <>
            <li><FaUserAstronaut className="text-white h-10 w-10 cursor-pointer" onClick={() => navigate("/user-panel")} /></li>
           <li
           className="text-white text-[20px] cursor-pointer mt-1.5"
           onClick={()=>{logout();
            navigate("/login");
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
                onClick={() => navigate("/login")} // Navigate to login page
              >
                Sign In
              </li>
              <li
                className="text-white text-[20px] cursor-pointer"
                onClick={() => navigate("/register")} // Navigate to register page
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
