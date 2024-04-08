import React, { useContext, useEffect } from "react";
import GlobalContext from "../Context/Context";
import { Col, Container, Row } from "react-bootstrap";
import { fadeIn, fadeInLeft, fadeInRight } from "../Functions/GlobalAnimations";
import Overlap from "../Components/Overlap";
import { TiltBox } from "../Components/TiltBox";

import { Link } from "react-router-dom";
import Buttons from "../Components/Buttons";
const YHAlgoPage = () => {
  const { setHeaderHeight } = useContext(GlobalContext);
  useEffect(() => {
    setHeaderHeight(0);
  });
  return (
    <>
      {/* Section Start */}
      <section className="pt-[300px] pb-[255px] overflow-hidden lg:pt-[300px] md:pt-[200px] md:block sm:hidden bg-[#08415c]"></section>
      {/* Section End */}
      <section>
        <Container>
          <Row className="items-end relative">
            <Overlap className="mb-24 sm:mb-[15px] px-[15px] col-12 col-lg-5 offset-lg-1 col-md-6 overflow-hidden">
              <div {...fadeInRight}>
                <TiltBox>
                  <h6 className="text-center text-[#3eb489]  font-semibold mb-0 -tracking-[1px]">
                    RENTAL YIELD HOTSPOTS
                  </h6>
                  <div className="mx-auto w-[1px] h-[110px] bg-black relative top-[25px]"></div>
                  <div className="text-start p-[6.5rem] bg-darkgray flex items-start flex-col justify-center lg:p-[52px] sm:py-16 sm:px-28 xs:p-16">
                    <h6 className="font-serif text-white w-[90%]">
                      From your search, blablabl abalbal balba brlbds
                      eddbdujbcsdccds sdc sdvc sdv sf f d fwe f fv sdf sd sd fsd
                      f sdf ds f0 fsffwsf refwerfwse fwer fw e fweffwedf c
                    </h6>
                    <span className="font-serif uppercase -tracking-[1px] font-medium">
                      PDI MARKETPLACE KENYA
                    </span>
                  </div>
                </TiltBox>
              </div>
            </Overlap>
            <Overlap className="col-lg-5 col-md-6 px-[15px] mb-24 overflow-hidden">
              <div {...fadeInLeft}>
                <TiltBox>
                  <div className="text-start p-[6.5rem] bg-darkgray flex items-start flex-col justify-center lg:p-[52px] sm:py-16 sm:px-28 xs:p-16">
                    <h6 className="font-serif text-white w-[90%]">
                      Rental yield refers to the annual return you get on a
                      rental property, expressed as a percentage. It's basically
                      a way to measure the profitability of a rental investment
                    </h6>
                    <span className="font-serif uppercase -tracking-[1px] font-medium">
                      PDI MARKETPLACE KENYA
                    </span>
                  </div>
                  <div className="mx-auto w-[1px] h-[110px] bg-black relative top-[-25px]"></div>
                  <h3 className="text-center text-black font-sans font-semibold tracking-[-4px] mb-0">
                    PDI MARKETPLACE INSIGHTS
                  </h3>
                </TiltBox>
              </div>
            </Overlap>
          </Row>
          <Row>
            <div
              className="col-12 col-lg-5 col-md-6 offset-lg-1 sm:mb-[15px]"
              {...{ ...fadeIn, transition: { delay: 0.2 } }}
            >
              <span className="font-serif block font-semibold text-darkgray mb-[10px]">
                High Rental Yield (&gt;9%)
              </span>
              <p className="w-[85%] md:w-full">
                Generally considered positive as it suggests the property
                generates a good amount of rental income relative to its
                purchase price.
                <br />
                This could be attractive to investors looking to maximize cash
                flow.
                <br />
                <strong>
                  However, there can be downsides to high yields{" "}
                </strong>{" "}
                <br />
                The property might be in a less desirable location with higher
                vacancy rates or lower quality tenants.
                <br />
                It could require more maintenance and repairs, eating into your
                profits.
              </p>
            </div>
            <div
              className="col-12 col-lg-5 col-md-6"
              {...{ ...fadeIn, transition: { delay: 0.4 } }}
            >
              <span className="font-serif block font-semibold text-darkgray mb-[10px]">
                Low Rental Yield (&lt;5%)
              </span>
              <p className="w-[85%] md:w-full">
                Might indicate the property is overpriced compared to the rents
                it commands.
                <br />
                Lower cash flow, potentially offering less return on investment.
                <br />
                <strong>But there can also be upsides to low yields</strong>
                <br />
                The property could be in a prime location with high demand and
                stable tenants, leading to less vacancy and potentially higher
                property value growth.
                <br />
                It might be a newer property requiring less maintenance.
              </p>
            </div>
          </Row>
        </Container>
      </section>
      {/* display the hotspots from search */}
      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <div className="row" {...{ ...fadeIn, transition: { delay: 0.2 } }}>
            <Col
              lg={10}
              className="flex flex-wrap items-center mx-auto mb-[35px] sm:block"
            >
              <Col
                md={9}
                className="md:text-start sm:mb-[10px] xs:text-center px-0 sm:justify-center"
              >
                <div className="tag-cloud flex flex-wrap sm:justify-center gap-y-5">
                  <span className="text-lg font-medium !mr-[8px] mb-[10px]">
                    <i className="solid-icon-Fire-Flame mr-2 text-[#3eb489]"></i>{" "}
                    Searched Rental Yield Hotspots
                  </span>
                </div>
              </Col>
              <Col
                md={3}
                className="text-center md:text-end px-0 flex justify-end sm:justify-center"
              >
                <Link
                  aria-label="link"
                  className="uppercase text-darkgray text-xs w-auto font-medium inline-block border border-mediumgray rounded pt-[5px] pb-[6px] px-[18px] mb-[10px] leading-[20px] hover:text-black hover:shadow-[0_0_10px_rgba(23,23,23,0.10)] transition-default"
                  to="#"
                >
                  <i className="solid-icon-Home mr-2 text-[#3eb489]"></i>
                  <span>05 UNITS</span>
                </Link>
              </Col>
            </Col>
          </div>
          <div className="row" {...{ ...fadeIn, transition: { delay: 0.4 } }}>
            <Col lg={10} className="mx-auto mb-[60px] md:mb-[30px] ">
              <div className="flex items-center w-full bg-white rounded-[5px] p-16 sm:block shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                <div className="w-[130px] mr-[60px] sm:mx-auto text-center">
                  <img
                    width=""
                    height=""
                    src="https://via.placeholder.com/125x125"
                    className="rounded-full w-[110px] mx-auto"
                    alt=""
                  />
                  <Link
                    aria-label="link"
                    to="/blogs/blog-grid"
                    className="text-darkgray font-serif font-medium mt-[20px] inline-block text-md hover:text-fastblue"
                  >
                    Colene Landin
                  </Link>
                  <span className="text-md block leading-[18px] sm:mb-[15px]">
                    Co-founder
                  </span>
                </div>
                <div className="w-[75%] md:text-start sm:w-full sm:text-center">
                  <p className="mb-[25px]">
                    Lorem ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <Buttons
                    to="/blogs/blog-grid"
                    className="font-medium font-serif after:bg-black after:h-[2px] pt-0 hover:text-black uppercase btn-link md:mb-[15px]"
                    color="#232323"
                    size="lg"
                    title="All author posts"
                  />
                </div>
              </div>
            </Col>
          </div>
        </Container>
      </section>
      {/* Section End */}
    </>
  );
};

export default YHAlgoPage;
