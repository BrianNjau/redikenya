import React, { Suspense, useEffect, useState, lazy } from "react";

// Libraries
import { Routes, Route, useLocation } from "react-router-dom";
import retina from "retinajs";
import { AnimatePresence } from "framer-motion";
import {
  GlobalContext,
  NotificationProvider,
  SupabaseAuthProvider,
  UserWalletProvider,
} from "./Context/Context";

//vercel page tracking and performance
import { inject } from "@vercel/analytics";

// import { SpeedInsights } from "@vercel/speed-insights/react";
//Import pages
const LandingPage = lazy(() => import("./Pages/Landingpage"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const Economics = lazy(() => import("./Pages/Economics"));
const Search = lazy(() => import("./Pages/Search"));
const SearchResults = lazy(() => import("./Pages/SearchResults"));
const Invest = lazy(() => import("./Pages/Invest"));
const Area = lazy(() => import("./Pages/Area"));
const YHAlgoPage = lazy(() => import("./Pages/YHAlgoPage"));
const LPAlgoPage = lazy(() => import("./Pages/LPAlgoPage.jsx"));
const GRMAlgoPage = lazy(() => import("./Pages/GRMAlgoPage.jsx"));
const VerifyMailPage = lazy(() => import("./Pages/VerifyMail.jsx"));
const Register = lazy(() => import("./Pages/Register.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Confirm = lazy(() => import("./Pages/Confirm.jsx"));
const UserDashboard = lazy(() => import("./Pages/UserDashboard.jsx"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword.jsx"));
const UpdatePassword = lazy(() => import("./Pages/UpdatePassword.jsx"));
const ManagePlan = lazy(() => import("./Pages/ManagePlan.jsx"));
const PurchaseToken = lazy(() => import("./Pages/PurchaseToken.jsx"));
const BillingHistory = lazy(() => import("./Pages/BillingHistory.jsx"));
const Profile = lazy(() => import("./Pages/Profile.jsx"));
const Account = lazy(() => import("./Pages/Account.jsx"));
const Support = lazy(() => import("./Pages/Support.jsx"));
const Privacy = lazy(() => import("./Pages/Privacy.jsx"));
const Terms = lazy(() => import("./Pages/TC.jsx"));
const Disclaimer = lazy(() => import("./Pages/Disclaimer.jsx"));
const Faq = lazy(() => import("./Pages/Faq.jsx"));

function App() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openNotification = () => {
  //   api.open({
  //     key,
  //     message: 'Notification Title',
  //     description: 'description.',
  //   });
  // }
  const [customModal, setCustomModal] = useState({
    el: null,
    isOpen: false,
  });
  const location = useLocation();

  // RetinaJS
  useEffect(() => {
    window.addEventListener("load", retina(document.querySelectorAll("img")));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      import("./Functions/Utilities").then((module) => {
        module.SetHeaderMenuPos();
        module.setDocumentFullHeight();
      });
    }, 1000);
  }, [location]);

  useEffect(() => {
    if (isModalOpen === true) {
      document.querySelector("body").classList.add("overflow-hidden");
    } else {
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  // Get the current location and set the window to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    setFooterHeight(0);
    setCustomModal({
      ...customModal,
      el: null,
      isOpen: false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  inject();

  return (
    <SupabaseAuthProvider>
      {/* <SpeedInsights /> */}
      <NotificationProvider>
        <GlobalContext.Provider
          value={{
            headerHeight,
            setHeaderHeight,
            footerHeight,
            setFooterHeight,
            isModalOpen,
            setIsModalOpen,
            customModal,
            setCustomModal,
          }}
        >
          <UserWalletProvider>
            <div
              className="App"
              style={{ "--header-height": `${headerHeight}px` }}
            >
              {
                <main
                  style={{
                    marginTop: headerHeight,
                    marginBottom: footerHeight,
                  }}
                >
                  <AnimatePresence exitBeforeEnter>
                    <Suspense fallback={<></>}>
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <LandingPage
                              style={{ "--base-color": "#e6994e" }}
                            />
                          }
                        />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/economics" element={<Economics />} />
                        <Route path="/search" element={<Search />} />
                        <Route
                          path="/search-results"
                          element={<SearchResults />}
                        />
                        <Route path="/invest" element={<Invest />} />
                        <Route path="/area-data" element={<Area />} />
                        <Route
                          path="/yield-pdi-insights"
                          element={<YHAlgoPage />}
                        />
                        <Route
                          path="/price-sqm-pdi-insights"
                          element={<LPAlgoPage />}
                        />
                        <Route
                          path="/grm-pdi-insights"
                          element={<GRMAlgoPage />}
                        />
                        <Route
                          path="/verify-mail"
                          element={<VerifyMailPage />}
                        />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/confirm" element={<Confirm />} />
                        <Route
                          path="/user-dashboard"
                          element={<UserDashboard />}
                        />
                        <Route path="/reset" element={<ResetPassword />} />
                        <Route
                          path="/update-password"
                          element={<UpdatePassword />}
                        />
                        <Route path="/manage-plan" element={<ManagePlan />} />
                        <Route
                          path="/purchase-token"
                          element={<PurchaseToken />}
                        />
                        <Route path="/billing" element={<BillingHistory />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/privacy-policy" element={<Privacy />} />
                        <Route path="/terms-conditions" element={<Terms />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                        <Route path="/faq" element={<Faq />} />
                      </Routes>
                    </Suspense>
                  </AnimatePresence>
                </main>
              }
            </div>
          </UserWalletProvider>
        </GlobalContext.Provider>
      </NotificationProvider>
    </SupabaseAuthProvider>
  );
}

export default App;
