import React from "react";
import UserDashLayout from "../Components/UserDashLayout";
import { Card, Col, Row, Statistic } from "antd";
import PurchaseCard from "../Components/PurchaseCard";
import SafeCheck from "../Assets/img/safe-check.png";
import SafeCheckI from "../Assets/img/safeCheck.png";
import CreditCard from "../Assets/img/creditcard.svg";
const PurchaseToken = () => {
  return (
    <UserDashLayout>
      <div className="text-center ">
        {/* Manage Your PDI Plan with{" "} */}
        <span className="text-[30px]  -tracking-[0.1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          Credit Your Account Conviniently
        </span>{" "}
        <br />
        <span className="text-[12px]   font-normal  tracking-[0.5px] mb-16  text-[#08415c]">
          Buy non-expiry tokens and experience PDI AI powered solutions
        </span>
        {/* <Row
          className="mt-6 mb-6"
          //   ref={ref2}
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
                title="Active Subscription Plan"
                value={"No Active Plan"}
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
              <Statistic title="Plan Renewal Date" value={"No expiry"} />
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
        </Row> */}
        <hr className="mt-16 w-[80%] h-0.5 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
        <div className="flex mt-12 justify-between">
          <div className="w-[75%]">
            <PurchaseCard />
          </div>

          <div className="w-[20%] ">
            <Card bordered={true} className="mb-6">
              <div className="flex justify-between">
                <img
                  src={CreditCard}
                  alt="Safe checkout"
                  className="object-contain h-14"
                />

                <span className="text-[14px] ml-4 ">
                  Recharge Your Token Balance Instantly{" "}
                </span>
              </div>
            </Card>
            <Card bordered={true}>
              <span className="text-[14px] ">
                We Accept Mobile Money International Card Payment{" "}
              </span>
              <img src={SafeCheckI} alt="Safe checkout" className="mt-8 h-24" />
            </Card>
          </div>
        </div>
      </div>
    </UserDashLayout>
  );
};

export default PurchaseToken;
