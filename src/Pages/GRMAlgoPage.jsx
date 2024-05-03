import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/Context";
import { Col, Container, Row } from "react-bootstrap";
import { fadeIn } from "../Functions/GlobalAnimations";
import Overlap from "../Components/Overlap";
import { TiltBox } from "../Components/TiltBox";
import { Link, useLocation } from "react-router-dom";
import PatternImage from "../Assets/img/pattern.webp";
import AlgoImage from "../Assets/img/algoImg.jpg";
import Dropcaps from "../Components/Dropcaps";
import { Table } from "antd";
const GRMAlgoPage = () => {
  const { setHeaderHeight } = useContext(GlobalContext);
  useEffect(() => {
    setHeaderHeight(0);
  });
  const location = useLocation();
  const investData = location.state.investData;
  const propOverview = location.state.propOverview;

  const grmRange = investData.map((a) => a["GRM (Years)"]);

  const totalGRM = grmRange.reduce((partialSum, a) => partialSum + a, 0);
  const averageGRM =
    Math.round((totalGRM / grmRange.length + Number.EPSILON) * 100) / 100;

  const lowPriceSqmData = investData.filter(
    (el) => el["GRM (Years)"] < averageGRM
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
      title: "GRM",
      dataIndex: "GRM (Years)",
      key: "GRM (Years)",
      defaultSortOrder: "descend",
      sorter: (a, b) => b["GRM (Years)"] - a["GRM (Years)"],
      render: (prop) => <span>{prop.toLocaleString()} years</span>,
    },

    {
      title: "Floor area (SqM)",
      dataIndex: "Floor area (SqM)",
      key: "Floor area (SqM)",
    },
  ];

  return (
    <>
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
                    LOW GRM
                  </h3>
                  <div className="inline-block text-[#ffffffb3]  mt-[5px]">
                    Based on the{" "}
                    <span className="inline-block text-[#e6dfdf] hover:text-[#fff] cursor-pointer">
                      {investData.length}
                    </span>{" "}
                    properties you queried from the invest page the average GRM
                    is{" "}
                    <span className="inline-block text-[#e6dfdf]  hover:text-[#fff] cursor-pointer">
                      {averageGRM.toLocaleString()} Years
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
                  content="GRM, or Gross Rent Multiplier, is a significant metric for investors in real estate because it helps them quickly assess the investment potential of a property based on its rental income. It essentially compares the property's purchase price with the annual rental income it generates."
                />
              </div>
              <div
                className="col-12 col-lg-5 col-md-10 md:mb-[30px] sm:mb-[15px]"
                {...{ ...fadeIn, transition: { delay: 0.4 } }}
              >
                <div className="bg-[#08415c] p-16 md:p-12 text-[#ffffffb3]">
                  <span className="font-serif font-semibold block text-white mb-[10px]">
                    High GRM (Gross Rent Multiplier)
                  </span>
                  <p className="text-sm">
                    <span className="text-white font-medium">Pros</span> <br />
                    <ul>
                      <li>
                        1. Potential for Capital Appreciation: Properties with a
                        high GRM may have higher potential for capital
                        appreciation over time, as they are often located in
                        areas with strong demand and limited supply.
                      </li>
                      <li>
                        2. Desirable Locations: High GRM properties are often
                        located in desirable neighborhoods or prime locations,
                        which can attract tenants willing to pay higher rents.
                      </li>
                    </ul>
                    <span className="text-white font-medium">Cons</span> <br />
                    <ul>
                      <li>
                        1. Lower Cash Flow: High GRM properties typically
                        generate lower rental income relative to their purchase
                        price. This may result in lower cash flow for investors.
                      </li>
                      <li>
                        2. Increased Investment Risk: Properties with a high GRM
                        may pose higher investment risk, as they rely more
                        heavily on potential appreciation in property value to
                        achieve satisfactory investment returns.
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
                    Low GRM (Gross Rent Multiplier)
                  </span>
                  <p className="text-sm">
                    <span className="text-white font-medium">Pros</span> <br />
                    <ul>
                      <li>
                        1. Strong Cash Flow: Properties with a low GRM generate
                        higher rental income relative to their purchase price.
                        This results in stronger cash flow for investors, making
                        it easier to cover expenses, mortgage payments, and
                        generate profits.
                      </li>
                      <li>
                        2. Faster Return on Investment: Investing in properties
                        with a low GRM can lead to a quicker return on
                        investment (ROI) compared to properties with higher GRM.
                      </li>
                    </ul>
                    <span className="text-white font-medium">Cons</span> <br />
                    <ul>
                      <li>
                        1. Limited Capital Appreciation: Low GRM properties may
                        have limited potential for capital appreciation compared
                        to properties with higher GRM.
                      </li>
                      <li>
                        2. Market Volatility Impact: Properties with a low GRM
                        may be more susceptible to market fluctuations and
                        economic downturns.
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

export default GRMAlgoPage;
