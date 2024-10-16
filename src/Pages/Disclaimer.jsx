import React from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import Typed from "react-typed";
import GlobalFooter from "../Components/GlobalFooter";
const Disclaimer = () => {
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
                Disclaimer
              </h1>
              <span className="font-serif text-md leading-[28px] relative pl-[25px] ml-[30px] block sm:p-0 before:absolute before:bg-darkgray before:content-[''] before:h-[12px] before:top-[8px] before:w-[2px] before:left-0 sm:before:hidden sm:ml-0">
                Last Updated : 16th October 2024
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
                Accuracy of Information
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                While we strive to provide accurate and up-to-date information,
                we cannot guarantee the completeness or accuracy of the data
                presented. Users should verify all information independently.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Data Sources
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Our data is sourced from various public and private entities.
                The accuracy and completeness of the data depend on the sources
                from which it is derived.
              </p>
              {/* <Lists theme="list-style-06" data={ListData} animationDelay={0} /> */}
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Use of Data
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                The data and insights provided are for informational purposes
                only and should not be construed as financial or investment
                advice. Users should consult with a qualified professional
                before making any investment decisions.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Limitation of Liability
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We are not liable for any losses or damages resulting from the
                use of our data and insights. Users assume all risks associated
                with their use of the information provided.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Updates and Changes
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Data is subject to change without notice. We do not guarantee
                that our data will be updated in real-time.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Third-Party Links
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Our platform may contain links to third-party websites. We are
                not responsible for the content or accuracy of these external
                sites.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                User Responsibility
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Users are responsible for ensuring that their use of the data
                complies with all applicable laws and regulations.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Data Interpretation
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                The interpretation of data and analytics provided by our
                platform is subjective and should be conducted with caution.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                No Endorsement
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                The inclusion of any property or entity in our data does not
                constitute an endorsement or recommendation.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                Service Availability
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                We do not guarantee the uninterrupted availability of our
                platform and services. Access may be affected by technical
                issues or maintenance.
              </p>
              <p className="mb-0">&nbsp;</p>
              <h6 className="font-serif text-darkgray font-medium -tracking-[1px]">
                KPI’s estimates
              </h6>
              <p className="mb-[25px] md:mb-[20px] sm:mb-[15px]">
                Some KPIs, such as rents indicated, are subjective and may not
                precisely reflect the current rates being charged. While we
                strive to provide accurate and up-to-date information, these
                figures should be considered as estimates and not definitive
                values. Market conditions can change rapidly, and rents can vary
                significantly based on numerous factors, including location,
                property condition, and tenant negotiations. Users are
                encouraged to verify these figures independently and consider
                them as part of a broader analysis when making investment
                decisions.
              </p>
              By using our Website and services, you acknowledge that you have
              read and understood this Disclaimer.
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

export default Disclaimer;
