import React, { useContext, useEffect, useState } from "react";
// import { GlobalContext } from "../Context/Context";
import { Col, Container, Row } from "react-bootstrap";
import { fadeIn } from "../Functions/GlobalAnimations";
import Overlap from "../Components/Overlap";
import { TiltBox } from "../Components/TiltBox";
import { Link, useLocation } from "react-router-dom";
import PatternImage from "../Assets/img/pattern.webp";
import AlgoImage from "../Assets/img/algoImg.jpg";
import Dropcaps from "../Components/Dropcaps";
import { Table } from "antd";
const YHAlgoPage = () => {
  const [investData, setInvestData] = useState([]);
  const [propOverview, setPropOverview] = useState([]);

  useEffect(() => {
    const insightData = JSON.parse(localStorage.getItem("invest-data"));
    console.log("insightdata", insightData);
    if (insightData) {
      setInvestData(insightData.investData);
      setPropOverview(insightData.propOverview);
    }
  }, []);

  const rentalHotspotData = investData.filter(
    (el) => Number(el["Rental Yield"].split("%")[0]) > 9
  );

  // console.log("Hotspots", rentalHotspotData);
  // console.log("Overview", propOverview);

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
      title: "Rental Yield",
      dataIndex: "Rental Yield",
      key: "Rental Yield",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        Number(a["Rental Yield"].split("%")[0]) -
        Number(b["Rental Yield"].split("%")[0]),
    },
    {
      title: "DSQ",
      dataIndex: "DSQ",
      key: "DSQ",
    },
  ];

  const handleBack = () => {
    window.close();
  };

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
                    RENTAL YIELD HOTSPOTS
                  </h3>
                  <div className="inline-block text-[#ffffffb3]  mt-[5px]">
                    Based on the{" "}
                    <span className="inline-block text-[#e6dfdf] hover:text-[#fff] cursor-pointer">
                      {investData.length}
                    </span>{" "}
                    results you queried from the invest page there are{" "}
                    <span className="inline-block text-[#e6dfdf]  hover:text-[#fff] cursor-pointer">
                      {rentalHotspotData.length}
                    </span>{" "}
                    rental hotspots
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
                  content="Rental yield is a metric used to measure the
                      return on investment (ROI) generated by a property. It's typically expressed as a percentage and is calculated
                      by dividing the annual rental income generated by the
                      property by its total value, then
                      multiplying by 100"
                />
              </div>
              <div
                className="col-12 col-lg-5 col-md-10 md:mb-[30px] sm:mb-[15px]"
                {...{ ...fadeIn, transition: { delay: 0.4 } }}
              >
                <div className="bg-[#08415c] p-16 md:p-12 text-[#ffffffb3]">
                  <span className="font-serif font-semibold block text-white mb-[10px]">
                    High rental yield &gt; 9%
                  </span>
                  <p>
                    High rental yield typically refers to a rental yield that is
                    significantly above the average for a given market or
                    location. It indicates that the rental income generated by
                    the property is relatively high compared to its purchase
                    price.
                  </p>
                </div>
              </div>
              <div
                className="col-12 col-lg-5 col-md-10"
                {...{ ...fadeIn, transition: { delay: 0.6 } }}
              >
                <div className="bg-[#08415c] p-16 md:p-12 text-[#ffffffb3]">
                  <span className="font-serif font-semibold block text-white mb-[10px]">
                    Low Rental Yield &lt; 5%
                  </span>
                  <p>
                    Low rental yield refers to a rental yield that is below the
                    average for a given market or location. It indicates that
                    the rental income generated by the property is relatively
                    low compared to its purchase price.
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
              dataSource={rentalHotspotData}
            />
          </Container>
        </section>
      </section>
      {/* Section End */}
    </>
  );
};

export default YHAlgoPage;
