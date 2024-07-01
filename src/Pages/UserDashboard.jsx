import React, { useEffect, useState } from "react";
import UserDashLayout from "../Components/UserDashLayout";
import {
  Button,
  Card,
  Col,
  Row,
  Statistic,
  Steps,
  Tabs,
  message,
  notification,
  theme,
} from "antd";
import { useSupabaseAuth } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";

import MessageBox from "../Components/MessageBox";
import PricingTable from "../Components/PricingTable";
import Pricing from "../Components/Pricing";
import Buttons from "../Components/Buttons";
import { ArrowRightOutlined, SolutionOutlined } from "@ant-design/icons";
import PriceCard from "../Components/PriceCard";
import subscriptionImg from "../Assets/img/subscriptionDash.gif";
import payAsYouImg from "../Assets/img/payGoDash.gif";

const UserDashboard = () => {
  const session = useSupabaseAuth();
  const { token } = theme.useToken();

  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session]);

  let userMeta;
  if (session) {
    const { user_metadata } = session.user;
    userMeta = user_metadata;
  }
  const paymentMode = [
    {
      key: "1",
      label: "Monthly",
      children: <></>,
    },
    {
      key: "2",
      label: "Yearly",
      children: "Content of Tab Pane 2",
    },
  ];
  const steps = [
    {
      title: "Select Plan",
      content: (
        <div className="mt-4">
          <span className="text-[26px]  tracking-[1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c]  font-semibold">
            Simple & Transparent Token-Based Pricing
          </span>
          <br />
          <span className="text-[12px]  tracking-[0.5px] font-serif text-[#08415c]">
            Select token plan to begin your 7-day trial
          </span>
          <div className="w-[50%] ml-auto mr-auto mt-8">
            <PriceCard />
          </div>
        </div>
      ),
    },
    {
      title: "Complete Payment",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));
  const contentStyle = {
    // lineHeight: "400px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    minHeight: "46vh",
  };

  return (
    <>
      <UserDashLayout>
        <h6 className=" font-medium text-darkgray -tracking-[1px]">
          Welcome back to PDI, &ensp;
          {/* <span className="text-gradient bg-gradient-to-tr from-[#ff6052] to-[#ff367c] font-semibold"></span>{" "} */}
          <span className="text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
            {userMeta.fullName.split(" ")[0]}
          </span>
          👋
        </h6>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={8}>
            <Card bordered={true}>
              <Statistic
                title="Pay as You Go tokens"
                value={0}
                //   precision={2}
                //   valueStyle={{
                //     color: "#3f8600",
                //   }}
                //   prefix={<ArrowUpOutlined />}
                //   suffix="%"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true}>
              <Statistic title="Subscription Tokens" value={0} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true}>
              <Statistic
                title="Active Subscription"
                value={"No Active Plan"}
                //   precision={2}
                //   valueStyle={{
                //     color: "#cf1322",
                //   }}
                //   prefix={<ArrowDownOutlined />}
                //   suffix="%"
              />
            </Card>
          </Col>
        </Row>

        {/* If user is logging in for the first time */}

        {/* <Steps className="mt-6" size="small" current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="secondary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="secondary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div> */}

        {/* <div className="mt-8 text-center  ">
          <span className="text-[26px] tracking-[1px] text-gradient mt-2 bg-gradient-to-tr from-[#3EB489] to-[#08415c]  font-semibold">
            Simple & Transparent Token-Based Pricing
          </span>
          <br />
          <span className="text-[12px]  tracking-[0.5px] font-serif text-[#08415c]">
            Select token plan to begin your monthly or yearly rolling
            subscription
          </span>
          <div className="w-[50%] ml-auto mr-auto mt-8">
            <PriceCard />
          </div>
        </div> */}

        <Card bordered={true} className="mt-24 bg-slate-200">
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            className="m-8"
          >
            <Col span={8}>
              <h5 className="font-medium text-darkgray -tracking-[1px]">
                Top Up Your PDI Tokens Today 🚀
              </h5>
              <span className="mt-8">
                Gain access to PDI Marketplace cutting edge <br />
                features using tokens
              </span>
            </Col>

            <Col span={8}>
              <Card bordered={true} className="p-2 shadow-2xl">
                <div className="flex">
                  <div className="">
                    <h6 className="font-medium text-darkgray">
                      Save By Subscribing
                    </h6>
                    <span>
                      Select to a yearly subscription plan to receive a 25%
                      discount
                    </span>
                  </div>
                  <img
                    className="h-40 ml-auto mr-auto"
                    src={subscriptionImg}
                    alt="Go to subscription tokens"
                  />
                </div>
                <Buttons
                  ariaLabel="subscribe"
                  type="submit"
                  className="btn-fill btn-fancy bg-black font-medium hover:bg-white font-serif rounded-2xl uppercase mt-4"
                  themeColor="#fff"
                  color="#fff"
                  size="lg"
                  title="Subscribe"
                  href={"/billing"}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card bordered={true} className="p-2 shadow-2xl">
                <div className="flex">
                  <div className="">
                    <h6 className="font-medium text-darkgray">
                      Buy With Convinience
                    </h6>
                    <span>Buy non-expiring tokens as you use the platform</span>
                  </div>
                  <img
                    className="h-40 ml-auto mr-auto"
                    src={payAsYouImg}
                    alt="Go to subscription tokens"
                  />
                </div>
                <Buttons
                  ariaLabel="subscribe"
                  type="submit"
                  className="btn-fill btn-fancy bg-black font-medium hover:bg-white font-serif rounded-2xl uppercase mt-4"
                  themeColor="#fff"
                  color="#fff"
                  size="lg"
                  title="Buy Tokens"
                  href={"/billing"}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* <Pricing /> */}
      </UserDashLayout>
    </>
  );
};

export default UserDashboard;
