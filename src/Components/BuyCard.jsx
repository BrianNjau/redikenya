import { Card, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import { useSupabaseAuth } from "../Context/Context";
import { PaystackButton } from "react-paystack";
import { Supabase } from "../Functions/SupabaseClient";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const BuyCard = () => {
  const [tokenValue, setTokenValue] = useState(3);
  const [tokenPrice, setTokenPrice] = useState(160);
  const public_key = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const test_key = "pk_test_73cc2a30972587c0712d51cc7ea5aace2704aff2";
  const [tokenCount, setTokenCount] = useState(0);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const session = useSupabaseAuth();

  useEffect(() => {
    getTokenCount(session.user.id);
  }, [tokenCount, session.user.id]);

  const getTokenCount = async (userId) => {
    try {
      setLoadingTokens(true);
      const { data, error } = await Supabase.from("tokens")
        .select("token_count")
        .eq("user_id", userId)
        .single();
      if (error) console.error("Error fetching token count:", error.message);

      if (data) {
        setTokenCount(data.token_count);
      }

      setLoadingTokens(false);
    } catch (err) {
      console.log(err);
      setLoadingTokens(false);
    }
  };

  function handlePrice(val) {
    try {
      //onswipe
      setTokenValue(val);

      const tokenPrice = val * 160;
      setTokenPrice(tokenPrice);
    } catch (e) {
      console.log(e);
    }
  }
  // you can call this function anything
  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    try {
      if (reference["status"] === "success") {
        setTimeout(function () {
          getTokenCount(session.user.id);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
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
      token_amount: tokenValue,
    },
    publicKey: test_key,
    text: (
      <Buttons
        className={"ml-4 mt-2  font-medium font-sans "}
        themeColor="#fff"
        color="#fff"
        title={<i className="text-[18px] feather-arrow-right"></i>}
        size={"md"}
      />
    ),
    label: "PDI Marketplace Kenya",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),

    onClose: () => handleOnClose(),
  };

  return (
    <>
      <Card className="bg-slate-800 " bordered={true}>
        <span className="font-medium mb-4 text-slate-200 ml-4">
          Pay As You Go Balance
        </span>

        <div className="mt-8 mb-4 text-center ">
          {" "}
          <span className="text-[32px] text-white ml-2">
            {loadingTokens ? <Loading3QuartersOutlined spin /> : tokenCount}
          </span>
          <span className="text-[12px] text-slate-300 ml-2">TOKENS</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-[12px] text-slate-300 ml-2">
            {" "}
            Top up your account here{" "}
          </span>
          <span className="text-[15px] text-white ml-2"> Ksh.{tokenPrice}</span>
        </div>

        <div className="flex justify-between align-middle">
          <InputNumber
            min={1}
            onChange={handlePrice}
            defaultValue={tokenValue}
            value={tokenValue}
            placeholder="Input tokens here"
            className="mt-2 p-1 w-[75%] "
          />
          <PaystackButton {...paystackProps} />
        </div>
      </Card>
    </>
  );
};

export default BuyCard;
