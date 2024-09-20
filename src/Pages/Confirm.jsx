import React from "react";

import { animated, useSpring, easings } from "@react-spring/web";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Result } from "antd";
import ActivatedIcon from "../Assets/img/activated-icon.svg";
import { useSupabaseAuth } from "../Context/Context";
import Buttons from "../Components/Buttons";
import Celebrate from "../Assets/img/celebrate.svg";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
  const springs = useSpring({
    from: {
      opacity: 0.3,
      y: -150,
      scale: 0.3,
    },
    to: { scale: 1, opacity: 1, y: 0 },
    delay: 400,
    config: {
      easings: easings.steps(10),
    },
  });

  const session = useSupabaseAuth();
  const navigate = useNavigate();

  const checkWindow = window.location.href;

  // console.log(checkWindow.split("confirm")[1]);

  return checkWindow.split("confirm")[1] ===
    "#error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired" ? (
    <>
      <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#08415c] via-[#3EB489] to-[#08415c]"></div>
      <Container className="relative mt-[15vh]">
        <Row className="justify-center">
          <Col xl={7} lg={8} md={10} className="xs:px-0">
            {/* <Link to="/login" className="text-white mb-2">
            <i className="line-icon-Arrow-OutRight mr-2"></i>
            <span>User Dashboard</span>
          </Link> */}

            <div className="text-center font-serif font-medium bg-white rounded-[6px] p-28 sm:p-20 xs:p-16">
              <animated.div style={{ ...springs }}>
                <Result
                  icon={
                    <img
                      className="h-64 ml-auto mr-auto"
                      src={ActivatedIcon}
                      alt="activation-icon"
                    />
                  }
                  title={`Ooops, this link seems to have been already used or expired`}
                  subTitle="If you suspect something is not right, please reach out to support"
                />
                <Buttons
                  ariaLabel="home"
                  href="/"
                  type="submit"
                  className="btn-fill btn-fancy w-1/2 font-medium font-serif rounded-none uppercase"
                  themeColor="#000000"
                  color="#fff"
                  size="sm"
                  title="Back Home"
                />
              </animated.div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  ) : session ? (
    <>
      <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#08415c] via-[#3EB489] to-[#08415c]"></div>
      <Container className="relative mt-[15vh]">
        <Row className="justify-center">
          <Col xl={7} lg={8} md={10} className="xs:px-0">
            {/* <Link to="/login" className="text-white mb-2">
              <i className="line-icon-Arrow-OutRight mr-2"></i>
              <span>User Dashboard</span>
            </Link> */}

            <div className="text-center font-serif font-medium bg-white rounded-[6px] p-20 sm:p-20 xs:p-16">
              <animated.div style={{ ...springs }}>
                <Result
                  icon={
                    <img
                      className="h-64 ml-auto mr-auto"
                      src={Celebrate}
                      alt="activation-icon"
                    />
                  }
                  title={`Welcome to PDI Marketplace Kenya !`}
                  subTitle="Begin
  Exploring Our Property Data Solutions"
                  className="ml-auto mr-auto"
                />
                <Buttons
                  onClick={() =>
                    navigate("/user-dashboard", {
                      state: {
                        firstTimeUser: true,
                      },
                    })
                  }
                  ariaLabel="login"
                  // href="/user-dashboard"
                  type="submit"
                  className="btn-fill btn-fancy w-1/2 font-medium font-serif rounded-none uppercase"
                  themeColor="#000000"
                  color="#fff"
                  size="sm"
                  title="Explore PDI"
                />
              </animated.div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <>
      <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#08415c] via-[#3EB489] to-[#08415c]"></div>
      <Container className="relative mt-[15vh]">
        <Row className="justify-center">
          <Col xl={7} lg={8} md={10} className="xs:px-0">
            {/* <Link to="/login" className="text-white mb-2">
          <i className="line-icon-Arrow-OutRight mr-2"></i>
          <span>User Dashboard</span>
        </Link> */}

            <div className="text-center font-serif font-medium bg-white rounded-[6px] p-28 sm:p-20 xs:p-16">
              <animated.div style={{ ...springs }}>
                <Result
                  icon={
                    <img
                      className="h-64 ml-auto mr-auto"
                      src={ActivatedIcon}
                      alt="activation-icon"
                    />
                  }
                  title={`Ooops, your session has expired`}
                  subTitle="Please login"
                />
                <Buttons
                  ariaLabel="home"
                  href="/login"
                  type="submit"
                  className="btn-fill btn-fancy w-1/2 font-medium font-serif rounded-none uppercase"
                  themeColor="#000000"
                  color="#fff"
                  size="sm"
                  title="Back Home"
                />
              </animated.div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Confirm;
