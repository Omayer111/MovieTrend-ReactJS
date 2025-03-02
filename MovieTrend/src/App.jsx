import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Auth/Home";
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";
import Navbar from "./components/Navbar";
import UserPanel from "./Auth/UserPanel";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/user-panel" element={<UserPanel />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
