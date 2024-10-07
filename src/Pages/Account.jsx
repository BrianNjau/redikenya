import React, { useContext, useEffect, useState } from "react";
import UserDashLayout from "../Components/UserDashLayout";
import {
  NotificationContext,
  useSupabaseAuth,
  useUserWallet,
} from "../Context/Context";
import { Card, Modal, Spin } from "antd";
import { InfoCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import Buttons from "../Components/Buttons";
import { Supabase } from "../Functions/SupabaseClient";
import FailureIcon from "../Assets/img/failIcon.png";
import SuccessIcon from "../Assets/img/successIcon.png";
import { Link, useNavigate } from "react-router-dom";
import CautionImage from "../Assets/img/cautionBack.svg";
import { createClient } from "@supabase/supabase-js";

const Account = () => {
  const session = useSupabaseAuth();
  //   console.log("user", session);
  const { openNotification } = useContext(NotificationContext);
  const [loadingSignOut, setLoadingSignOut] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [loadingDeleteAccount, setLoadingDeleteAccount] = useState(false);

  //TEST PROXY
  //   const supabase = createClient(
  //     `https://gnohvxtipsxjqtgjazcb.supabase.co`,
  //     `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdub2h2eHRpcHN4anF0Z2phemNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxODY4MDQsImV4cCI6MjA0Mjc2MjgwNH0.Ux0bBQn1lpwG7E2LnqFUc6Uh-iWGvY67p3C_F88wamU`
  //   );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { subscriptionWallet } = useUserWallet();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, []);

  const handleSignOutDevices = async () => {
    try {
      setLoadingSignOut(true);
      const { data: signOutData, error: signOutError } =
        await Supabase.auth.signOut({ scope: "others" });
      if (signOutError) {
        console.log(signOutError);
        openNotification(
          "topRight",
          signOutError.code,
          signOutError.message,
          <img className="w-8" src={FailureIcon} alt="fail" />
        );
      }
      //   console.log(signOutData);
      if (!signOutError) {
        //   console.log(signOutData);
        openNotification(
          "topRight",
          "Sign Out Devices Success",
          "You have successfully signed out all other devices signed in",
          <img className="w-8" src={SuccessIcon} alt="success" />
        );
      }
      setLoadingSignOut(false);
    } catch (error) {
      console.log(error);
      setLoadingSignOut(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      setLoadingResetPassword(true);
      const { data: resetData, error: errorReset } =
        await Supabase.auth.resetPasswordForEmail(session.user.email);
      if (errorReset) {
        openNotification(
          "topRight",
          errorReset.code,
          errorReset.message,
          <img className="w-8" src={FailureIcon} alt="fail" />
        );
      }
      if (!errorReset) {
        openNotification(
          "topRight",
          "Reset Password Success",
          "Reset password link has been sent to your email account",
          <img className="w-8" src={SuccessIcon} alt="success" />
        );
      }
      setLoadingResetPassword(false);
    } catch (error) {
      console.log(error);
      setLoadingResetPassword(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setLoadingDeleteAccount(true);

      //check if active subscription exists
      const subStatus = subscriptionWallet?.status;

      if (subStatus === "active") {
        openNotification(
          "topRight",
          "Delete account failed",
          "Please cancel your active subscription first to delete account",
          <img className="w-8" src={FailureIcon} alt="fail" />
        );
        setIsModalOpen(false);
      } else {
        //Call edge function
        setIsModalOpen(false);
        const { data, error } = await Supabase.functions.invoke(
          "admin-functions",
          {
            body: {
              userId: session.user.id,
            },
          }
        );

        // After deletion, sign out the user from the frontend
        await Supabase.auth.signOut();

        if (!error) {
          openNotification(
            "topRight",
            "Account Deleted",
            "Your account has been deleted",
            <img className="w-8" src={SuccessIcon} alt="success" />
          );
        }
        if (error) {
          console.log(error);
          openNotification(
            "topRight",
            error.code,
            error.message,
            <img className="w-8" src={FailureIcon} alt="fail" />
          );
        }
      }
      setLoadingDeleteAccount(false);
    } catch (error) {
      console.log(error);
      setLoadingDeleteAccount(false);
    }
  };

  //   const handleProxyInvocation = async () => {
  //     try {
  //       const { data, error } = await supabase.functions.invoke("appcube-proxy", {
  //         body: null,
  //       });
  //       console.log("response from appcube proxy=>", data);
  //       console.log("error response from appcube proxy=>", error);
  //     } catch (error) {
  //       console.log("err ", error);
  //     }
  //   };

  //   console.log(subscriptionWallet);

  return (
    <UserDashLayout>
      <div className=" text-left">
        <span className="text-[18px] ml-8  -tracking-[0.1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          Account Status
        </span>{" "}
        <br />
        <hr className="mt-16 h-0.5 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
        <div className="ml-8 ">
          <span className="text-[11px] text-gray-700">
            Manage your account and account settings here
          </span>{" "}
          <Card className=" mt-4  w-[38%] bg-gray-100">
            <div className="flex justify-between">
              <InfoCircleTwoTone className="mb-4 ml-2" />
              <div>
                <span className=" text-[14px] font-semibold">
                  Having issues with your account?
                </span>
                <br />
                <span className="text-[14px] ">
                  Get easy access to support through here
                </span>
              </div>

              <Buttons
                className={
                  "mt-2 h-10 bg-white btn-fill btn-fancy font-medium font-sans"
                }
                themeColor="#000"
                color="#000"
                title="Support"
                size={"sm"}
                to={"/support"}
              />
            </div>
          </Card>
          <div className="mt-8">
            <p>
              Sign Out Devices
              <br />
              <span className="text-[12px]  text-gray-500">
                This will sign out all other devices using your account
              </span>
            </p>

            <Buttons
              className={"mt-2 h-10  btn-fill btn-fancy font-medium font-sans"}
              themeColor="#000"
              color="#fff"
              title={
                loadingSignOut ? (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 18, color: "black" }}
                        spin
                      />
                    }
                  />
                ) : (
                  "Sign Out"
                )
              }
              size={"sm"}
              onClick={handleSignOutDevices}
            />
          </div>
          <div className="mt-8">
            <p>
              Reset Account Password
              <br />
              <span className="text-[12px]  text-gray-500">
                We will send an email to you with instructions on how to reset
                your password
              </span>
            </p>

            <Buttons
              className={"mt-2 h-10  btn-fill btn-fancy font-medium font-sans"}
              themeColor="#000"
              color="#fff"
              title={
                loadingResetPassword ? (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 18, color: "black" }}
                        spin
                      />
                    }
                  />
                ) : (
                  "Reset Password"
                )
              }
              onClick={handlePasswordReset}
              size={"sm"}
            />
          </div>
          <div className="mt-8">
            <p>
              Delete Your Account
              <br />
              <span className="text-[12px]  text-gray-500">
                This will delete all data associated with your account
                irretrievably
              </span>
            </p>

            <Buttons
              className={"mt-2 h-10  btn-fill btn-fancy font-medium font-sans"}
              themeColor="#8c271e"
              color="#fff"
              title={
                loadingDeleteAccount ? (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 18, color: "black" }}
                        spin
                      />
                    }
                  />
                ) : (
                  "Delete Account"
                )
              }
              size={"sm"}
              onClick={showModal}
            />
            <Modal
              title={
                <img
                  className="h-48 ml-auto mr-auto"
                  src={CautionImage}
                  alt="Caution, you are deleting your account"
                />
              }
              open={isModalOpen}
              onOk={handleDeleteUser}
              onCancel={handleCancel}
              okText="Delete Account"
              okType="danger"
              cancelText="Cancel"
            >
              <div>
                <br />
                <div className="text-center mb-4">
                  <p className="text-base font-semibold">
                    Caution you are about to delete your account!
                  </p>

                  <p className="text-sm font-light">
                    You will lose access to your account and any active tokens
                    or subscriptions
                  </p>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </UserDashLayout>
  );
};

export default Account;
