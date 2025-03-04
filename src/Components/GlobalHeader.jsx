import React, { useEffect, useState } from "react";
import Header, { HeaderNav, Menu, MobileMenu } from "./Header";
import { Col, Navbar } from "react-bootstrap";
import LogoLight from "../Assets/img/lightL.png";
import LogoDark from "../Assets/img/darkL.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Image, Spin } from "antd";
import { useSupabaseAuth } from "../Context/Context";
import Buttons from "./Buttons";
import { Supabase } from "../Functions/SupabaseClient";

const GlobalHeader = (props) => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  useEffect(() => {}, [session]);
  const [loading, setLoading] = useState(false);
  let userMeta;
  if (session) {
    const { user_metadata } = session.user;
    userMeta = user_metadata;
  }

  //dropdown
  const items = [
    {
      label: <Link to="/user-dashboard"> Dashboard</Link>,
      key: "0",
    },
    {
      label: <Link to="/manage-plan"> Manage Plan</Link>,
      key: "1",
    },
    {
      label: <Link to="/purchase-token"> Purchase Tokens</Link>,
      key: "2",
    },
    {
      label: <Link to="/billing"> Billing History</Link>,
      key: "3",
    },

    {
      label: <Link to="/profile">Edit Profile</Link>,
      key: "4",
    },
    {
      label: <Link to="/account">Manage Account </Link>,
      key: "5",
    },
    {
      type: "divider",
    },
    {
      label: <button onClick={Logout}> Logout</button>,
      key: "6",
    },
  ];

  async function Logout() {
    try {
      //
      setLoading(true);
      const { error } = await Supabase.auth.signOut();

      if (error) console.log(error);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      {/**   theme can be configured as 'light' or 'dark' */}
      {/* Header Start */}
      <Spin spinning={loading} fullscreen />
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav
          fluid="fluid"
          theme={props.theme}
          expand="lg"
          className="digital-agency-header py-[0px] px-[35px] md:px-[15px] md:py-[20px] sm:px-0"
          containerClass="md:pr-0"
        >
          <Col lg={2} sm={6} xs={"auto"} className="mr-auto ps-0">
            <Link className="" to="/">
              <Navbar.Brand className="inline-block p-0 m-0 mt-0">
                <Image
                  preview={false}
                  className="default-logo p-1"
                  width={180}
                  src={props.theme === "dark" ? LogoLight : LogoDark}
                  alt="logo"
                />

                <Image
                  preview={false}
                  className="mobile-logo"
                  width={120}
                  src={LogoDark}
                  alt="logo"
                />

                <Image
                  className="alt-logo p-1 "
                  src={props.theme === "dark" ? LogoLight : LogoDark}
                  width={180}
                  preview={false}
                  alt="logo"
                />
              </Navbar.Brand>
            </Link>
          </Col>
          <Menu
            className="justify-center col-auto col-lg-8 md:hidden"
            {...props}
          />
          <MobileMenu className="order-last d-lg-none" type="full" {...props} />
          {/* Check login */}
          {session ? (
            <Col
              lg={2}
              xs={"auto"}
              className="justify-end pe-0 flex items-center"
            >
              <Dropdown
                placement="bottomLeft"
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <button className="btn-fill text-[#08415c] border p-2 rounded ">
                  <Avatar
                    style={{
                      backgroundColor: "#08415c",
                      color: "#3EB489",
                    }}
                    className="mr-2"
                  >
                    {userMeta.fullName.split(" ")[0][0]}
                  </Avatar>{" "}
                  {userMeta.fullName}
                  <i className="feather-menu p-1 ml-2"></i>
                </button>
              </Dropdown>
            </Col>
          ) : (
            <Col
              lg={2}
              xs={"auto"}
              className="justify-end pe-0 flex items-center"
            >
              <Link
                to="/login"
                className="text-[#08415c] font-serif hover:text-[#3EB489]  mr-[2rem] w-full"
              >
                <i className="mr-[1rem]"></i>LOGIN
              </Link>
              <Buttons
                ariaLabel="button"
                href="/register"
                className="btn-fill mx-[8px] w-full font-medium uppercase rounded-[80px]"
                themeColor="#3EB489"
                color="#FFFFFF"
                size="md"
                title="Try free"
              />
            </Col>
          )}
        </HeaderNav>
      </Header>
      {/* Header End */}
    </section>
  );
};

export default GlobalHeader;
