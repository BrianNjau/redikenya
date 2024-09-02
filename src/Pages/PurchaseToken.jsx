import React from "react";
import UserDashLayout from "../Components/UserDashLayout";
import { Card } from "antd";
// import PurchaseCard from "../Components/PurchaseCard";

import BuyCard from "../Components/BuyCard";
import { Link } from "react-router-dom";
const PurchaseToken = () => {
  return (
    <UserDashLayout>
      <div className="text-left">
        {/* Manage Your PDI Plan with{" "} */}
        <span className="text-[18px] ml-8  -tracking-[0.1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          Credit Your Account Conviniently
        </span>{" "}
        <hr className="mt-16 h-0.5 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
        <span className="text-[11px] ml-8   text-gray-700">
          Pay as you go. When your tokens reach 0, you will no longer be able to
          run searches.
        </span>{" "}
        <div className="flex mt-12 justify-start">
          <div className="w-[30%]">
            {/* <PurchaseCard /> */}
            <BuyCard />
          </div>

          <div className="w-[20%] ml-16 ">
            <Link to="/">
              <Card bordered={true} className="mb-6">
                <div className="flex justify-start">
                  {/* <img
                  src={CreditCard}
                  alt="Safe checkout"
                  className="object-contain h-14"
                /> */}
                  <i className="text-[12px] feather-info "></i>
                  <span className="text-[11px] ml-4 text-slate-500 hover:text-slate-900">
                    Learn more about our pricing{" "}
                    <i className="text-[12px] feather-arrow-right "></i>
                  </span>
                </div>
              </Card>
            </Link>
            <Link to="/">
              <Card bordered={true} className="mb-6">
                <div className="flex justify-start">
                  {/* <img
                  src={CreditCard}
                  alt="Safe checkout"
                  className="object-contain h-14"
                /> */}
                  <i className="text-[12px] feather-info "></i>
                  <span className="text-[11px] ml-4 text-slate-500 hover:text-slate-900">
                    View billing history{" "}
                    <i className="text-[12px] feather-arrow-right "></i>
                  </span>
                </div>
              </Card>
            </Link>
            <Link to="/">
              <Card bordered={true} className="mb-6">
                <div className="flex justify-start">
                  {/* <img
                  src={CreditCard}
                  alt="Safe checkout"
                  className="object-contain h-14"
                /> */}
                  <i className="text-[12px] feather-info "></i>
                  <span className="text-[11px] ml-4 text-slate-500 hover:text-slate-900">
                    Experiencing challenges ?{" "}
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

export default PurchaseToken;
