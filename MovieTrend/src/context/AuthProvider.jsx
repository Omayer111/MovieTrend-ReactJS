import React from 'react'
import { createContext,useState,useContext } from 'react'

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(  localStorage.getItem("isAuthenticated") === "true");

  const login = () => {setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  }
  const logout = () => {setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

