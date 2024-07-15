import React from "react";
import UserDashLayout from "../Components/UserDashLayout";
import PriceCard from "../Components/PriceCard";
import { Card, Col, Row, Statistic } from "antd";

const ManagePlan = () => {
  return (
    <UserDashLayout>
      <h6 className="font-medium text-darkgray -tracking-[1px]">
        Manage Your{" "}
        <span className="text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          PDI
        </span>{" "}
        Subscription Plan
      </h6>

      <Row
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
      </Row>
      <div className="mt-8 text-center  ">
        <span className="text-[26px] tracking-[1px] text-gradient mt-2 bg-gradient-to-tr from-[#3EB489] to-[#08415c]  font-semibold">
          Simple & Transparent Token-Based Pricing
        </span>
        <br />
        <span className="text-[12px]  tracking-[0.5px] font-serif text-[#08415c]">
          Create your token plan to begin your monthly or yearly rolling
          subscription
        </span>
        <div className="w-[50%] ml-auto mr-auto mt-8">
          <PriceCard />
        </div>
      </div>
    </UserDashLayout>
  );
};

export default ManagePlan;
