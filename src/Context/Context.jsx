import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { Supabase } from "../Functions/SupabaseClient";
import { InfoCircleTwoTone } from "@ant-design/icons";
import { notification } from "antd";

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
    Supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
        localStorage.clear();
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

// store token wallet information

const UserWalletContext = createContext(null);
export const useUserWallet = () => useContext(UserWalletContext);

export const UserWalletProvider = ({ children }) => {
  const [payGoWallet, setPayGoWallet] = useState(null);
  const [subscriptionWallet, setSubscriptionWallet] = useState(null);
  const session = useSupabaseAuth();

  useEffect(() => {
    const fetchWallet = async () => {
      if (session) {
        //check local storage
        const storedPayGoWallet = localStorage.getItem("payGoWallet");
        const storedSubscriptionWallet =
          localStorage.getItem("subscriptionWallet");

        if (storedPayGoWallet) {
          setPayGoWallet(JSON.parse(storedPayGoWallet));
        } else {
          //fetch subscription info from supabase
          const { data: tokenValue, error: tokenError } = await Supabase.from(
            "tokens"
          )
            .select("token_count")
            .eq("user_id", session?.user.id)
            .single();
          if (tokenValue) {
            setPayGoWallet(tokenValue.token_count);
            localStorage.setItem(
              "payGoWallet",
              JSON.stringify(tokenValue.token_count)
            );
          }

          if (tokenError) console.log("get token error => ", tokenError);
        }
        if (storedSubscriptionWallet) {
          setSubscriptionWallet(JSON.parse(storedSubscriptionWallet));
        } else {
          const { data: subscription, error: subscriptionError } =
            await Supabase.from("subscriptions")
              .select("*")
              .eq("user_id", session?.user.id)
              .single();
          if (subscription) {
            setSubscriptionWallet(subscription);
            localStorage.setItem(
              "subscriptionWallet",
              JSON.stringify(subscription)
            );
          }

          if (subscriptionError)
            console.log("get subscription err =>", subscriptionError);
        }
      }
    };
    fetchWallet();

    if (session) {
      // Subscribe to changes in the 'tokens' table
      const tokenSubscription = Supabase.channel("token-subscription-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tokens",
            filter: `user_id=eq.${session?.user.id}`,
          },
          (payload) => {
            const { new: newPayGoData } = payload;
            //change state
            setPayGoWallet(newPayGoData.token_count);
            //store in local storage
            localStorage.setItem(
              "payGoWallet",
              JSON.stringify(newPayGoData.token_count)
            );
            // console.log("Change received", payload);
          }
        )
        .on("error", (error) => {
          console.error("WebSocket error:", error);
        })
        .subscribe();

      // Subscribe to changes in the 'subscriptions' table
      const subscriptionSubscription = Supabase.channel(
        "subscription-supabase-channel"
      )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "subscriptions",
            filter: `user_id=eq.${session?.user.id}`,
          },
          (payload) => {
            const { new: newSubscriptionData } = payload;
            //change state
            setSubscriptionWallet(newSubscriptionData);
            //set in local storage
            localStorage.setItem(
              "subscriptionWallet",
              JSON.stringify(newSubscriptionData)
            );
            // console.log("Change received", payload);
          }
        )
        .on("error", (error) => {
          console.error("WebSocket network error:", error);
          alert(
            "Network seems to have an issue. Please log out and login once more"
          );
        })
        .subscribe();

      // Cleanup subscriptions when component unmounts
      return () => {
        Supabase.removeChannel(tokenSubscription);
        Supabase.removeChannel(subscriptionSubscription);
      };
    }
  }, [session]);

  // update paygo wallet after increase or decrease
  const updatePayGoWallet = async (newAmount) => {
    //update value in state
    setPayGoWallet(newAmount);

    //update local storage
    localStorage.setItem("payGoWallet", JSON.stringify(newAmount));
  };
  // update sub wallet after increase or decrease
  const updateSubscriptonWallet = async (newAmount) => {
    //update value in state
    setSubscriptionWallet(newAmount);

    //update local storage
    localStorage.setItem("subscriptionWallet", JSON.stringify(newAmount));
  };
  return (
    <UserWalletContext.Provider
      value={{
        payGoWallet,
        subscriptionWallet,
        updatePayGoWallet,
        updateSubscriptonWallet,
      }}
    >
      {children}
    </UserWalletContext.Provider>
  );
};

// Create context
export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  // Create a function to handle opening notifications
  const openNotification = (placement, message, description, icon) => {
    api.open({
      message: message || `Please Notice`,
      description: description || "",
      placement: placement || "topRight",
      icon: icon || <InfoCircleTwoTone />,
    });
  };
  // Example context value that could be used in notifications
  const contextValue = useMemo(
    () => ({
      openNotification,
    }),
    [api]
  );
  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
