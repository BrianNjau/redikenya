import React from "react";
import UserDashLayout from "../Components/UserDashLayout";
import PriceCard from "../Components/PriceCard";
import { Card, Col, Row, Statistic } from "antd";

const ManagePlan = () => {
  return (
    <UserDashLayout>
      <div className=" text-center mt-10">
        {/* Manage Your PDI Plan with{" "} */}
        <span className="text-[30px]  -tracking-[0.1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          Simple & Transparent Token-Based Pricing
        </span>{" "}
        <br />
        <span className="text-[12px] font-normal  tracking-[0.5px] mb-16  text-[#08415c]">
          Manage your PDI monthly or yearly rolling plan here
        </span>
        <Row
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
        </Row>
        <div className="w-[100%] ml-auto mr-auto mt-8">
          <PriceCard />
        </div>
      </div>
    </UserDashLayout>
  );
};

export default ManagePlan;
