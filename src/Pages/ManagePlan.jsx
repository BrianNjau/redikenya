import React, { useEffect } from "react";
import UserDashLayout from "../Components/UserDashLayout";
import { Card } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SubscribeCard from "../Components/SubscribeCard";
import { useSupabaseAuth, useUserWallet } from "../Context/Context";
import ManageSub from "../Components/ManageSub";
import RenewCard from "../Components/RenewCard";

const ManagePlan = () => {
  const session = useSupabaseAuth();
  const { subscriptionWallet } = useUserWallet();

  const navigate = useNavigate();

  useEffect(() => {
    //protect path
    if (!session) {
      navigate("/login");
    }
  }, [session]);

  return (
    <UserDashLayout>
      <div className=" text-left">
        {/* Manage Your PDI Plan with{" "} */}
        <span className="text-[18px] ml-8  -tracking-[0.1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          Manage Your Subscription
        </span>{" "}
        <br />
        <hr className="mt-16 h-0.5 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
        <span className="text-[11px] ml-8   text-gray-700">
          Save upto 6% on tokens by subscribing to the PDI monthly standard
          plan. Tokens will renew after 1 month.
        </span>{" "}
        <div className="flex mt-12 justify-start">
          <div className="w-[30%]">
            {subscriptionWallet ? (
              subscriptionWallet?.status === "Not Renewing" ||
              subscriptionWallet?.status === "Disabled" ||
              subscriptionWallet?.status === "expired" ? (
                // renew card

                <RenewCard />
              ) : (
                <ManageSub />
              )
            ) : (
              <SubscribeCard />
            )}
            {/* {subscription ? <ManageSub /> : <SubscribeCard />} */}
          </div>

          <div className="w-[20%] ml-16 ">
            <Card bordered={true} className="mb-6">
              <div className="flex justify-start">
                {/* <img
                src={CreditCard}
                alt="Safe checkout"
                className="object-contain h-14"
              /> */}
                {/* <i className="text-[12px] feather-info "></i> */}
                <span className="text-[11px] ml-4 text-slate-500 hover:text-slate-900">
                  Subscription token balance{" "}
                  {/* <i className="text-[12px] feather-arrow-right "></i> */}
                </span>
              </div>
              <span className="text-[14px] ml-4  text-slate-800 hover:text-slate-900">
                {subscriptionWallet ? subscriptionWallet.tokens : 0}{" "}
                {/* <i className="text-[12px] feather-arrow-right "></i> */}
              </span>
            </Card>

            <Card bordered={true} className="mb-6">
              <div className="flex justify-start">
                {/* <img
                src={CreditCard}
                alt="Safe checkout"
                className="object-contain h-14"
              /> */}
                {/* <i className="text-[12px] feather-info "></i> */}
                <span className="text-[11px] ml-4 text-slate-500 hover:text-slate-900">
                  Token expiry date{" "}
                  {/* <i className="text-[12px] feather-arrow-right "></i> */}
                </span>
              </div>
              <span className="text-[14px] ml-4  text-slate-800 hover:text-slate-900">
                {subscriptionWallet
                  ? subscriptionWallet.expires_at.split("T")[0]
                  : "Not Subscribed"}{" "}
                {/* <i className="text-[12px] feather-arrow-right "></i> */}
              </span>
            </Card>

            <Link to="/purchase-token">
              <Card bordered={true} className="mb-6">
                <div className="flex justify-start">
                  {/* <img
                src={CreditCard}
                alt="Safe checkout"
                className="object-contain h-14"
              /> */}
                  {/* <i className="text-[12px] feather-info "></i> */}
                  <span className="text-[11px] ml-4 text-slate-500 hover:text-slate-900">
                    Get more tokens{" "}
                    <i className="text-[12px] feather-arrow-right "></i>
                  </span>
                </div>
              </Card>
            </Link>

            {/* <Card bordered={true}>
            <span className="text-[14px] ">
              We Accept Mobile Money International Card Payment{" "}
            </span>
            <img src={SafeCheckI} alt="Safe checkout" className="mt-8 h-24" />
          </Card> */}
          </div>
        </div>
      </div>
    </UserDashLayout>
  );
};

export default ManagePlan;
