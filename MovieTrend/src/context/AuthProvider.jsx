// creating context for authentication in a React application so that every child components get access to the auth information and also the functions to toggle the auth status

// createContext() = Creating a new radio station (95.5 FM)
// Provider = Radio tower broadcasting music
// useContext() = Your car radio tuned to 95.5 FM
// When the radio station (Provider) changes the song, all cars tuned in (useContext) hear the new song instantly!


import { createContext,useState,useContext } from 'react'

// creating contexts with two comp provider and consumer
const AuthContext = createContext();
// creating a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userEmail) => {
    setIsAuthenticated(true);
    setUser(userEmail);
    console.log(userEmail);
    
    

  }
  const logout = () => {
    setIsAuthenticated(false);
  }

  // this helps passing the status of auth and also the function to toggle auth status so that every component that uses this context can access it
  // and also the user information

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  )
}

