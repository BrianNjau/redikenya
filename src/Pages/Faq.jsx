import React from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import Typed from "react-typed";
import Accordions from "../Components/Accordion/Accordion";
import { AccordionData02 } from "../Components/Accordion/AccordionData";
import { fadeIn } from "../Functions/GlobalAnimations";
import GlobalFooter from "../Components/GlobalFooter";
const Faq = () => {
  return (
    <div className="bg-white">
      <GlobalHeader theme="light" />
      <section className="bg-lightgray py-[40px] sm:py-[30]">
        <Container>
          <Row className="xs:text-center">
            <Col
              xl={8}
              lg={6}
              className="flex md:justify-center md:mb-[15px] sm:block sm:text-center sm:mb-[9px]"
            >
              <h1 className="text-lg leading-[28px] text-darkgray font-medium mb-0 font-serif inline-block">
                Frequently Asked Questions
              </h1>
              <span className="font-serif text-md leading-[28px] relative pl-[25px] ml-[30px] block sm:p-0 before:absolute before:bg-darkgray before:content-[''] before:h-[12px] before:top-[8px] before:w-[2px] before:left-0 sm:before:hidden sm:ml-0">
                Faq
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
      <section className="py-20 bg-white">
        <Container>
          <Row className="justify-center">
            <Col lg={6} md={10}>
              <Accordions
                theme="accordion-style-02"
                className=""
                animation={fadeIn}
                themeColor="light"
                data={AccordionData02}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <GlobalFooter
        theme="dark"
        className="bg-[#262b35] text-slateblue gym-fitness-footer"
      />
    </div>
  );
};

export default Faq;
