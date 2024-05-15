import React, { useEffect, useState } from "react";
import UserDashLayout from "../Components/UserDashLayout";
import { Card, Col, Row, Statistic } from "antd";
import { useSupabaseAuth } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import { summaryData } from "../Data/SummaryData";
import MessageBox from "../Components/MessageBox";
import PricingTable from "../Components/PricingTable";
import Pricing from "../Components/Pricing";

const UserDashboard = () => {
  const session = useSupabaseAuth();

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

  return (
    <UserDashLayout>
      <h6 className=" font-medium text-darkgray -tracking-[1px]">
        Welcome to PDI,&ensp;
        {/* <span className="text-gradient bg-gradient-to-tr from-[#ff6052] to-[#ff367c] font-semibold"></span>{" "} */}
        <span className="text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          {userMeta.fullName.split(" ")[0]}
        </span>
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
              title="Available tokens"
              value={0}
              //   precision={2}
              //   valueStyle={{
              //     color: "#3f8600",
              //   }}
              //   prefix={<ArrowUpOutlined />}
              //   suffix="%"
            />
            <button
              aria-label="subscribe"
              type="submit"
              className={`text-xs py-[12px] px-[28px] uppercase`}
            >
              Recharge
            </button>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={true}>
            <Statistic
              title="Property Units"
              value={Object.values(summaryData).reduce(
                (acc, curr) => (acc = acc + curr["units"]),
                0
              )}
            />
            <Link to="/search">
              <button
                aria-label="subscribe"
                type="submit"
                className={`text-xs py-[12px] px-[28px] uppercase`}
              >
                Search
              </button>
            </Link>
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
            <button
              aria-label="subscribe"
              type="submit"
              className={`text-xs py-[12px] px-[28px] uppercase`}
            >
              Change
            </button>
          </Card>
        </Col>
      </Row>

      {/* If user is logging in for the first time */}
      <Row
        className="mt-4"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={24}>
          <MessageBox
            className="relative mb-[35px]"
            theme="message-box01"
            variant="success"
            message={
              <>
                <strong>Thank you for signing up to PDI! </strong>
                <span>
                  {" "}
                  Please select a plan below to start your free trial.
                </span>
              </>
            }
            dismissible={true}
          />
        </Col>
      </Row>
      <Row className="justify-center mt-4">
        <Col className="">
          <h6 className=" text-gray-900 text-center font-medium ">
            Choose a plan that's right for you
          </h6>
        </Col>
      </Row>
      {/* <Pricing /> */}
    </UserDashLayout>
  );
};

export default UserDashboard;
