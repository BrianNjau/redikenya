import React, { useEffect } from "react";
import Header, { HeaderNav, Menu, MobileMenu } from "./Header";
import { Col, Navbar } from "react-bootstrap";
import LogoLight from "../Assets/img/lightL.png";
import LogoDark from "../Assets/img/darkL.png";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Image } from "antd";
import { useSupabaseAuth } from "../Context/Context";
import Buttons from "./Buttons";
import { Supabase } from "../Functions/SupabaseClient";

const GlobalHeader = (props) => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  useEffect(() => {}, [session]);
  let userMeta;
  if (session) {
    const { user_metadata } = session.user;
    userMeta = user_metadata;
  }

  //dropdown
  const items = [
    {
      label: (
        <Link to="/">
          {" "}
          <i className="feather-compass mr-1"> </i> Dashboard
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="/">
          {" "}
          <i className="feather-credit-card mr-1"></i> Billing
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/">
          {" "}
          <i className="feather-edit-2 mr-1"></i> Profile
        </Link>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button onClick={Logout}>
          {" "}
          <i className="feather-power"></i> Logout
        </button>
      ),
      key: "3",
    },
  ];

  async function Logout() {
    try {
      //
      const { error } = await Supabase.auth.signOut();

      navigate("/login");

      console.log("logged out!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      {/**   theme can be configured as 'light' or 'dark' */}
      {/* Header Start */}
      <Header topSpace={{ desktop: true }} type="reverse-scroll">
        <HeaderNav
          fluid="fluid"
          theme={props.theme}
          expand="lg"
          className="digital-agency-header py-[0px] px-[35px] md:px-[15px] md:py-[20px] sm:px-0"
          containerClass="md:pr-0"
        >
          <Col lg={2} sm={6} xs={"auto"} className="mr-auto ps-0">
            <Link aria-label="header logo" className="flex items-center" to="/">
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
                  className="alt-logo p-1"
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
                <button className=" btn-fill font-serif font-semibold  text-[#08415c] border-solid border-2 p-2 border-[#3EB489] rounded-[6px] ">
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
                className="text-[#08415c] font-serif hover:text-[#3EB489]  mr-[2rem]"
              >
                <i className="mr-[1rem]"></i>LOGIN
              </Link>
              <Buttons
                ariaLabel="button"
                href="/register"
                className="btn-fill mx-[8px] font-medium uppercase rounded-[80px]"
                themeColor="#3EB489"
                color="#F3EFE0"
                size="md"
                title="Try for free"
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
