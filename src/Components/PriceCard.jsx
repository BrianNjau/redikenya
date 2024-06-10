import { Badge, Card, ConfigProvider, Slider, Switch } from "antd";
import React, { useState } from "react";
import Buttons from "./Buttons";
import { CheckOutlined } from "@ant-design/icons";

const PriceCard = () => {
  const [tokenValue, setTokenValue] = useState(0);
  const [price, setPrice] = useState(0);

  function handlePrice(val) {
    try {
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
            4 Tokens
          </span>
          <span className=" tracking-[-0.5px] text-[#08415c]  text-[30px] font-bold">
            Ksh. 600{" "}
            <span className="text-[16px] font-semibold text-[#989898] ">
              {" "}
              / month{" "}
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
          max={10}
          className="mt-8"
        />
        <div>
          <span className="text-[12px] font-medium text-[#989898] mr-6">
            Monthly
          </span>
          <Switch defaultChecked className="" />

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
            ariaLabel="subscribe"
            className="btn-fill btn-fancy  bg-gradient-to-tr from-[#3EB489] to-[#08415c]  font-medium  rounded-2xl "
            themeColor="#fff"
            color="#fff"
            size="md"
            title="Start Plan"
          />
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default PriceCard;
