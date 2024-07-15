import { Card, ConfigProvider, Slider, Switch } from "antd";
import React, { useState } from "react";
import Buttons from "./Buttons";
import { CheckOutlined } from "@ant-design/icons";
// import { Flutterwave } from "flutterwave-node-v3";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useSupabaseAuth } from "../Context/Context";
// import { CreatePaymentPlan } from "../Functions/FlutterwaveFunctions";

const PriceCard = () => {
  const [tokenValue, setTokenValue] = useState(3);
  const [yearlyToken, setYearlyTokenValue] = useState(tokenValue * 12);
  const [monthlyPrice, setMonthlyPrice] = useState(450);
  const [yearlyPrice, setYearlyPrice] = useState(
    monthlyPrice * 12 - 0.25 * monthlyPrice * 12
  );
  const [billYearly, setBillYearly] = useState(false);

  //handle subscription logic
  const public_key = process.env.REACT_APP_FLW_PUBLIC_KEY;
  const flw_secret_key = process.env.REACT_APP_FLW_SECRET_KEY;
  const session = useSupabaseAuth();

  console.log(session);
  // const flw = new Flutterwave(public_key, flw_secret_key);
  // const subscriptionDet = {
  //   amount: billYearly ? yearlyPrice : monthlyPrice,
  //   name: "PDI Custom Customer Subscription Plan",
  //   interval: billYearly ? "yearly" : "monthly",
  // };

  function handlePrice(val) {
    try {
      //onswipe
      setTokenValue(val);
      setYearlyTokenValue(val * 12);
      const monthlyPrice = val * 150;
      setYearlyPrice(monthlyPrice * 12 - 0.25 * monthlyPrice * 12);
      setMonthlyPrice(monthlyPrice);
    } catch (e) {
      console.log(e);
    }
  }
  const flwConfig = {
    public_key: public_key,
    tx_ref: Date.now(),
    amount: billYearly ? yearlyPrice : monthlyPrice,
    currency: "KSH",
    payment_options: "card,mobilemoney,ussd",
    // payment_plan: "",
    customer: {
      email: session.user.email,
      phone_number: session.user.phone,
      name: session.user.user_metadata.fullName,
    },
    customizations: {
      title: "PDI Subscription ",
      description: "Payment for Selected PDI Subscription",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  const handleFlutterPayment = useFlutterwave(flwConfig);
  // useFlutterwave();

  async function handleSubscription() {
    //
    try {
      // if no plan create

      //check db for plan if no plan create

      // const plan = CreatePaymentPlan({
      //   amount: billYearly ? yearlyPrice : monthlyPrice,
      //   name: "PDI Subscription Plan",
      //   interval: billYearly ? "yearly" : "monthly",
      // });

      // if (plan) console.log(plan);

      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          closePaymentModal(); // this will close the modal programmatically
        },
        onClose: () => {},
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSwitcher(el) {
    try {
      setBillYearly(el);
    } catch (e) {
      console.log(e);
    }
  }

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
      <Card bordered={true} className="p-4 shadow-2xl">
        <div className="flex justify-between">
          <span className="mt-2 font-bold  text-[16px] tracking-[1px] uppercase text-[#989898]">
            {billYearly ? yearlyToken : tokenValue} Tokens
          </span>
          <span className=" tracking-[-0.5px] text-[#08415c]  text-[30px] font-bold">
            Ksh. {billYearly ? yearlyPrice : monthlyPrice}{" "}
            <span className="text-[16px] font-semibold text-[#989898] ">
              {" "}
              / {billYearly ? "year" : "month"}{" "}
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
          min={3}
          max={40}
          defaultValue={3}
          tooltip={{
            formatter: null,
          }}
          onChange={handlePrice}
          className="mt-8"
        />
        <div>
          <span className="text-[12px] font-medium text-[#989898] mr-6">
            Monthly
          </span>
          <Switch onChange={handleSwitcher} />

          <span className="text-[12px] font-medium text-[#989898] ml-6">
            Yearly
            <span className="ml-2 text-[9px] rounded-xl p-1 bg-[#3eb489] bg-opacity-[0.2] text-[#3eb489] ">
              25% <span className="hide">discount</span>
            </span>
          </span>
        </div>
        <hr className="mt-8" />

        <div className="flex  mt-8 justify-between ">
          <ul className="text-left text-[9px] text-[#989898]">
            <li>
              <span>
                {" "}
                <CheckOutlined className="text-[#3eb489]" />{" "}
                {billYearly
                  ? "Tokens will expire after 365 Days"
                  : "Tokens will expire after 30 days"}
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
          <Buttons
            onClick={handleSubscription}
            ariaLabel="subscribe"
            className="btn-fill btn-fancy   bg-gradient-to-tr from-[#3EB489] to-[#08415c]  font-medium   "
            themeColor="#fff"
            color="#fff"
            size="xl"
            title="CREATE PLAN"
          />
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default PriceCard;
