import React, { useContext, useEffect, useState } from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Parallax } from "react-scroll-parallax";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Supabase } from "../Functions/SupabaseClient";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Select,
  Space,
  Tooltip,
  Row as RowAnt,
  Col as ColAnt,
  Modal,
  Progress,
} from "antd";
import {
  GlobalContext,
  NotificationContext,
  useSupabaseAuth,
} from "../Context/Context";
import { InfoCircleOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { consumeToken } from "../Functions/ConsumeToken";
import SearchConfirm from "../Assets/img/SearchConf.svg";
import GlobalFooter from "../Components/GlobalFooter";
import IconWithText from "../Components/IconWithText/IconWithText";
import { fadeIn } from "../Functions/GlobalAnimations";
const Search = () => {
  const navigate = useNavigate();
  let [location, setLocation] = useState([]);
  let [propertyRoad, setPropertyRoad] = useState([]);
  let [loadingLocation, setLoadingLocation] = useState(false);
  let [loadingRoad, setLoadingRoad] = useState(false);
  let [loadingSubmit, setLoadingSubmit] = useState(false);
  let [selectedRoad, setSelectedRoad] = useState("");
  let [selectedLocation, setSelectedLocation] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("active"); // Possible statuses: 'active', 'exception', 'success'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openNotification } = useContext(NotificationContext);

  const session = useSupabaseAuth();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { setHeaderHeight } = useContext(GlobalContext);
  useEffect(() => {
    setHeaderHeight(120);
  }, [session]);

  const onChange = async (value) => {
    try {
      setSelectedLocation(value);
      setLoadingRoad(true);
      const { data: propertyRoadData } = await Supabase.from(
        "Property Overview"
      )
        .select("Road")
        .eq("Location", value);
      if (propertyRoadData) {
        setPropertyRoad(propertyRoadData);
      }
      setLoadingRoad(false);
    } catch (err) {
      console.log(err);
      setLoadingRoad(false);
    }
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  async function fetchProperties() {
    try {
      setLoadingLocation(true);

      const { data: propertyLocation } = await Supabase.from(
        "Property Overview"
      ).select("Location");

      if (propertyLocation) {
        setLocation(propertyLocation);
      }
      setLoadingLocation(false);
    } catch (err) {
      console.log(err);
      setLoadingLocation(false);
    }
  }

  const onSubmitSearch = async (e) => {
    try {
      e.preventDefault();
      setLoadingSubmit(true);
      setProgress(30);
      setTimeout(() => setProgress(60), 1000);
      //check user login
      if (!session) {
        setIsModalOpen(false);
        navigate("/login");
        openNotification(
          "topRight",
          "Login required",
          "You must login to get our data insights"
        );
        return;
      }

      //open modal first and ask for confirmation

      //first try consume token and receive success message
      const consumeTokenResult = await consumeToken(session.user.id);
      // console.log("consume token result", consumeTokenResult);
      if (consumeTokenResult.success) {
        if (selectedRoad) {
          const { data: searchedRoadResults } = await Supabase.from(
            "Property Overview"
          )
            .select()
            .eq("Road", selectedRoad);
          const propertyId = searchedRoadResults.map((a) => a["Property ID"]);

          //search data specific to the overview
          const { data: propertyDataSearched } = await Supabase.from("PropData")
            .select()
            .in("PropertyID", propertyId);

          let searched = {
            roadResults: searchedRoadResults,
            road: selectedRoad,
            propertyData: propertyDataSearched,
          };
          navigate("/search-results", { state: searched });
        } else {
          const { data: searchedLocationResults } = await Supabase.from(
            "Property Overview"
          )
            .select()
            .eq("Location", selectedLocation);
          // console.log(searchedLocationResults)
          const propertyId = searchedLocationResults.map(
            (a) => a["Property ID"]
          );
          //search data specific to the overview
          const { data: propertyDataSearched } = await Supabase.from("PropData")
            .select()
            .in("PropertyID", propertyId);
          // console.log(propertyDataSearched);
          let searched = {
            roadResults: searchedLocationResults,
            location: selectedLocation,
            propertyData: propertyDataSearched,
          };

          setProgress(100);
          setStatus("success");
          // enhance animation effect

          setTimeout(() => {
            setIsModalOpen(false);
            navigate("/search-results", { state: searched });
            openNotification(
              "topRight",
              "Successfully completed search",
              consumeTokenResult.message
            );
          }, 1000);
        }
      } else {
        setProgress(100);
        setStatus("exception"); // Show error status if something goes wrong
        setTimeout(() => {
          openNotification(
            "topRight",
            "Failed to complete search",
            consumeTokenResult.message
          );
          setIsModalOpen(false);
          setLoadingSubmit(false);
          setProgress(0);
          setStatus("active");
        }, 1000);
      }
      setLoadingSubmit(false);
    } catch (err) {
      setProgress(100);
      setStatus("exception");
      setLoadingSubmit(false);
      console.log(err);
      setIsModalOpen(false);
      setProgress(0);
      setStatus("active");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  let uniqueLocations = [...new Set(location.map((item) => item.Location))];
  let uniqueRoad = [...new Set(propertyRoad.map((item) => item.Road))];

  const IconWithTextData = [
    {
      icon: "line-icon-Pipe text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Project pipeline",
      content: "Access upcoming projects in your location of interest.",
    },
    {
      icon: "line-icon-Bar-Chart3 text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Economic Data",
      content:
        "Access macro-economic data which plays an important role in shaping the real estate market.",
    },
    {
      icon: "line-icon-Dashboard text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Data Charts and Infographics",
      content:
        "Access modern, well detailed and easy to understand dashboards offering key insights on data points",
    },
    {
      icon: "line-icon-Search-People text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Property Search",
      content:
        "Access local property market data relevant in informing your investment objectives and Strategy",
    },
    {
      icon: "line-icon-Bar-Chart text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Area Data",
      content:
        " Access hyperlocal data to help you identify the most attractive local areas within the city or neighbourhood.",
    },
    {
      icon: "line-icon-Money-Bag text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e]",
      title: "Buy or Rent",
      content:
        "Leverage AI- tools and advanced algorithms to uncover both rental and investment insights.",
    },
  ];

  return (
    <div className="">
      <GlobalHeader theme="light" />
      <div className="md:flex md:items-center overflow-hidden relative py-[80px] mb-24">
        <Parallax
          className="lg-no-parallax bg-cover cover-background w-full absolute top-[0px] left-0  xl:-top-[90px] "
          translateY={[-40, 40]}
        ></Parallax>
        <div className="absolute top-0 left-0 w-full h-full opacity-100 bg-[#08415c]"></div>
        <Container>
          <Row className="justify-center items-center h-[400px] md:h-[320px] xs:h-[200px]">
            <Col
              lg={7}
              md={9}
              className="relative flex flex-col justify-center items-center"
            >
              <div className="text-center mb-[40px]">
                <h1
                  style={{ color: "#f3efe0" }}
                  className="text-[32px] leading-[49px] font-serif  font-medium mb-0 sm:text-[30px] sm:leading-[40px]"
                >
                  Search for Nairobi Property Data
                </h1>
              </div>
              <div className="relative w-full">
                <Space.Compact block size="large">
                  <Select
                    className="my-select-container mr-1"
                    placeholder="Location"
                    size="large"
                    style={{ width: "27%" }}
                    loading={loadingLocation}
                    onChange={onChange}
                    options={uniqueLocations.map((a) => {
                      return {
                        value: a,
                        label: a,
                      };
                    })}
                  />
                  <Select
                    className="my-select-container"
                    size="large"
                    style={{ width: "70%", borderRadius: "4px" }}
                    showSearch
                    suffixIcon={
                      propertyRoad.length === 0 ? (
                        <Tooltip title="Select Location to search road data">
                          <InfoCircleOutlined style={{ color: "orange" }} />
                        </Tooltip>
                      ) : null
                    }
                    loading={loadingRoad}
                    placeholder="Search road or leave blank to search by Location"
                    status={propertyRoad.length === 0 ? "info" : ""}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={uniqueRoad.map((a) => {
                      return {
                        value: a,
                        label: a,
                      };
                    })}
                    onChange={(e) => setSelectedRoad(e)}
                  />

                  <Button
                    // className="hover:text-black"
                    style={{ color: "#3EB489" }}
                    icon={<i className="fas fa-search text-xs"></i>}
                    loading={loadingSubmit}
                    disabled={propertyRoad.length === 0 ? true : false}
                    onClick={showModal}
                    // type="primary"
                  >
                    <span className="text-xs font-semibold">SEARCH</span>
                  </Button>
                </Space.Compact>
                <p
                  style={{ color: "#f3efe0", textAlign: "center" }}
                  className="mt-4 "
                >
                  1 search = 1 token{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Divider className="mt-3 mb-8">Uncover Vital Property Insights </Divider>

      {/* <RowAnt gutter={56} className="m-4  mb-8">
        <ColAnt className="gutter-row" span={8}>
          <Card style={{ width: 450, marginTop: 16, height: 150 }}>
            <Meta
              avatar={
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#FFFFFF" }}
                  icon={<i className="line-icon-Pipe text-[#08415c]"></i>}
                />
              }
              title="Project pipeline"
              description={
                <>
                  <span>
                    Access upcoming projects in your location of interest.
                  </span>
                  <br />
                  <br />
                </>
              }
            />
          </Card>
        </ColAnt>
        <ColAnt className="gutter-row" span={8}>
          <Card style={{ width: 450, marginTop: 16, height: 150 }}>
            <Meta
              avatar={
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#FFFFFF" }}
                  icon={<i className="line-icon-Bar-Chart3 text-[#08415c]"></i>}
                />
              }
              title="Economic Data"
              description={
                <>
                  <span>
                    Access macro-economic data which plays an important role in
                    shaping the real estate market.
                  </span>
                  <br />
                  <br />
                </>
              }
            />
          </Card>
        </ColAnt>
        <ColAnt className="gutter-row" span={8}>
          <Card style={{ width: 450, marginTop: 16, height: 150 }}>
            <Meta
              avatar={
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#FFFFFF" }}
                  icon={<i className="line-icon-Dashboard text-[#08415c]"></i>}
                />
              }
              title="Visuals"
              description={
                <>
                  <span>
                    {" "}
                    Access modern, well detailed and easy to understand
                    dashboards offering key insights on data points
                  </span>
                  <br />
                  <br />
                </>
              }
            />
          </Card>
        </ColAnt>
      </RowAnt> */}

      <RowAnt gutter={56} className=" m-4 ">
        {/* <ColAnt className="gutter-row" span={8}>
          <Card style={{ width: 450, marginTop: 16, height: 320 }}>
            <Meta
              avatar={
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#FFFFFF" }}
                  icon={
                    <i className="line-icon-Search-People text-[#08415c]"></i>
                  }
                />
              }
              title="Search"
              description={
                <>
                  <span>
                    {" "}
                    Access local property market data relevant in informing your
                    investment objectives and Strategy
                  </span>
                  <br />
                  <br />
                  <p className="text-sm">
                    i. Market Prices
                    <br />
                    ii. Unit Prices
                    <br />
                    iii. Rents
                    <br />
                    iv. Rental Yields
                    <br />
                    v. GRM
                  </p>
                </>
              }
            />
          </Card>
        </ColAnt>
        <ColAnt className="gutter-row" span={8}>
          <Card style={{ width: 450, marginTop: 16, height: 320 }}>
            <Meta
              avatar={
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#FFFFFF" }}
                  icon={<i className="line-icon-Bar-Chart text-[#08415c]"></i>}
                />
              }
              title="Area Data"
              description={
                <>
                  <span>
                    Access hyperlocal data to help you identify the most
                    attractive local areas within the city or neighbourhood.
                  </span>
                  <br />
                  <br />
                  <RowAnt gutter={8}>
                    <ColAnt className="gutter-row" span={12}>
                      <p className="text-sm">
                        i. Population
                        <br />
                        ii. Demographic profile
                        <br />
                        iii. Development character control
                        <br />
                        iv. Skyline
                        <br />
                        v. Densities
                        <br />
                        vi. Market inventory
                      </p>
                    </ColAnt>
                    <ColAnt className="gutter-row" span={12}>
                      <p className="text-sm">
                        vii. Typology
                        <br />
                        viii. Plinth analysis
                        <br />
                        ix. Amenities
                        <br />
                        x. Proximity to areas of interest
                        <br />
                        xi. Land use profile
                        <br />
                        xii. Emerging patterns
                      </p>
                    </ColAnt>
                  </RowAnt>
                </>
              }
            />
          </Card>
        </ColAnt>
        <ColAnt className="gutter-row" span={8}>
          <Card style={{ width: 450, marginTop: 16, height: 320 }}>
            <Meta
              avatar={
                <Avatar
                  size={64}
                  style={{ backgroundColor: "#FFFFFF" }}
                  icon={<i className="line-icon-Money-Bag text-[#08415c]"></i>}
                />
              }
              title="Invest"
              description={
                <>
                  <span>
                    {" "}
                    Search for optimal investment opportunity within your
                    capital outlay.
                  </span>
                  <br />
                  <br />

                  <p className="text-sm">
                    i. Compare Market Price
                    <br />
                    ii. Rental Yield Insights
                    <br />
                    iii. GRM
                    <br />
                    iv. Location of Properties
                    <br />
                    v. Quality of Amenities
                  </p>
                </>
              }
            />
          </Card>
        </ColAnt> */}
        <Col className="mt-4 mb-16" xs={12} md={8} lg={12}>
          <IconWithText
            grid="row-cols-1 row-cols-md-1 row-cols-lg-3 gap-y-[12px]"
            theme="icon-with-text-02 about-us-icon-with-text"
            data={IconWithTextData}
            animation={fadeIn}
            animationDelay={0.1}
          />
        </Col>
      </RowAnt>

      <Modal
        title={
          loadingSubmit || status === "exception" || status === "success" ? (
            <p className="text-base text-center font-semibold ml-auto mr-auto ">
              Hold tight running your search
            </p>
          ) : (
            <img
              className="h-48 ml-auto mr-auto"
              src={SearchConfirm}
              alt="celebration"
            />
          )
        }
        open={isModalOpen}
        onOk={onSubmitSearch}
        onCancel={handleCancel}
        okText="Continue"
        okType="primary"
        cancelText="Cancel"
        cancelButtonProps={{
          disabled: loadingSubmit,
        }}
        okButtonProps={{
          className: "text-white bg-black",
          loading:
            loadingSubmit || status === "exception" || status === "success",
        }}
      >
        {loadingSubmit || status === "exception" || status === "success" ? (
          <div>
            <br />
            <div className="text-center mb-4">
              <Progress
                className="ml-auto mr-auto"
                type="line"
                percent={progress}
                status={status}
              />
            </div>
          </div>
        ) : (
          <div>
            <br />
            <div className="text-center mb-4">
              <p className="text-base font-semibold">You're almost there!</p>

              <p className="text-sm font-light">
                Please note that this search will consume one token
              </p>
            </div>
          </div>
        )}
      </Modal>
      <GlobalFooter
        theme="dark"
        className="bg-[#262b35] text-slateblue gym-fitness-footer"
      />
    </div>
  );
};

export default Search;
