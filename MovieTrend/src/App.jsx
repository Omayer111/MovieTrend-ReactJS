import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Auth/Home";
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";
import Navbar from "./components/Navbar";
import UserPanel from "./Auth/UserPanel";
import ProtectedRoute from "./context/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";
import { Navigate } from "react-router-dom";

const App = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated
  );
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          
          <Route path="/login" element={isAuthenticated ? <Navigate to="/user-panel" replace /> : <Login />} />

          <Route path="/register" element={isAuthenticated ? <Navigate to="/user-panel" replace /> : <Registration />} />
          
          <Route path="/user-panel" element={<ProtectedRoute>
            <UserPanel />
          </ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
