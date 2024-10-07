import React from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import Buttons from "../Components/Buttons";
import { Link } from "react-router-dom";
import { fadeIn } from "../Functions/GlobalAnimations";
import IconWithText from "../Components/IconWithText/IconWithText";
import Typed from "react-typed";
import GlobalFooter from "../Components/GlobalFooter";

const AboutUs = () => {
  const IconWithTextData = [
    {
      icon: "line-icon-Navigation-LeftWindow text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Unparalleled Data Access",
      content:
        "We provide access to a wealth of real-time and historical data, allowing our clients to gain deep insights into market trends, property valuations, demand patterns, RoI market gradient and more.",
    },
    {
      icon: "line-icon-Cursor-Click2 text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Informed Decision-Making",
      content:
        "We equip investors and stakeholders with the tools they need to make decisions grounded in data-driven analysis, mitigating risks and optimizing returns.",
    },
    {
      icon: "line-icon-Archery-2 text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Market Transparency",
      content:
        "Our commitment to transparency ensures that our clients have a clear understanding of market dynamics, property performance, and investment opportunities.",
    },
    {
      icon: "line-icon-Female text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Innovation and Technology",
      content:
        "By harnessing cutting-edge technologies and innovative solutions, we deliver advanced platforms that simplify data analysis, visualization, and interpretation.",
    },
  ];

  return (
    <div className="bg-white">
      {/** <SideButtons /> */}

      <GlobalHeader theme="light" />
      {/* Section Start */}

      <section className="bg-lightgray py-[40px] sm:py-[30px]">
        <Container>
          <Row className="xs:text-center">
            <Col
              xl={8}
              lg={6}
              className="flex md:justify-center md:mb-[15px] sm:block sm:text-center sm:mb-[9px]"
            >
              <h1 className="text-lg leading-[28px] text-darkgray font-medium mb-0 font-serif inline-block">
                About us
              </h1>
              <span className="font-serif text-md leading-[28px] relative pl-[25px] ml-[30px] block sm:p-0 before:absolute before:bg-darkgray before:content-[''] before:h-[12px] before:top-[8px] before:w-[2px] before:left-0 sm:before:hidden sm:ml-0">
                Why PDI Marketplace Kenya
              </span>
            </Col>
            <Col
              xl={4}
              lg={6}
              className="breadcrumb justify-end px-[15px] text-sm font-serif m-0 md:justify-center"
            >
              <ul>
                <li className="!leading-[30px]">
                  {/* <Link aria-label="link for" to="/support"> */}
                  <Typed
                    className="font-semibold text-[#3eb489]"
                    strings={[
                      "PDI",
                      "Property Development Investments",
                      "Property Data Insights",
                    ]}
                    typeSpeed={80}
                    backSpeed={80}
                    loop
                    showCursor
                    cursorChar="|"
                  />
                  {/* </Link> */}
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section
        id="about"
        className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]"
      >
        <Container>
          <Row className="font-serif">
            <Col lg={4} className="pe-lg-0 flex md:mb-[30px]">
              <div
                className="w-full md:h-[700px] sm:h-[550px] xs:h-[450px] cover-background"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1612253280934-3e0eb5b25251?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80') ",
                }}
              ></div>
            </Col>
            <Col
              lg={4}
              md={6}
              className="ps-lg-0 flex items-center sm:mb-[30px]"
            >
              <div className="justify-center h-full w-full flex flex-col items-start bg-[#08415c] px-[5.5rem] lg:px-[3rem] md:p-16">
                <span className="text-xlg lg:text-lg lg:leading-[26px] font-medium text-[#f3efe0] mb-[20px] block">
                  PDI Marketplace Kenya, your trusted partner in unlocking the
                  power of data-driven decision-making within the realm of real
                  estate investments.
                </span>
                <p className="text-[#f3efe0] font-sans opacity-70 mb-[20px] xs:mb-[15px]">
                  {" "}
                  In an era where information drives innovation and success, our
                  company stands at the forefront of revolutionizing the way
                  real estate professionals and investors approach their
                  investment strategies.
                </p>
                <Buttons
                  href="/contact-us"
                  className="font-medium font-serif uppercase text-[#f3efe0]  after:h-[2px] btn-link md:text-md md:mb-[15px] after:bg-[#f3efe0] hover:text-[#f3efe0]"
                  color="#f3efe0"
                  title="Talk to us"
                />
              </div>
            </Col>
            <Col lg={4} md={6} className="flex flex-col pr-0">
              <img
                src="https://images.unsplash.com/photo-1543245924-0b171b1d7303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                alt="about us"
                className="sm:w-full"
              />
              <div className="bg-white px-[3.5rem] py-[3rem] h-full lg:p-8 sm:p-16">
                <span className="text-darkgray font-medium mb-[10px] block">
                  Our Vision
                </span>
                <p className="font-sans">
                  We envision a future where every real estate decision is
                  underpinned by actionable insights derived from comprehensive
                  data analysis. Our commitment lies in fostering a culture
                  where investors, developers, agents, and stakeholders can
                  harness the power of AI and data to drive innovation, reduce
                  risk, and seize opportunities.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="bg-lightgray py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col
              xl={7}
              lg={8}
              md={7}
              sm={10}
              className="text-left sm:text-center sm:mb-[30px]"
            >
              <h6 className="font-serif text-darkgray font-medium mb-0">
                <strong className="text-[#08415c] underline underline-offset-auto font-semibold">
                  Our Mission
                </strong>{" "}
                to bridge the gap between data and real estate investments.
              </h6>
            </Col>
            <Col
              xl={{ span: 3, offset: 2 }}
              lg={4}
              md={5}
              className="sm:text-center text-right"
            >
              <Link to="/user-dashboard">
                <span className="cursor-pointer font-serif inline-block py-[19px] px-[44px] text-white rounded about-us-bg-gradient">
                  <i className="fa fa-arrow-right line-icon-Arrow-Forward2 text-[50px] inline-block ml-0 mr-[15px] align-middle"></i>
                  <div className="inline-block text-start text-md align-middle uppercase font-medium">
                    <span className="opacity-60 text-md block leading-[15px]">
                      Explore our
                    </span>
                    Features
                  </div>
                </span>
              </Link>
            </Col>
            <Col className="mt-[8.5rem] sm:mt-20"></Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]">
        <Container>
          <Row className="justify-center flex">
            <div
              className="text-center mb-20 md:mb-12 col-lg-6 col-sm-8"
              {...fadeIn}
            >
              <span className="text-xmd mb-[15px] font-serif block w-full">
                Value proposition
              </span>
              <h5 className="font-serif text-darkgray font-medium mb-8 sm:w-full">
                Key Objectives
              </h5>
            </div>
            <Col xs={12} md={9} lg={12}>
              <IconWithText
                grid="row-cols-1 row-cols-md-1 row-cols-lg-2 gap-y-[15px]"
                theme="icon-with-text-02 about-us-icon-with-text"
                data={IconWithTextData}
                animation={fadeIn}
                animationDelay={0.1}
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
      <GlobalFooter
        theme="dark"
        className="bg-[#262b35] text-slateblue gym-fitness-footer"
      />
    </div>
  );
};

export default AboutUs;
