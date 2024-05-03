import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/Context";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import Buttons from "../Components/Buttons";
import { fadeIn } from "../Functions/GlobalAnimations";
import { animated, useSpring, easings } from "@react-spring/web";
const VerifyMail = () => {
  const springs = useSpring({
    from: {
      opacity: 0.5,
      y: -150,
      scale: 0.5,
    },
    to: { scale: 1, opacity: 1, y: 0 },
    delay: 150,
    config: {
      easings: easings.steps(10),
    },
  });
  const buttonAnimation = useSpring({
    from: {
      opacity: 0.5,

      scale: 0.5,
    },
    to: { scale: 1, opacity: 1 },
    delay: 1000,
    config: {
      easings: easings.steps(10),
    },
  });
  const { setHeaderHeight } = useContext(GlobalContext);
  useEffect(() => {
    setHeaderHeight(120);
  });
  return (
    <div className="bg-white">
      <GlobalHeader theme="light" />
      {/* Section Start */}
      <section className="bg-lightgray py-[25px]">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              {/* <h1 className="font-serif text-darkgray font-medium mb-0 text-lg md:text-center"></h1> */}
            </Col>
            <Col
              xl={4}
              lg={6}
              className="breadcrumb mb-0 justify-end font-serif md:justify-center sm:mt-[10px] text-sm"
            >
              <ul className="xs-text-center">
                <li>Verify Email Account</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      <section
        className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px] overflow-hidden"
        {...fadeIn}
      >
        <Container>
          <Row className="justify-center text-center font-serif font-medium text-darkgray">
            <Col xl={7} lg={8} md={10}>
              <animated.div style={{ ...springs }}>
                <span className="tracking-[2px] uppercase opacity-50 block mb-[30px] md:mb-[20px]">
                  Welcome to PDI Marketplace Kenya!
                </span>
              </animated.div>

              <h5 className="-tracking-[1px] mb-[50px] md:mb-[40px] xs:w-[98%] xs:mx-auto">
                Account created successfully
                <br />
                Please verify your email to activate your account
              </h5>
              <animated.div style={{ ...buttonAnimation }}>
                <Buttons
                  ariaLabel="button link"
                  href="/login-register"
                  className="font-medium font-serif  tracking-[1px] uppercase rounded-lg !leading-[1.7]"
                  themeColor={["#08415c", "#3eb489"]}
                  size="lg"
                  color="#fff"
                  title="Sign In"
                />
              </animated.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default VerifyMail;
