import React from "react";
import Buttons from "./Buttons";
import { useSupabaseAuth } from "../Context/Context";
import { Card } from "antd";
import { PaystackButton } from "react-paystack";

const ExpiredSubCard = () => {
  const public_key = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const std_plan = process.env.REACT_APP_PAYSTACK_STANDARD_SUBSCRIPTION_PLAN;
  // const hourlyplan = "PLN_nnca2e92pr76h7q";
  const session = useSupabaseAuth();
  const tokenPrice = 999;
  // const test_key = "pk_test_73cc2a30972587c0712d51cc7ea5aace2704aff2";

  // you can call this function anything
  const handlePaystackSuccessAction = async () => {
    // Implementation for whatever you want to do with reference and after success call.
  };

  // you can call this function anything
  const handleOnClose = (ref) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
  };

  const paystackProps = {
    email: session.user.email,
    amount: tokenPrice * 100,
    firstname: session.user.user_metadata.fullName.split(" ")[0] || "",
    lastname: session.user.user_metadata.fullName.split(" ")[1] || "",
    currency: "KES",
    metadata: {
      customer: [
        {
          display_name: "Customer Name",
          variable_name: "customerName",
          value: session.user.user_metadata.fullName,
        },
        {
          display_name: "Customer Phone",
          variable_name: "customerPhone",
          value: session.user.phone,
        },
        {
          display_name: "User ID",
          variable_name: "userID",
          value: session.user.id,
        },
        {
          display_name: "Token Amount",
          variable_name: "tokenAmount",
          value: 15,
        },
      ],
    },
    plan: std_plan,
    publicKey: public_key,
    text: (
      <Buttons
        className={
          "w-[100%] mt-3 bg-white btn-fill btn-fancy font-medium font-sans"
        }
        themeColor="#000"
        color="#000"
        title={"Renew subscription"}
        size={"md"}
      />
    ),
    label: "Monthly Standard Plan",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),

    onClose: () => handleOnClose(),
  };

  return (
    <>
      <Card className="bg-[#45062e]" bordered={true}>
        <span className="font-medium mb-8 text-white ml-4">
          Your Plan Expired
        </span>
        <div className="mt-12 mb-12 text-center ">
          {" "}
          <span className="text-[32px] text-white ml-2">
            {/* {loadingTokens ? "" : tokenCount} */}Ksh. 999
          </span>
          <span className="text-[11px] text-slate-300 ml-2">/ month</span>
        </div>
        <div className="flex justify-between  ">
          <span className="text-[12px] text-slate-300 ml-2">Renew Now</span>
          <span className="text-[14px] text-white ml-2"> 15 Tokens </span>
        </div>
        <div className="flex justify-between">
          <PaystackButton className="w-full" {...paystackProps} />
        </div>
      </Card>
    </>
  );
};

export default ExpiredSubCard;
