import { Card, ConfigProvider, notification, Slider } from "antd";
import React, { useState } from "react";
import Buttons from "./Buttons";
import { CheckOutlined } from "@ant-design/icons";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSupabaseAuth } from "../Context/Context";
import Logo from "../Assets/img/darkL.png";
import { Supabase } from "../Functions/SupabaseClient";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
const PurchaseCard = () => {
  const [tokenValue, setTokenValue] = useState(1);
  const [tokenPrice, setTokenPrice] = useState(155);
  const public_key = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const test_public_key = process.env.REACT_APP_FLW_TEST_PUBLIC_KEY;
  const flw_secret_key = process.env.REACT_APP_FLW_SECRET_KEY;
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  function handlePrice(val) {
    try {
      //onswipe
      setTokenValue(val);

      const tokenPrice = val * 155;
      setTokenPrice(tokenPrice);
    } catch (e) {
      console.log(e);
    }
  }
  //   console.log(session);
  const flwConfig = {
    public_key: test_public_key,
    tx_ref: Date.now(),
    amount: tokenPrice,
    currency: "KES",
    payment_options: "card,mobilemoney,ussd",
    // payment_plan: "",
    customer: {
      email: session.user.email,
      phone_number: session.user.phone,
      name: session.user.user_metadata.fullName,
    },
    customizations: {
      title: "PDI Marketplace Kenya",
      description: "Payment for Non Expiry PDI Tokens",
      //   logo: "../src/Assets/img/darkL.png",
    },
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    alert("Thanks for doing business with us! Come back soon!!");
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const paystackProps = {
    email: session.user.email,
    amount: tokenPrice * 100,
    currency: "KES",
    metadata: {
      name: session.user.user_metadata.fullName,
      phone: session.user.phone,
    },
    publicKey: public_key,
    text: "Pay Now",
    label: "PDI Marketplace Kenya",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),

    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  const purchaseToken = useFlutterwave(flwConfig);

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            dotActiveBorderColor: "#3eb489",
            handleActiveColor: "#08415c",
            handleColor: "#08415c",
            trackBg: "#3eb489",
            trackHoverBg: "#3eb489",
            colorPrimaryBorderHover: "#08415c",
          },
        },
      }}
    >
      <Card bordered={true} className="p-4 bg-lightgray rounded-2xl  ">
        <div className="flex justify-between">
          {contextHolder}
          <span className="mt-2 font-bold  text-[16px] tracking-[1px] uppercase text-[#a8a8a8]">
            {tokenValue} Tokens
          </span>
          <span className=" tracking-[-0.5px] text-[slate-800]  text-[30px] font-bold">
            Ksh. {tokenPrice}{" "}
            <span className="text-[16px] font-semibold text-[slate-800] ">
              {" "}
            </span>
          </span>
        </div>
        {/* price slider */}
        <Slider
          styles={{
            tracks: {
              background: `linear-gradient(to right, "rgb(8, 65, 92)" 0%, "rgb(8, 65, 92)",
                  )} 100%)`,
            },
          }}
          min={1}
          max={80}
          defaultValue={1}
          tooltip={{
            formatter: null,
          }}
          onChange={handlePrice}
          className="mt-8"
        />
        <div>
          <span className="text-[12px] font-medium text-slate-800 mr-6"></span>
        </div>
        <hr className="mt-8" />

        <div className="flex  mt-8 justify-between ">
          <ul className="text-left text-[9px] text-slate-800">
            <li>
              <span>
                {" "}
                <CheckOutlined className="text-[#3eb489]" /> No Expiry Tokens
              </span>
            </li>
            <li>
              <span>
                {" "}
                <CheckOutlined className="text-[#3eb489]" /> AI Powered
                Investment Insights{" "}
              </span>
            </li>
            <li>
              <span>
                {" "}
                <CheckOutlined className="text-[#3eb489]" /> PDI Location Search{" "}
              </span>
            </li>
            <li>
              <span>
                {" "}
                <CheckOutlined className="text-[#3eb489]" /> PDI Area Data{" "}
              </span>
            </li>
          </ul>

          <PaystackButton
            className="btn-fill btn-fancy bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-medium"
            {...paystackProps}
          />

          <Buttons
            onClick={() => {
              purchaseToken({
                callback: async (response) => {
                  //
                  console.log("Payment Response", response);

                  // if purchase successful
                  if (response["status"] === "successful") {
                    // Insert the token purchase record, which will trigger the function to update tokens
                    const { data, error } = await Supabase.from(
                      "token_purchases"
                    ).insert([
                      {
                        user_id: session.user.id,
                        token_amount: tokenValue,
                        transaction_id: response["transaction_id"],
                      },
                    ]);

                    if (data) {
                      closePaymentModal(); // this will close the flutterwave modal programmatically
                    }

                    if (error) {
                      console.error(
                        "Error recording token purchase:",
                        error.message
                      );
                      api.error({
                        message: error.code,
                        description: error.message,
                      });
                    }
                  } else {
                    console.log(response);
                    closePaymentModal(); // this will close the flutterwave modal programmatically
                  }
                },
                onClose: () => {
                  console.log("Onclose ");
                  api.success({
                    message: "Tokens Purchased Successfully",
                    description: `You have successfully credited your account ${tokenValue} tokens`,
                  });
                  navigate("/user-dashboard");
                },
              });
            }}
            ariaLabel="subscribe"
            className="btn-fill btn-fancy bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-medium"
            themeColor="#08415c"
            color="#fff"
            size="xl"
            title="Buy Tokens"
          />
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default PurchaseCard;
