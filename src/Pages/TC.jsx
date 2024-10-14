import React from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import Typed from "react-typed";
import GlobalFooter from "../Components/GlobalFooter";
const TC = () => {
  return (
    <div className="bg-white">
      <GlobalHeader theme="light" />
      <section className="bg-lightgray py-[40px] sm:py-[30px]">
        <Container>
          <Row className="xs:text-center">
            <Col
              xl={8}
              lg={6}
              className="flex md:justify-center md:mb-[15px] sm:block sm:text-center sm:mb-[9px]"
            >
              <h1 className="text-lg leading-[28px] text-darkgray font-medium mb-0 font-serif inline-block">
                Terms of use
              </h1>
              <span className="font-serif text-md leading-[28px] relative pl-[25px] ml-[30px] block sm:p-0 before:absolute before:bg-darkgray before:content-[''] before:h-[12px] before:top-[8px] before:w-[2px] before:left-0 sm:before:hidden sm:ml-0">
                How to use PDI
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

      {/* Section Start */}
      <section className="py-[160px] lg:py-[120px] md:py-[95px] sm:py-[80px] xs:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col lg={9} md={12} className="col-12">
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                General information
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem ipsum has been the industry’s standard dummy
                text ever since the when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap electronic
                typesetting, essentially unchanged.
              </p>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Lorem ipsum has been the industry’s standard dummy text ever
                since the when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. Lorem ipsum is simply
                dummy text of the printing and typesetting industry.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Policy introduction
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                It has survived not only five centuries, but also the leap
                electronic typesetting, essentially unchanged. Lorem ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem ipsum has been the industry’s standard dummy text ever
                since the when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </p>
              {/* <Lists theme="list-style-06" data={ListData} animationDelay={0} /> */}
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Lorem ipsum has been the industry’s standard dummy text ever
                since the when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Providing your personal data to others
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem ipsum has been the industry’s standard dummy
                text ever since the when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries.
              </p>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Lorem ipsum has been the industry’s standard dummy text ever
                since the when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. Lorem ipsum is simply
                dummy text of the printing and typesetting industry.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Personally Identifiable Information
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem ipsum has been the industry’s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release.
              </p>
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

export default TC;
