import { Card } from "antd";
import React from "react";
import Buttons from "./Buttons";
import { useSupabaseAuth } from "../Context/Context";
import { PaystackButton } from "react-paystack";
import { Supabase } from "../Functions/SupabaseClient";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  `http://127.0.0.1:54321`,
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`
);
const SubscribeCard = () => {
  const public_key = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const std_plan = process.env.REACT_APP_PAYSTACK_STANDARD_SUBSCRIPTION_PLAN;
  const session = useSupabaseAuth();
  const tokenPrice = 1500;
  const test_key = "pk_test_73cc2a30972587c0712d51cc7ea5aace2704aff2";

  const handleSub = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("hello-world", {
        body: { name: "Functions" },
      });
      console.log(data);
    } catch (error) {}
  };

  // you can call this function anything
  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    console.log("onSuccess done here =>", reference);
    // try {
    // if (reference["status"] === "success") {
    //   //
    //   const { data, error } = await Supabase.from(
    //     "user_subscriptions"
    //   ).insert([
    //     {
    //       user_id: session.user.id,
    //       token_amount: 10,
    //       period: "monthly",
    //       transaction_id: reference["reference"],
    //     },
    //   ]);

    //   console.log("Data from Supabase Subscription", data);

    //   if (error) {
    //     console.log("Error subscribing user:", error.message);
    //   }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // you can call this function anything
  const handleOnClose = (ref) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed", ref);
  };

  const paystackProps = {
    email: session.user.email,
    amount: tokenPrice * 100,
    currency: "KES",
    metadata: {
      name: session.user.user_metadata.fullName,
      phone: session.user.phone,
      user_id: session.user.id,
      token_amount: 15,
    },
    plan: std_plan,
    publicKey: test_key,
    text: (
      <Buttons
        className={
          "w-[100%] mt-3 bg-[#3EB489] btn-fill btn-fancy font-medium font-sans"
        }
        themeColor="#3EB489"
        color="#fff"
        title={"SUBSCRIBE"}
        size={"md"}
      />
    ),
    label: "Monthly Standard Plan",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),

    onClose: () => handleOnClose(),
  };

  return (
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
        <span className="text-[12px] text-slate-300 ml-2">Monthly rolling</span>
        <span className="text-[14px] text-white ml-2"> 15 Tokens </span>
      </div>
      <div className="flex justify-between">
        <PaystackButton className="w-full" {...paystackProps} />
        {/* <Buttons
          onClick={handleSub}
          className={" ml-4 mt-3 font-base font-sans "}
          themeColor="#fff"
          color="#fff"
          title={<i className="text-[12px]  feather-settings"></i>}
          size={"lg"}
        /> */}
      </div>
    </Card>
  );
};

export default SubscribeCard;
