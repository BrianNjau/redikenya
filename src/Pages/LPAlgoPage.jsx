import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/Context";
import { Col, Container, Row } from "react-bootstrap";
import { fadeIn } from "../Functions/GlobalAnimations";
import Overlap from "../Components/Overlap";
import { TiltBox } from "../Components/TiltBox";
import { Link } from "react-router-dom";
import PatternImage from "../Assets/img/pattern.webp";
import AlgoImage from "../Assets/img/algoImg.jpg";
import Dropcaps from "../Components/Dropcaps";
import { Table } from "antd";
const LPAlgoPage = () => {
  const { setHeaderHeight } = useContext(GlobalContext);
  const [investData, setInvestData] = useState([]);
  const [propOverview, setPropOverview] = useState([]);

  useEffect(() => {
    setHeaderHeight(0);
    const insightData = JSON.parse(localStorage.getItem("invest-data"));
    // console.log("insightdata", insightData);
    if (insightData) {
      setInvestData(insightData.investData);
      setPropOverview(insightData.propOverview);
    }
  }, []);

  const handleBack = () => {
    window.close();
  };

  const pricesqmRange = investData.map((a) => a["Unit Price/SqM"]);

  const totalPriceSqm = pricesqmRange.reduce(
    (partialSum, a) => partialSum + a,
    0
  );
  const averagePriceSqm =
    Math.round((totalPriceSqm / pricesqmRange.length + Number.EPSILON) * 100) /
    100;

  const lowPriceSqmData = investData.filter(
    (el) => el["Unit Price/SqM"] < averagePriceSqm
  );

  const columnRentalYieldTable = [
    {
      title: "Property Name",
      key: "name",
      render: (prop) => {
        const propertyName = propOverview.find(
          (el) => prop["PropertyID"] === el["Property ID"]
        )["Name"];
        return <span>{propertyName}</span>;
      },
    },
    {
      title: "Rent",
      key: "Rent",
      render: (prop) => <span>Ksh. {prop["Rent"].toLocaleString()}</span>,
    },
    {
      title: "Typology",
      dataIndex: "Typology",
      key: "Typology",
    },
    {
      title: "Market Price",
      key: "Market Price",
      render: (prop) => (
        <span>Ksh. {prop["Market Price"].toLocaleString()}</span>
      ),
    },
    {
      title: "Unit Price/SqM",
      dataIndex: "Unit Price/SqM",
      key: "Unit Price/SqM",
      defaultSortOrder: "descend",
      sorter: (a, b) => b["Unit Price/SqM"] - a["Unit Price/SqM"],
      render: (prop) => <span>{prop.toLocaleString()} Ksh/Sqm</span>,
    },
    {
      title: "Floor area (SqM)",
      dataIndex: "Floor area (SqM)",
      key: "Floor area (SqM)",
    },
  ];

  return (
    <>
      <button onClick={handleBack} className="m-4 text-green-500">
        <i className="feather-arrow-left mr-2"></i>
        back
      </button>
      <section
        className=" h-[500px] sm:h-[400px] xs:h-[300px] cover-background "
        style={{ backgroundImage: `url(${AlgoImage})` }}
      >
        <div
          className="absolute top-0 left-0 h-full w-full opacity-70
            bg-gradient-to-b from-[#08415c] to-[#000000]"
        ></div>
      </section>
      <section className="pb-0 sm:py-[50px] xs:overflow-hidden ">
        <Container className="xs:p-0">
          <Row className="justify-center z-10">
            <Overlap className="!px-0">
              <TiltBox className="p-0">
                <Col
                  lg={10}
                  className="font-serif text-center bg-[#08415c] text-white py-[7rem] px-[15px] relative mx-auto"
                  style={{
                    backgroundImage: `url(${PatternImage})`,
                  }}
                >
                  <div className="w-[1px] h-[90px] bg-white mx-auto absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="uppercase text-md font-medium mb-[25px] font-serif">
                    <div className="text-white bg-black"></div>
                    <Link
                      aria-label="link"
                      to="/blogs/blog-grid"
                      className="text-white inline-block"
                    >
                      PDI Marketplace Kenya
                    </Link>
                    <span className="mx-[20px] w-[1px] h-[10px] bg-white inline-block"></span>
                    <Link
                      aria-label="link"
                      to="/blogs/blog-grid"
                      className="inline-block text-white"
                    >
                      Investment Strategies
                    </Link>
                  </div>
                  <h3 className="font-semibold w-1/2 mx-auto md:w-[70%] xs:w-[90%]">
                    LEAST PRICE/SQM
                  </h3>
                  <div className="inline-block text-[#ffffffb3]  mt-[5px]">
                    Based on the{" "}
                    <span className="inline-block text-[#e6dfdf] hover:text-[#fff] cursor-pointer">
                      {investData.length}
                    </span>{" "}
                    properties you queried from the invest page the average
                    price/sqm is{" "}
                    <span className="inline-block text-[#e6dfdf]  hover:text-[#fff] cursor-pointer">
                      {averagePriceSqm.toLocaleString()} Ksh/Sqm
                    </span>{" "}
                  </div>
                </Col>
              </TiltBox>
            </Overlap>
          </Row>
        </Container>
        <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]">
          <Container>
            <Row className="justify-center">
              <div
                className="col-12 col-md-10 mb-24 "
                {...{ ...fadeIn, transition: { delay: 0.2 } }}
              >
                <Dropcaps
                  theme="dropcaps-style04"
                  content="Price per square meter is a fundamental metric in property investment that helps investors assess value, analyze potential returns, and make informed decisions in the real estate market."
                />
              </div>
              <div
                className="col-12 col-lg-5 col-md-10 md:mb-[30px] sm:mb-[15px]"
                {...{ ...fadeIn, transition: { delay: 0.4 } }}
              >
                <div className="bg-[#08415c] p-16 md:p-12 text-[#ffffffb3]">
                  <span className="font-serif font-semibold block text-white mb-[10px]">
                    High Price Per Square Metre
                  </span>
                  <p className="text-sm">
                    <span className="text-white font-medium">Pros</span> <br />
                    <ul>
                      <li>
                        Desirable Location: Properties with a high price per
                        square meter are often located in desirable areas with
                        amenities, infrastructure, and proximity to city centers
                        or popular attractions.
                      </li>
                      <li>
                        Potential for Capital Appreciation: High-priced
                        properties may have greater potential for capital
                        appreciation over time due to their location, demand,
                        and limited supply.
                      </li>
                    </ul>
                    <span className="text-white font-medium">Cons</span> <br />
                    <ul>
                      <li>
                        Higher Entry Barrier: The high price per square meter
                        can pose a significant barrier to entry for investors,
                        requiring a substantial initial Investment.
                      </li>
                      <li>
                        Lower Rental Yield: High-priced properties may yield
                        lower rental returns relative to their purchase price.
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
              <div
                className="col-12 col-lg-5 col-md-10"
                {...{ ...fadeIn, transition: { delay: 0.6 } }}
              >
                <div className="bg-[#08415c] p-16 md:p-12 text-[#ffffffb3]">
                  <span className="font-serif font-semibold block text-white mb-[10px]">
                    Low Price Per Square Metre
                  </span>
                  <p className="text-sm">
                    <span className="text-white font-medium">Pros</span> <br />
                    <ul>
                      <li>
                        Affordability: Properties with a low price per square
                        meter are more affordable for investors, requiring a
                        lower initial investment.
                      </li>
                      <li>
                        Higher Rental Yield Potential: Lower-priced properties
                        may offer higher rental yields relative to their price,
                        and potentially faster returns on investment through
                        rent.
                      </li>
                    </ul>
                    <span className="text-white font-medium">Cons</span> <br />
                    <ul>
                      <li>
                        Location Challenges: Properties with a low price/sqm may
                        be located in less desirable or developing areas with
                        limited amenities, infrastructure, or potential for
                        capital appreciation.
                      </li>
                      <li>
                        Property Quality Concerns: Lower-priced properties may
                        require significant renovation, maintenance, or
                        repairs..
                      </li>
                    </ul>
                  </p>
                </div>
              </div>
            </Row>
          </Container>
        </section>
        <section className="mb-12">
          <Container>
            <Table
              columns={columnRentalYieldTable}
              dataSource={lowPriceSqmData}
            />
          </Container>
        </section>
      </section>
      {/* Section End */}
    </>
  );
};

export default LPAlgoPage;
