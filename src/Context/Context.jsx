import { createContext, useEffect, useState } from "react";

// set the defaults
export const GlobalContext = createContext({
  headerHeight: 0,
  setHeaderHeight: () => {},
  footerHeight: 0,
  setFooterHeight: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  customModal: {
    el: null,
    isOpen: false,
  },
  setCustomModal: () => {},
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for user data on component mount (page refresh)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null); //reset user upon logout
    //clear localstorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
