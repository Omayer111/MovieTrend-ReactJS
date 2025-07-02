import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Auth/Home.jsx";
import Login from "./Auth/Login.jsx";
import Registration from "./Auth/Registration.jsx";
import Navbar from "./components/Navbar.jsx";
import UserPanel from "./Auth/UserPanel.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthProvider.jsx";
import { Navigate } from "react-router-dom";

const App = () => {
  // from custom hook useAuth, we can access the isAuthenticated state and the login and logout functions
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* replace is used to replace the current entry in the history stack with a new one, so that when the user clicks the back button, they won't go back to the login page. */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/user-panel" replace />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/user-panel" replace />
              ) : (
                <Registration />
              )
            }
          />
          {/* simple plain checking auth will also do */}
          <Route
            path="/user-panel"
            element={
              <ProtectedRoute>
                <UserPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
