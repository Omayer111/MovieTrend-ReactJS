import React from 'react'
import { createContext,useState,useContext } from 'react'

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(  localStorage.getItem("isAuthenticated") === "true");
  const [user, setUser] = useState(null);

  const login = (userEmail) => {setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setUser(userEmail);
    localStorage.setItem('user', userEmail);
    console.log(userEmail);

  }
  const logout = () => {setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  )
}

