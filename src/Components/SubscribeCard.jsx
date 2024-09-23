import { Card } from "antd";
import React, { useContext } from "react";
import Buttons from "./Buttons";
import { NotificationContext, useSupabaseAuth } from "../Context/Context";
import { PaystackButton } from "react-paystack";
// import { Supabase } from "../Functions/SupabaseClient";
// import { createClient } from "@supabase/supabase-js";
import SuccessIcon from "../Assets/img/successIcon.png";
// import FailureIcon from "../Assets/img/failIcon.png";

// const supabase = createClient(
//   `http://127.0.0.1:54321`,
//   `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`
// );
const SubscribeCard = () => {
  const public_key = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const std_plan = process.env.REACT_APP_PAYSTACK_STANDARD_SUBSCRIPTION_PLAN;
  const hourlyplan = "PLN_nnca2e92pr76h7q";
  const session = useSupabaseAuth();
  const tokenPrice = 1500;
  const test_key = "pk_test_73cc2a30972587c0712d51cc7ea5aace2704aff2";
  const { openNotification } = useContext(NotificationContext);

  // you can call this function anything
  const handlePaystackSuccessAction = async () => {
    // Implementation for whatever you want to do with reference and after success call.
    //send user success response
    openNotification(
      "topRight",
      "Subscribed Successfully!",
      "Thank you for your purchase. We are crediting your account shortly",
      <img className="w-8" src={SuccessIcon} alt="success" />
    );
  };

  // you can call this function anything
  const handleOnClose = (ref) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed", ref);
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
    plan: hourlyplan,
    publicKey: test_key,
    text: (
      <Buttons
        className={
          "w-[100%] mt-3 bg-[#3EB489] btn-fill btn-fancy font-medium font-sans"
        }
        themeColor="#3EB489"
        color="#fff"
        title={"Subscribe"}
        size={"md"}
      />
    ),
    label: "Monthly Standard Plan",
    onSuccess: (reference) => handlePaystackSuccessAction(),

    onClose: () => handleOnClose(),
  };

  return (
    <>
      <Card className="bg-slate-800" bordered={true}>
        <span className="font-medium mb-8 text-slate-200 ml-4">
          Standard Plan
        </span>
        <div className="mt-12 mb-12 text-center ">
          {" "}
          <span className="text-[32px] text-white ml-2">
            {/* {loadingTokens ? "" : tokenCount} */}Ksh. 1,500
          </span>
          <span className="text-[11px] text-slate-300 ml-2">/ month</span>
        </div>
        <div className="flex justify-between  ">
          <span className="text-[12px] text-slate-300 ml-2">
            Monthly rolling
          </span>
          <span className="text-[14px] text-white ml-2"> 15 Tokens </span>
        </div>
        <div className="flex justify-between">
          <PaystackButton className="w-full" {...paystackProps} />
        </div>
      </Card>
    </>
  );
};

export default SubscribeCard;
