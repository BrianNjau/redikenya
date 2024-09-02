import React, { useEffect, useRef, useState } from "react";
import UserDashLayout from "../Components/UserDashLayout";
import {
  Avatar,
  // Button,
  Card,
  Col,
  Row,
  Statistic,
  Tour,
  // Steps,
  // Tabs,
  // message,
  // notification,
  theme,
} from "antd";
import { useSupabaseAuth } from "../Context/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import MessageBox from "../Components/MessageBox";
// import PricingTable from "../Components/PricingTable";
// import Pricing from "../Components/Pricing";
import Buttons from "../Components/Buttons";
import PriceCard from "../Components/PriceCard";
import subscriptionImg from "../Assets/img/subscriptionDash.gif";
import payAsYouImg from "../Assets/img/payGoDash.gif";
import freeTokens from "../Assets/img/freetokens.gif";
import { Supabase } from "../Functions/SupabaseClient";
import Card1bg from "../Assets/img/algoImg.jpg";
const UserDashboard = () => {
  const session = useSupabaseAuth();
  const { token } = theme.useToken();
  const location = useLocation();
  const firstTimeUserCheck = location.state;
  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);
  const [subscription, setSubscription] = useState();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [openTour, setOpenTour] = useState(true);
  // console.log(firstTimeUserCheck);

  const tourSteps = [
    {
      title: (
        <span className="font-semibold font-serif text-darkgray -tracking-[1px]">
          {" "}
          Welcome to PDI Marketplace Kenya!
        </span>
      ),
      description:
        "We're excited to help you demystify property data in Kenya. Let's take a quick tour to get you started.",
      target: null,
      nextButtonProps: {
        type: "secondary",
      },
    },
    {
      title: (
        <span className="font-semibold font-serif text-darkgray -tracking-[1px]">
          {" "}
          You Have Received Free Tokens
        </span>
      ),
      description:
        "Great news! As a new user, you've been granted 3 free tokens to explore our features. Use them to get a feel for everything we offer.",
      target: () => ref1.current,
      cover: (
        <img
          className="object-contain h-48"
          alt="Free tokens"
          src={freeTokens}
        />
      ),
      nextButtonProps: {
        type: "secondary",
      },
    },
    {
      title: (
        <span className="font-semibold font-serif text-darkgray -tracking-[1px]">
          {" "}
          Dashboard Overview
        </span>
      ),
      description:
        "This is your dashboard. From here, you can easily track your token details. Your current token balance and subscription details are displayed here.",
      target: () => ref2.current,
      nextButtonProps: {
        type: "secondary",
      },
    },
    {
      title: (
        <span className="font-semibold font-serif text-darkgray -tracking-[1px]">
          {" "}
          Explore our Cutting Edge Features
        </span>
      ),
      description:
        "Ready to explore? Use the section below to access different features of the app. Each feature is designed to help you get the most out of your experience.",
      target: () => ref3.current,
      nextButtonProps: {
        type: "secondary",
      },
    },
    {
      title: (
        <span className="font-semibold font-serif text-darkgray -tracking-[1px]">
          {" "}
          Running low on tokens?
        </span>
      ),
      description:
        "No problem! Click here to subscribe for monthly tokens or buy additional tokens as needed. Consider subscribing to our yearly plan to save 25%!",
      target: () => ref4.current,
      nextButtonProps: {
        type: "secondary",
      },
    },
  ];

  const navigate = useNavigate();
  const getTokenCount = async (userId) => {
    try {
      setLoading(true);
      //check paygo
      const { data, error } = await Supabase.from("tokens")
        .select("token_count")
        .eq("user_id", userId)
        .single();
      if (error) console.error("Error fetching token count:", error.message);
      //check subscription
      const { data: subscriptionData, error: subscriptionError } =
        await Supabase.from("subscriptions")
          .select("*")
          .eq("user_id", userId)
          .single();
      if (subscriptionError)
        console.error(
          "error fetching subscription info:",
          subscriptionError.message
        );

      if (subscriptionData) {
        setSubscription(subscriptionData);
        // console.log("Subscription data =>", subscriptionData);
      }

      if (data) {
        setTokenCount(data.token_count);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
    if (firstTimeUserCheck) {
      setFirstTime(true);
    }

    getTokenCount(session.user.id);
  }, [session, firstTimeUserCheck]);

  let userMeta;
  if (session) {
    const { user_metadata } = session.user;
    userMeta = user_metadata;
  }

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
          ref={ref2}
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={8}>
            <Card ref={ref1} bordered={true}>
              <Statistic
                title="Pay As You Go Token Balance"
                value={loading ? "" : tokenCount}
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
              <Statistic
                title="Subscription Token Balance"
                value={subscription ? subscription.tokens : "N/A"}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true}>
              <Statistic
                title="Subscription Renewal Date"
                value={
                  subscription ? subscription.expires_at.split("T")[0] : "N/A"
                }
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

        {/* If user is logging in for the first time show tour  */}

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
        <div ref={ref3}>
          <h6 className="text-lg font-medium text-darkgray -tracking-[-0.1px] mt-8">
            Property Data at Your Fingertips
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
              <Link to="/invest">
                <Card
                  className="p-4 h-full w-full hover:text-black "
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "left center",
                    backgroundImage: `url(https://images.pexels.com/photos/14168997/pexels-photo-14168997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
                    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.75)",
                  }}
                  bordered={true}
                >
                  <div className="flex justify-between">
                    <div>
                      <div>
                        <span className="text-lg font-bold  text-slate-200">
                          Find Your Ideal Property
                        </span>
                        <br /> <br />
                        <span className="text-xs font-medium  text-slate-200 ">
                          Run advanced AI-powered searches to discover
                          properties that fit your rental or purchase price.
                          Gain insights and make informed decisions.
                        </span>
                      </div>
                    </div>

                    <div
                      className="mt-32
              5"
                    >
                      <Avatar
                        style={{
                          backgroundColor: "#000",
                          border: "solid 1px",
                          borderColor: "#3EB489",
                        }}
                        shape="square"
                        size="medium"
                        icon={
                          <i className="feather-arrow-right text-[#fff] hover:text-[#3EB489]"></i>
                        }
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/search">
                <Card
                  className="p-4 h-full w-full"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundImage: `url(${Card1bg}`,
                    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.65)",
                  }}
                  bordered={true}
                >
                  <div className="flex justify-between">
                    <div>
                      <div>
                        <span className="text-lg font-bold  text-slate-200">
                          Explore Properties by Location
                        </span>
                        <br /> <br />
                        <span className="text-xs font-medium  text-slate-200 ">
                          Search any location or road to get detailed property
                          information. Visualize properties with scatter charts
                          and maps. Uncover hidden gems in your desired area!
                        </span>
                      </div>
                    </div>

                    <div
                      className="mt-32
              5"
                    >
                      <Avatar
                        style={{
                          backgroundColor: "#000",
                          border: "solid 1px",
                          borderColor: "#3EB489",
                        }}
                        shape="square"
                        size="medium"
                        icon={
                          <i className="feather-arrow-right text-[#fff] hover:text-[#3EB489]"></i>
                        }
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
            <Col span={8}>
              <Link to="/area-data">
                <Card
                  className="p-4 w-full h-full"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundImage: `url(https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80)`,
                    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.55)",
                  }}
                  bordered={true}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="">
                        <span className="text-lg font-bold text-slate-200">
                          Analyze Market Trends
                        </span>
                        <br /> <br />
                        <span className="text-xs pt-2 font-medium  text-slate-200 ">
                          Get a comprehensive analysis of property data in any
                          location. View typologies, average prices, and
                          insightful charts. Stay ahead with data-driven
                          insights!
                        </span>
                      </div>
                    </div>

                    <div
                      className="mt-32
              5"
                    >
                      <Avatar
                        style={{
                          backgroundColor: "#000",
                          border: "solid 1px",
                          borderColor: "#3EB489",
                        }}
                        shape="square"
                        size="medium"
                        icon={
                          <i className="feather-arrow-right text-[#fff] hover:text-[#3EB489]"></i>
                        }
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>

        <Card ref={ref4} bordered={true} className="mt-16 bg-slate-200">
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
                      Select a yearly subscription plan to receive a 25%
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
                  href={"/manage-plan"}
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
                  href={"/purchase-token"}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* <Pricing /> */}
      </UserDashLayout>
      <Tour
        open={firstTime ? openTour : false}
        onClose={() => setOpenTour(false)}
        steps={tourSteps}
      />
    </>
  );
};

export default UserDashboard;
