import { Card, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import { useSupabaseAuth, useUserWallet } from "../Context/Context";
import { PaystackButton } from "react-paystack";
import { Supabase } from "../Functions/SupabaseClient";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const BuyCard = () => {
  const [tokenValue, setTokenValue] = useState(1);
  const [tokenPrice, setTokenPrice] = useState(160);
  const public_key = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const test_key = "pk_test_73cc2a30972587c0712d51cc7ea5aace2704aff2";

  const session = useSupabaseAuth();
  const { payGoWallet, updatePayGoWallet } = useUserWallet();

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
  // console.log("paygo=>", payGoWallet);
  // you can call this function anything
  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    try {
      if (reference["status"] === "success") {
        // setTimeout(function () {
        //   // update the state and local storage
        //   // const newPayGoBalance = tokenValue + payGoWallet.token_count;
        //   // updatePayGoWallet(newPayGoBalance);
        // }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // you can call this function anything
  const handleOnClose = (ref) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log("closed", ref);
  };

  const paystackProps = {
    email: session?.user.email,
    amount: tokenPrice * 100,
    currency: "KES",
    metadata: {
      customer: [
        {
          display_name: "Customer Name",
          variable_name: "customerName",
          value: session?.user.user_metadata.fullName,
        },
        {
          display_name: "Customer Phone",
          variable_name: "customerPhone",
          value: session?.user.phone,
        },
        {
          display_name: "User ID",
          variable_name: "userID",
          value: session?.user.id,
        },
        {
          display_name: "Token Amount",
          variable_name: "tokenAmount",
          value: tokenValue,
        },
      ],
    },
    publicKey: test_key,
    text: (
      <Buttons
        className={"ml-4 mt-2  btn-fancy font-medium font-sans "}
        themeColor="#fff"
        color="#fff"
        title={"Buy"}
        size={"sm"}
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

        <div className="mt-12 mb-12 text-center ">
          {" "}
          <span className="text-[32px] text-white ml-2">{payGoWallet}</span>
          <span className="text-[12px] text-slate-300 ml-2">TOKENS</span>
        </div>

        <div className="flex justify-between mb-1">
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
