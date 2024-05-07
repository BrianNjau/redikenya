import { createContext, useEffect, useState, useContext } from "react";
import { Supabase } from "../Functions/SupabaseClient";

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

const SupabaseSessionContext = createContext(null);
export const useSupabaseAuth = () => useContext(SupabaseSessionContext);

export const SupabaseAuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check local storage for user data on component mount (page refresh)
    const subscription = Supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });
  }, []);

  return (
    <SupabaseSessionContext.Provider value={session}>
      {children}
    </SupabaseSessionContext.Provider>
  );
};
