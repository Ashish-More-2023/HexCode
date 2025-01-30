import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create the User Context
const UserContext = createContext();

// Custom hook to access user context
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap your app with user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5001/auth/login/success", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        console.error("Not authenticated", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
