import React from "react";

import { animated, useSpring, easings } from "@react-spring/web";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Result } from "antd";
import MailIcon from "../Assets/img/mail-icon.svg";

const VerifyMail = () => {
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

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#08415c] via-[#3EB489] to-[#08415c]"></div>
      <Container className="relative mt-[15vh]">
        <Row className="justify-center">
          <Col xl={7} lg={8} md={10} className="xs:px-0">
            {/* <Link to="/" className="text-white mb-2">
              <i className="line-icon-Arrow-OutLeft mr-2"></i>
              <span>back</span>
            </Link> */}

            <div className="text-center font-serif font-medium bg-white rounded-[6px] p-28 sm:p-20 xs:p-16">
              <animated.div style={{ ...springs }}>
                <Result
                  icon={
                    <img
                      className="h-64 ml-auto mr-auto"
                      src={MailIcon}
                      alt="mail-icon"
                    />
                  }
                  title="Successfully Created Account! Please Verify Your Email"
                  subTitle="We have sent an email to your inbox"
                />
              </animated.div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VerifyMail;
