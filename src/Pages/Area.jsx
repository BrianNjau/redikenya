import React, { useContext, useEffect, useState } from "react";
import GlobalHeader from "../Components/GlobalHeader";
import {
  Select,
  Tabs,
  Row as RowAnt,
  Col as ColAnt,
  Divider,
  Drawer,
  Checkbox,
  Dropdown,
  Tooltip,
  Button as ButtonAnt,
  Result,
  Table,
  Modal,
  Progress,
  Input,
  Alert,
} from "antd";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Link } from "react-router-dom";
import { areaData } from "../Data/AreaDataText";
import Kileimg from "../Assets/img/kilelesh.jpg";
import KilimaniImg from "../Assets/img/kileleshwa.jpg";
import WestieImg from "../Assets/img/westlandsA.jpg";
import RiverImg from "../Assets/img/riversideIm.jpg";
import LaviImg from "../Assets/img/lavi.jpg";
import { Supabase } from "../Functions/SupabaseClient";
import StatisticCard from "../Components/StatisticCard";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import SearchAreaImage from "../Assets/img/areaSearch.svg";
import { NotificationContext, useSupabaseAuth } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import SearchConfirm from "../Assets/img/SearchConf.svg";
import { consumeToken } from "../Functions/ConsumeToken";
import GlobalFooter from "../Components/GlobalFooter";
import {
  QuestionCircleFilled,
  QuestionCircleOutlined,
  QuestionCircleTwoTone,
} from "@ant-design/icons";

const Area = () => {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedLocationLoading, setSelectedLocationLoading] = useState(false);
  const [locationOverview, setLocationOverview] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [stockProperties, setStockProperties] = useState([]);
  const [pipelineProperties, setPipelineProperties] = useState([]);
  const [stockYear, setStockYear] = useState([]);
  const [selectedStockYear, setSelectedStockYear] = useState([]);
  const [stockPropertyLoading, setStockPropertyLoading] = useState(false);
  const [filteredStock, setFilteredStock] = useState([]);
  const [filteredPropertyDetails, setFilteredPropertyDetails] = useState([]);
  const [filteredPropertyOverview, setFilteredPropertyOverview] = useState([]);
  const [roads, setRoads] = useState([]);
  const [typology, setTypology] = useState([]);
  const [selectedRoad, setSelectedRoad] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedTypology, setSelectedTypology] = useState([]);
  const [marketValue, setMarketValue] = useState([]);
  const [filteredMarketValue, setFilteredMarketValue] = useState([]);
  const [selectedDropDown, setSelectedDropDown] = useState();
  const [selectedGRIData, setSelectedGRIData] = useState("median");
  const session = useSupabaseAuth();

  const navigate = useNavigate();

  const swiperRef = React.useRef(null);
  // const swiperRef2 = React.useRef(null);
  // const [activeSlide, setActiveSlide] = useState(0);

  //consume token featues

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("active"); // Possible statuses: 'active', 'exception', 'success'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openNotification } = useContext(NotificationContext);

  const showModal = (e) => {
    setIsModalOpen(true);
    setSelectedDropDown(e);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const locationSelectionOptions = areaData.map((a) => {
    return {
      value: a["area"],
      label: a["area"],
    };
  });

  useEffect(() => {
    if (selectedRoad.length > 0 && roads.includes(selectedRoad[0]) === false) {
      //location, road mismatch refresh state for filters
      setSelectedRoad([]);
    }
    // if(filteredPropertyDetails.length===0&&)
    setFilteredPropertyDetails(propertyDetails);
    setFilteredPropertyOverview(locationOverview);
    setFilteredStock(stockProperties);
    setSelectedTypology(typology);
    setSelectedStockYear(stockYear);
    setFilteredMarketValue(marketValue);
  }, [
    roads,
    propertyDetails,
    typology,
    locationOverview,
    stockYear,
    stockProperties,
    session,
  ]);

  function generateEnsuiteBarChartData(filteredPropertyDetails, typologies) {
    return typologies.map((typology) => {
      // Filter properties by the current typology
      const typologyProperties = filteredPropertyDetails.filter(
        (el) => el["Typology"] === typology
      );

      // Count the occurrences of each En-suite variation
      const ensuiteCounts = typologyProperties.reduce(
        (acc, property) => {
          const ensuiteType = property["En-suite"];
          if (ensuiteType === "All") {
            acc.all++;
          } else if (ensuiteType === "Three") {
            acc.three++;
          } else if (ensuiteType === "Two") {
            acc.two++;
          } else if (ensuiteType === "Master ") {
            acc.master++;
          } else if (ensuiteType === "Standard") {
            acc.std++;
          }
          return acc;
        },
        { all: 0, three: 0, two: 0, master: 0, std: 0 }
      );

      // Calculate the total number of properties for this typology
      const totalProperties = typologyProperties.length;

      // Calculate the percentages for each ensuite type
      const allPercentage =
        totalProperties > 0
          ? ((ensuiteCounts.all / totalProperties) * 100).toFixed(2)
          : 0;
      const masterPercentage =
        totalProperties > 0
          ? ((ensuiteCounts.master / totalProperties) * 100).toFixed(2)
          : 0;
      const stdPercentage =
        totalProperties > 0
          ? ((ensuiteCounts.std / totalProperties) * 100).toFixed(2)
          : 0;
      const threePercentage =
        totalProperties > 0
          ? ((ensuiteCounts.three / totalProperties) * 100).toFixed(2)
          : 0;
      const twoPercentage =
        totalProperties > 0
          ? ((ensuiteCounts.two / totalProperties) * 100).toFixed(2)
          : 0;

      // Return the object in the desired format
      return {
        property: typology,
        all: allPercentage,
        allColor: "hsl(169, 70%, 50%)", // Assign colors based on your preference
        master: masterPercentage,
        masterColor: "hsl(189, 70%, 50%)", // Assign colors based on your preference
        standard: stdPercentage,
        stdColor: "hsl(199, 70%, 50%)", // Assign colors based on your preference
        three: threePercentage,
        threeColor: "hsl(135, 70%, 50%)",
        two: twoPercentage,
        twoColor: "hsl(92, 70%, 50%)",
      };
    });
  }
  function generateCloakRoomBarChartData(filteredPropertyDetails, typologies) {
    return typologies.map((typology) => {
      // Filter properties by the current typology
      const typologyProperties = filteredPropertyDetails.filter(
        (el) => el["Typology"] === typology
      );

      // Count the occurrences of each En-suite variation
      const cloakRoomCounts = typologyProperties.reduce(
        (acc, property) => {
          const cloakRoomType = property["Cloak room"];
          if (cloakRoomType === "Share") {
            acc.share++;
          } else if (cloakRoomType === "Yes") {
            acc.yes++;
          }
          return acc;
        },
        { share: 0, yes: 0 }
      );

      // Calculate the total number of properties for this typology
      const totalProperties = typologyProperties.length;

      // Calculate the percentages for each ensuite type
      const sharePercentage =
        totalProperties > 0
          ? ((cloakRoomCounts.share / totalProperties) * 100).toFixed(2)
          : 0;
      const yesPercentage =
        totalProperties > 0
          ? ((cloakRoomCounts.yes / totalProperties) * 100).toFixed(2)
          : 0;

      // Return the object in the desired format
      return {
        property: typology,
        Share: sharePercentage,
        ShareColor: "hsl(135, 70%, 50%)", // Assign colors based on your preference
        Yes: yesPercentage,
        YesColor: "hsl(189, 70%, 50%)", // Assign colors based on your preference
      };
    });
  }

  const marketPricePicker =
    filteredPropertyDetails.length === 0
      ? []
      : filteredPropertyDetails.map((a) => {
          let val = a["Market Price"];
          return val;
        });
  const rentalYieldPicker =
    filteredPropertyDetails.length === 0
      ? []
      : filteredPropertyDetails.map((a) => {
          let val = a["Rental Yield"].split("%")[0].trim();
          return parseFloat(val.replace(/,/g, ""));
        });
  const rentValuePicker =
    filteredPropertyDetails.length === 0
      ? []
      : filteredPropertyDetails.map((a) => {
          let val = a["Rent"];
          return val;
        });
  const unitValuePicker =
    filteredPropertyDetails.length === 0
      ? []
      : filteredPropertyDetails.map((a) => {
          let val = a["Unit Price/SqM"];
          return val;
        });

  //dealing with properties
  const propertyUnitPicker =
    filteredPropertyOverview.length === 0
      ? []
      : filteredPropertyOverview.map((a) => {
          let val = a["number_of_units"];
          return val;
        });

  const unitNumberTotal =
    propertyUnitPicker.length === 0
      ? 0
      : propertyUnitPicker.reduce((partialSum, a) => partialSum + a, 0);

  const unitNumberAvg =
    propertyUnitPicker.length === 0
      ? 0
      : Math.round(
          (unitNumberTotal / propertyUnitPicker.length + Number.EPSILON) * 100
        ) / 100;

  const propertyDensityPicker =
    filteredPropertyOverview.length === 0
      ? []
      : filteredPropertyOverview.map((a) => {
          let val = a["Density (units/acre)"];
          return val;
        });

  const propertyDensityTotal =
    propertyDensityPicker.length === 0
      ? 0
      : propertyDensityPicker.reduce((partialSum, a) => partialSum + a, 0);

  const propertyDensityAvg =
    propertyDensityPicker.length === 0
      ? 0
      : Math.round(
          (propertyDensityTotal / propertyDensityPicker.length +
            Number.EPSILON) *
            100
        ) / 100;

  const propertyAcrePicker =
    filteredPropertyOverview.length === 0
      ? []
      : filteredPropertyOverview.map((a) => {
          let val = a["erf (acres)"];
          return val;
        });

  const propertyAcreTotal =
    propertyAcrePicker.length === 0
      ? 0
      : propertyAcrePicker.reduce((partialSum, a) => partialSum + a, 0);

  const propertyAcreAvg =
    propertyAcrePicker.length === 0
      ? 0
      : Math.round(
          (propertyAcreTotal / propertyAcrePicker.length + Number.EPSILON) * 100
        ) / 100;

  const propertySkylinePicker =
    filteredPropertyOverview.length === 0
      ? []
      : filteredPropertyOverview.map((a) => {
          let val = a["Total no. of floors"];
          return val;
        });

  const propertySkylineTotal =
    propertySkylinePicker.length === 0
      ? 0
      : propertySkylinePicker.reduce((partialSum, a) => partialSum + a, 0);

  const propertySkylineAvg =
    propertySkylinePicker.length === 0
      ? 0
      : Math.round(
          (propertySkylineTotal / propertySkylinePicker.length +
            Number.EPSILON) *
            100
        ) / 100;

  //

  const floorAreaPicker =
    filteredPropertyDetails.length === 0
      ? []
      : filteredPropertyDetails.map((a) => {
          let val = a["Floor area (SqM)"];
          return val;
        });

  const floorAreaTotal =
    floorAreaPicker.length === 0
      ? 0
      : floorAreaPicker.reduce((partialSum, a) => partialSum + a, 0);

  const floorAreaAvg =
    floorAreaPicker.length === 0
      ? 0
      : Math.round(
          (floorAreaTotal / floorAreaPicker.length + Number.EPSILON) * 100
        ) / 100;

  //Market size
  const marketSizeTotal =
    filteredMarketValue.length === 0
      ? 0
      : filteredMarketValue
          .map((a) => a["Est. Market Value Q1 2024"])
          .reduce((partialSum, b) => partialSum + b, 0);

  const marketPriceTotal =
    marketPricePicker.length === 0
      ? 0
      : marketPricePicker.reduce((partialSum, a) => partialSum + a, 0);

  const rentValueTotal =
    rentValuePicker.length === 0
      ? 0
      : rentValuePicker.reduce((partialSum, a) => partialSum + a, 0);
  const unitValueTotal =
    unitValuePicker.length === 0
      ? 0
      : unitValuePicker.reduce((partialSum, a) => partialSum + a, 0);

  const rentalYieldTotal =
    rentalYieldPicker.length === 0
      ? 0
      : rentalYieldPicker.reduce((partialSum, a) => partialSum + a, 0);

  const avgMarket =
    marketPricePicker.length === 0
      ? 0
      : Math.round(
          (marketPriceTotal / marketPricePicker.length + Number.EPSILON) * 100
        ) / 100;
  const avgRent =
    rentValuePicker.length === 0
      ? 0
      : Math.round(
          (rentValueTotal / rentValuePicker.length + Number.EPSILON) * 100
        ) / 100;
  const avgRentalYield =
    rentalYieldPicker.length === 0
      ? 0
      : Math.round(
          (rentalYieldTotal / rentalYieldPicker.length + Number.EPSILON) * 100
        ) / 100;
  const avgUnitPriceSqm =
    unitValuePicker.length === 0
      ? 0
      : Math.round(
          (unitValueTotal / unitValuePicker.length + Number.EPSILON) * 100
        ) / 100;

  const medianCal = (arr) => {
    let medSort = [...arr].sort((a, b) => a - b);

    const half = Math.floor(medSort.length / 2);

    return filteredPropertyDetails.length === 0
      ? 0
      : medSort.length % 2
      ? medSort[half]
      : (medSort[half - 1] + medSort[half]) / 2;
  };

  async function onSelectArea() {
    try {
      //
      // console.log(selectedDropDown);
      setSelectedLocationLoading(true);
      setProgress(30);
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

      setTimeout(() => setProgress(60), 1000);

      //try consume the token
      const consumeTokenResult = await consumeToken(session.user.id);
      // console.log("consume token result", consumeTokenResult);

      if (consumeTokenResult.success) {
        if (roads.length > 0) {
          setRoads([]);
        }

        const selectedArea = areaData.filter(
          (areadata) => areadata["area"] === selectedDropDown
        );
        setSelectedLocation(selectedArea);
        //TO DO: PULL AREA SPECIFIC DATA FROM DB HERE
        const { data, error } = await Supabase.from("Property Overview")
          .select("*")
          .eq("Location", selectedArea[0]["area"]);
        if (data) {
          const propertyId = data.map((a) => a["Property ID"]);
          const { data: propertyDataSearched } = await Supabase.from("PropData")
            .select()
            .in("PropertyID", propertyId);
          setLocationOverview(data);
          //set roads from selected location
          const searchedRoads = [...new Set(data.map((item) => item["Road"]))];
          // console.log("Roads", searchedRoads);
          setRoads(searchedRoads);
          if (propertyDataSearched) {
            const typologies = [
              ...new Set(propertyDataSearched.map((item) => item["Typology"])),
            ];

            //STOCK Properties
            const { data: stockProps } = await Supabase.from("Stock Per Year")
              .select()
              .in("propertyID", propertyId);

            if (stockProps) {
              const years = [
                ...new Set(stockProps.map((item) => item["year"])),
              ];
              setStockYear(years);
            }

            //PIPELINE Properties
            const { data: pipelineProperties } = await Supabase.from("Pipeline")
              .select()
              .eq("Location", selectedArea[0]["area"]);

            if (pipelineProperties) {
              setPipelineProperties(pipelineProperties);
            }
            //marketValue
            const { data: marketValueData } = await Supabase.from(
              "Market Value"
            )
              .select()
              .in("Property ID", propertyId);
            if (marketValueData) {
              //
              setMarketValue(marketValueData);
            }

            // console.log("Stock property", stockProps);
            setStockProperties(stockProps);
            setTypology(typologies);
            setPropertyDetails(propertyDataSearched);
            // console.log("Property overview", data);
            // console.log("Property detail", propertyDataSearched);
          }
        }
        if (error) console.log(error);
        setProgress(100);
        setStatus("success");
        setTimeout(() => {
          setIsModalOpen(false);
          openNotification(
            "topRight",
            "Successfully completed search",
            consumeTokenResult.message
          );
          setProgress(0);
          setStatus("active");
        }, 1000);
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
          setSelectedLocationLoading(false);
          setProgress(0);
          setStatus("active");
        }, 1000);
      }
      setSelectedLocationLoading(false);
    } catch (error) {
      setSelectedLocationLoading(false);
      console.log(error);
    }
  }

  function handleSelectedRoad(checkedValues) {
    setSelectedRoad(checkedValues);
  }

  function handleTypologyFilter(checkedValues) {
    setSelectedTypology(checkedValues);
  }

  function handleStockPropertyFilter(checkedValues) {
    setSelectedStockYear(checkedValues);
  }

  //do all filtering once
  function handleFilterArea() {
    try {
      setFilterLoading(true);
      //if road selected do this
      if (selectedRoad.length > 0) {
        const filteredPropertyByRoad = locationOverview.filter((el) =>
          selectedRoad.includes(el["Road"])
        );
        const propertyId = filteredPropertyByRoad.map((a) => a["Property ID"]);
        //filter property details
        setFilteredPropertyDetails(
          propertyDetails.filter(
            (el) =>
              selectedTypology.includes(el["Typology"]) &&
              propertyId.includes(el["PropertyID"])
          )
        );
        const overviewIds = propertyDetails
          .filter(
            (el) =>
              selectedTypology.includes(el["Typology"]) &&
              propertyId.includes(el["PropertyID"])
          )
          .map((a) => a["PropertyID"]);
        //filter property overview
        setFilteredPropertyOverview(
          locationOverview.filter((el) =>
            overviewIds.includes(el["Property ID"])
          )
        );

        //market value
        setFilteredMarketValue(
          marketValue.filter((el) => overviewIds.includes(el["Property ID"]))
        );
      } else {
        //filter property detail
        setFilteredPropertyDetails(
          propertyDetails.filter((el) =>
            selectedTypology.includes(el["Typology"])
          )
        );
        const overviewIds = propertyDetails
          .filter((el) => selectedTypology.includes(el["Typology"]))
          .map((a) => a["PropertyID"]);
        //filter property overview
        setFilteredPropertyOverview(
          locationOverview.filter((el) =>
            overviewIds.includes(el["Property ID"])
          )
        );

        //market value
        setFilteredMarketValue(
          marketValue.filter((el) => overviewIds.includes(el["Property ID"]))
        );
      }
      // console.log("filteredOver", filteredPropertyOverview);
      // console.log("filteredDets", filteredPropertyDetails);
      // handleGRIDataChange()
      setFilterLoading(false);
    } catch (error) {
      setFilterLoading(false);
    }
  }

  function handleFilterStock() {
    try {
      setStockPropertyLoading(true);

      if (selectedStockYear.length > 0) {
        setFilteredStock(
          stockProperties.filter((el) => selectedStockYear.includes(el["year"]))
        );
      } else {
        setFilteredStock([]);
      }

      // console.log("filtered Stock", filteredStock);

      setStockPropertyLoading(false);
    } catch (error) {
      setStockPropertyLoading(false);
      console.log(error);
    }
  }

  const theme = {
    axis: {
      legend: {
        text: {
          fill: "white", // Set color to white for axis labels
        },
      },
      ticks: {
        text: {
          fill: "#f3efe0", // Change color of axis labels
        },
      },
    },
    grid: {
      line: {
        stroke: "rgba(255,255,255,0.1)", // Change color of grid lines
      },
    },
    tooltip: {
      container: {
        background: "#ffffff", // Change color of tooltip background
      },
    },
    legends: {
      text: {
        fill: "#f3efe0", // Change color of legend text
      },
    },
    crosshair: {
      line: {
        stroke: "rgba(255,255,255,0.8)",
        strokeWidth: 1,
        strokeOpacity: 0.35,
      },
    },
  };

  function countUniqueValuesForChart(data, key) {
    const totalCount = data.length;

    const result = data.reduce((accumulator, currentValue) => {
      const value = currentValue[key];
      const existingEntry = accumulator.find((item) => item.label === value);

      if (existingEntry) {
        existingEntry.value++;
      } else {
        accumulator.push({ label: value, value: 1 });
      }

      return accumulator;
    }, []);

    // Convert counts to percentages and sort in descending order
    result.forEach((item) => {
      item.value = Math.round((item.value / totalCount) * 100); // Convert count to percentage
    });

    result.sort((a, b) => a.value - b.value); // Sort in descending order based on percentage

    return result;
  }

  const typologyByBedroomsPieData = [
    {
      id: "Studio",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["Typology "] === "Studio")
          .length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "Studio",
      color: "hsl(202, 70%, 50%)",
    },
    {
      id: "1BR",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["Typology"] === "1BR")
          .length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "1BR",
      color: "hsl(280, 70%, 50%)",
    },
    {
      id: "2BR",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["Typology"] === "2BR")
          .length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "2BR",
      color: "hsl(211, 70%, 50%)",
    },
    {
      id: "3BR",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["Typology"] === "3BR")
          .length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "3BR",
      color: "hsl(65, 70%, 50%)",
    },
    {
      id: "4BR",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["Typology"] === "4BR")
          .length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "4BR",
      color: "hsl(259, 70%, 50%)",
    },
    {
      id: "5BR",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["Typology"] === "5BR")
          .length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "5BR",
      color: "hsl(278, 21%, 28%)",
    },
  ];
  const dsqProvisionPieData = [
    {
      id: "DSQ",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["DSQ"] === "Yes").length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "DSQ",
      color: "hsl(47, 44%, 92%)",
    },
    {
      id: "NoDSQ",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["DSQ"] === "None").length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "NoDSQ",
      color: "hsl(355, 67%, 26%)",
    },
  ];
  const officeProvisionPieData = [
    {
      id: "Office",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["Office/study"] === "Yes")
          .length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "Office/Study",
      color: "hsl(47, 44%, 92%)",
    },
    {
      id: "NoOffice",
      value: Math.round(
        (filteredPropertyDetails.filter((el) => el["Office/study"] === "None")
          .length /
          filteredPropertyDetails.length) *
          100
      ),
      label: "No Office/Study",
      color: "hsl(355, 67%, 26%)",
    },
  ];

  const medianGRISqmLine = [
    {
      id: "Median of GRI/Sqm by Typology",
      color: "#ff3344",
      data: [
        {
          x: "Studio",
          y:
            medianCal(
              filteredPropertyDetails
                .filter((el) => el["Typology"] === "Studio")
                .map((a) => {
                  let val = a["GRI/Sqm"];
                  return val;
                })
            ) || 0,
        },
        {
          x: "1BR",
          y:
            medianCal(
              filteredPropertyDetails
                .filter((el) => el["Typology"] === "1BR")
                .map((a) => {
                  let val = a["GRI/Sqm"];
                  return val;
                })
            ) || 0,
        },
        {
          x: "2BR",
          y:
            medianCal(
              filteredPropertyDetails
                .filter((el) => el["Typology"] === "2BR")
                .map((a) => {
                  let val = a["GRI/Sqm"];
                  return val;
                })
            ) || 0,
        },
        {
          x: "3BR",
          y:
            medianCal(
              filteredPropertyDetails
                .filter((el) => el["Typology"] === "3BR")
                .map((a) => {
                  let val = a["GRI/Sqm"];
                  return val;
                })
            ) || 0,
        },
        {
          x: "4BR",
          y:
            medianCal(
              filteredPropertyDetails
                .filter((el) => el["Typology"] === "4BR")
                .map((a) => {
                  let val = a["GRI/Sqm"];
                  return val;
                })
            ) || 0,
        },
        {
          x: "5BR",
          y:
            medianCal(
              filteredPropertyDetails
                .filter((el) => el["Typology"] === "5BR")
                .map((a) => {
                  let val = a["GRI/Sqm"];
                  return val;
                })
            ) || 0,
        },
      ],
    },
  ];
  function calculateAverageGRI(filteredPropertyDetails, typology) {
    // Filter the data based on the provided typology
    const typologyValues = filteredPropertyDetails
      .filter((el) => el["Typology"] === typology)
      .map((a) => a["GRI/Sqm"]);

    // Calculate the sum of the GRI/Sqm values
    const totalGRI = typologyValues.reduce((sum, val) => sum + val, 0);

    // Calculate and return the average (sum / number of items)
    return typologyValues.length > 0 ? totalGRI / typologyValues.length : 0;
  }
  const averageGRISqmLine = [
    {
      id: "Average GRI/Sqm by Typology",
      color: "#ff3344",
      data: [
        {
          x: "Studio",
          y: calculateAverageGRI(filteredPropertyDetails, "Studio"),
        },
        {
          x: "1BR",
          y: calculateAverageGRI(filteredPropertyDetails, "1BR"),
        },
        {
          x: "2BR",
          y: calculateAverageGRI(filteredPropertyDetails, "2BR"),
        },
        {
          x: "3BR",
          y: calculateAverageGRI(filteredPropertyDetails, "3BR"),
        },
        {
          x: "4BR",
          y: calculateAverageGRI(filteredPropertyDetails, "4BR"),
        },
        {
          x: "5BR",
          y: calculateAverageGRI(filteredPropertyDetails, "5BR"),
        },
      ],
    },
  ];

  const filterOptions = [
    {
      key: "1",
      label: (
        <div>
          <Checkbox.Group
            onChange={handleTypologyFilter}
            options={typology}
            defaultValue={typology}
          />
        </div>
      ),
    },
  ];
  const stockFilterOptions = [
    {
      key: "2",
      label: (
        <div>
          <Checkbox.Group
            onChange={handleStockPropertyFilter}
            options={stockYear.sort((a, b) => a - b)}
            defaultValue={stockYear}
          />
        </div>
      ),
    },
  ];

  // const stockTableColumns = [
  //   {
  //     title: "Property Name",
  //     dataIndex: "propertyName",
  //     key: "propertyName",
  //   },
  //   // {
  //   //   title: "Period Quarter",
  //   //   dataIndex: "period",
  //   //   key: "period",
  //   // },
  //   {
  //     title: "Year",
  //     dataIndex: "year",
  //     key: "year",
  //   },
  // ];

  const handleGRIDataChange = (value) => {
    setSelectedGRIData(value);
  };
  const pipelineTableColumns = [
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
    },
    {
      title: "Road",
      dataIndex: "Road",
      key: "Road",
    },
    {
      title: "No. of Units",
      dataIndex: "No. of Units",
      key: "No. of Units",
    },
    {
      title: "Building Height (Floors)",
      dataIndex: "Height",
      key: "Height",
    },
  ];

  const tabCategories = [
    {
      key: "1",
      label: "Market Profile",
      children: (
        <>
          <div className="flex justify-end mb-8">
            {/* Typology Picker  */}
            <Dropdown
              trigger={["click"]}
              className=""
              menu={{
                items: filterOptions,
              }}
            >
              <Tooltip title="Filter">
                <ButtonAnt
                  style={{
                    backgroundColor: "#08415c",
                  }}
                  loading={selectedLocationLoading}
                  icon={<i className="line-icon-Filter-2 text-[#3EB489]"></i>}
                />
              </Tooltip>
            </Dropdown>

            {/* Road Picker */}
            <Select
              mode="multiple"
              placeholder="Filter area data by road"
              onChange={handleSelectedRoad}
              value={selectedRoad}
              className="ml-8"
              allowClear
              loading={selectedLocationLoading}
              style={{ width: "70%", height: "" }}
              options={roads.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <ButtonAnt
              style={{
                color: "#FFF",

                backgroundColor: "#08415c",
              }}
              onClick={handleFilterArea}
              loading={filterLoading}
              className="ml-8"
            >
              Filter Area Data
            </ButtonAnt>
          </div>

          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Alert
              message="About this view"
              description="These metrics serve as benchmarks, helping you and real estate professionals, gauge the health and trends within the industry. By leveraging industry-specific data, you can identify emerging patterns, assess the competitiveness of different neighborhoods, and respond effectively to changing market conditions, ultimately contributing to more informed and strategic choices in property development and investment."
              type="info"
              className="mb-4 ml-4 mr-4 "
              showIcon
              closable
            />
            <ColAnt className="gutter-row" span={4}>
              <StatisticCard
                title={"No. of Properties"}
                value={filteredPropertyOverview.length}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Average of Market Price"}
                value={`Ksh. ${Math.round(avgMarket).toLocaleString() || 0}`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Est.Average of Rental Yield"}
                value={`${Math.round(avgRentalYield).toLocaleString() || 0} %`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Est. Average of Rent"}
                value={`Ksh. ${Math.round(avgRent).toLocaleString() || 0}`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Average of Unit Price/SqM"}
                value={`Ksh. ${
                  Math.round(avgUnitPriceSqm).toLocaleString() || 0
                }`}
              />
            </ColAnt>
          </RowAnt>

          <RowAnt gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <ColAnt className="gutter-row" span={4}>
              <StatisticCard
                title={"Est. Market Size"}
                value={`Ksh. ${
                  (marketSizeTotal.toString().length > 9
                    ? (marketSizeTotal / 10 ** 9).toFixed(1).toString() + "B"
                    : marketSizeTotal.toString().length > 6
                    ? (marketSizeTotal / 10 ** 6).toFixed(1).toString() + "m"
                    : marketSizeTotal
                  ).toLocaleString() || 0
                }`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Median of Market Price"}
                value={`Ksh. ${
                  Math.round(medianCal(marketPricePicker)).toLocaleString() || 0
                }`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Est. Median of Rental Yield"}
                value={`${
                  Math.round(medianCal(rentalYieldPicker)).toLocaleString() || 0
                } %`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Est. Median of Rent"}
                value={`Ksh. ${
                  Math.round(medianCal(rentValuePicker)).toLocaleString() || 0
                }`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Median of Unit Price/SqM"}
                value={`Ksh. ${
                  Math.round(medianCal(unitValuePicker)).toLocaleString() || 0
                }`}
              />
            </ColAnt>
          </RowAnt>

          <ColAnt className="gutter-row mt-8" span={24}>
            <Select
              defaultValue="median"
              style={{
                width: 120,
              }}
              onChange={handleGRIDataChange}
              options={[
                {
                  value: "median",
                  label: "Median",
                },
                {
                  value: "average",
                  label: "Average",
                },
              ]}
            />
            <div
              className="bg-[#08415c] rounded-lg p-6 mt-1"
              style={{ height: "60vh", width: "100%" }}
            >
              <span className="font-base text-[#f3efe0] text-sm ">
                GRI/Sqm by Typology
              </span>{" "}
              <span>
                <Tooltip
                  className="font-base float-right"
                  title="The line graph illuminates the relationship between Gross Rental Income and floor area, revealing an inverse correlation. This suggests that larger residential plinth areas may not necessarily result in proportionally higher rental income"
                >
                  <ButtonAnt
                    style={{
                      backgroundColor: "#08415c",
                    }}
                    icon={
                      <i className="feather-help-circle text-[#3EB489]"></i>
                    }
                  />
                </Tooltip>
              </span>{" "}
              <ResponsiveLine
                enableArea={true}
                enableGridX={true}
                areaOpacity={0.1}
                colors={["rgb(62, 180, 137)"]}
                data={
                  selectedGRIData === "median"
                    ? medianGRISqmLine
                    : averageGRISqmLine
                }
                theme={theme}
                margin={{ top: 50, right: 140, bottom: 50, left: 120 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: 0,
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Typology",
                  legendOffset: 36,
                  legendPosition: "middle",
                  truncateTickAt: 0,
                }}
                valueFormat={(val) => `${val} Ksh/sqm`}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  format: (value) => `${value} Ksh/sqm`,
                  legendOffset: -40,
                  legendPosition: "middle",
                  truncateTickAt: 0,
                }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </ColAnt>
        </>
      ),
    },
    {
      key: "2",
      label: "Density & Skyline",
      children: (
        <>
          <div className="flex justify-end mb-8">
            {/* Typology Picker  */}
            <Dropdown
              trigger={["click"]}
              className=""
              menu={{
                items: filterOptions,
              }}
            >
              <Tooltip title="Filter">
                <ButtonAnt
                  style={{
                    backgroundColor: "#08415c",
                  }}
                  loading={selectedLocationLoading}
                  icon={<i className="line-icon-Filter-2  text-[#3EB489]"></i>}
                />
              </Tooltip>
            </Dropdown>

            {/* Road Picker */}
            <Select
              mode="multiple"
              placeholder="Filter area data by road"
              onChange={handleSelectedRoad}
              value={selectedRoad}
              className="ml-8"
              allowClear
              loading={selectedLocationLoading}
              style={{ width: "70%", height: "" }}
              options={roads.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <ButtonAnt
              style={{
                color: "#FFF",

                backgroundColor: "#08415c",
              }}
              onClick={handleFilterArea}
              loading={filterLoading}
              className="ml-8"
            >
              Filter Area Data
            </ButtonAnt>
          </div>
          <Alert
            message="About this view"
            description="Geometric data plays a crucial role in property analysis, especially when assessing key summary statistics such as averages, minimum and maximum values of the number of units, development density, acreage, and skyline of a specific area. These metrics provide essential insights into the spatial characteristics and scale of development within the analysed area. Averages offer a central tendency measure, giving an idea of the typical values, while minimum and maximum values highlight the range and extremes, showcasing the diversity of property features. Development density and acreage metrics contribute to understanding the concentration of properties in a given space. "
            type="info"
            className="mb-4 ml-4 mr-4 "
            showIcon
            closable
          />

          <Divider orientation="center">Units Analysis</Divider>

          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Average No. of Units"}
                value={Math.round(unitNumberAvg).toLocaleString() || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Minimum No. of units in a development"}
                value={
                  propertyUnitPicker.length === 0
                    ? 0
                    : Math.min(...propertyUnitPicker)
                }
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Maximum No. of units in a development"}
                value={
                  propertyUnitPicker.length === 0
                    ? 0
                    : Math.max(...propertyUnitPicker)
                }
              />
            </ColAnt>
          </RowAnt>
          <Divider orientation="center">Development Density Analysis</Divider>
          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Average of Density (units/acre)"}
                value={Math.round(propertyDensityAvg).toLocaleString() || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Min of Density (units/acre)"}
                value={
                  propertyDensityPicker.length === 0
                    ? 0
                    : Math.min(...propertyDensityPicker)
                }
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Max of Density (units/acre)"}
                value={
                  propertyDensityPicker.length === 0
                    ? 0
                    : Math.max(...propertyDensityPicker)
                }
              />
            </ColAnt>
          </RowAnt>
          <Divider orientation="center">Acreage Analysis</Divider>
          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Average of erf (acres)"}
                value={propertyAcreAvg || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Min of erf (acres)"}
                value={
                  propertyAcrePicker.length === 0
                    ? 0
                    : Math.min(...propertyAcrePicker)
                }
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Max of erf (acres)"}
                value={
                  propertyAcrePicker.length === 0
                    ? 0
                    : Math.max(...propertyAcrePicker)
                }
              />
            </ColAnt>
          </RowAnt>
          <Divider orientation="center">Skyline Analysis</Divider>
          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Average of Total No. of floors"}
                value={Math.round(propertySkylineAvg).toLocaleString() || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Min of Total No. of floors"}
                value={
                  propertySkylinePicker.length === 0
                    ? 0
                    : Math.min(...propertySkylinePicker)
                }
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Max of Total No. of floors"}
                value={
                  propertySkylinePicker.length === 0
                    ? 0
                    : Math.max(...propertySkylinePicker)
                }
              />
            </ColAnt>
          </RowAnt>
        </>
      ),
    },
    {
      key: "3",
      label: "Typology & Plinth",
      children: (
        <>
          <div className="flex justify-end mb-8">
            {/* Typology Picker  */}
            <Dropdown
              trigger={["click"]}
              className=""
              menu={{
                items: filterOptions,
              }}
            >
              <Tooltip title="Filter">
                <ButtonAnt
                  style={{
                    backgroundColor: "#08415c",
                  }}
                  // className="bg-[#08415c]"
                  loading={selectedLocationLoading}
                  icon={<i className="line-icon-Filter-2 text-[#3EB489]"></i>}
                />
              </Tooltip>
            </Dropdown>

            {/* Road Picker */}
            <Select
              mode="multiple"
              placeholder="Filter area data by road"
              onChange={handleSelectedRoad}
              value={selectedRoad}
              className="ml-8"
              allowClear
              loading={selectedLocationLoading}
              style={{ width: "70%", height: "" }}
              options={roads.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <ButtonAnt
              style={{
                color: "#FFF",

                backgroundColor: "#08415c",
              }}
              onClick={handleFilterArea}
              loading={filterLoading}
              className="ml-8"
            >
              Filter Area Data
            </ButtonAnt>
          </div>

          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Alert
              message="About this view"
              description="Geometric data focusing on floor areas (plinth), enhances property analysis by offering a comprehensive view of size dynamics in the real estate market. The average and median floor area offers a central tendency measure, giving an understanding of the typical size of properties, while the range between minimum and maximum values highlights the variation in property sizes.  "
              type="info"
              className="mb-4 ml-4 mr-4 "
              showIcon
              closable
            />
            <ColAnt className="gutter-row" span={4}>
              <StatisticCard
                title={"No. of Properties"}
                value={filteredPropertyOverview.length}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Average Floor area (SqM)"}
                value={floorAreaAvg.toLocaleString() || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Median Floor area (SqM)"}
                value={medianCal(floorAreaPicker).toLocaleString() || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Min Floor area (SqM)"}
                value={
                  floorAreaPicker.length === 0
                    ? 0
                    : Math.min(...floorAreaPicker) || 0
                }
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Max Floor area (SqM)"}
                value={
                  floorAreaPicker.length === 0
                    ? 0
                    : Math.max(...floorAreaPicker) || 0
                }
              />
            </ColAnt>
          </RowAnt>

          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <ColAnt className="gutter-row h-auto" span={14}>
              {/* Pie chart typology by bedrooms */}
              <div
                className="bg-[#08415c] rounded-lg p-3 "
                style={{ height: "35vh" }}
              >
                <span className="font-base text-[#f3efe0] text-sm ">
                  Ensuite Property Analysis (%)
                </span>{" "}
                <span>
                  <Tooltip
                    className="font-base float-right"
                    title="The bar graph provides a visual analysis of the distribution of ensuite properties across various bedroom configurations, offering key insights into the prevalence of ensuite amenities for different housing"
                  >
                    <ButtonAnt
                      style={{
                        backgroundColor: "#08415c",
                      }}
                      icon={
                        <i className="feather-help-circle text-[#3EB489]"></i>
                      }
                    />
                  </Tooltip>
                </span>{" "}
                <ResponsiveBar
                  data={generateEnsuiteBarChartData(filteredPropertyDetails, [
                    "Studio",
                    "1BR",
                    "2BR",
                    "3BR",
                    "4BR",
                    "5BR",
                  ])}
                  theme={theme}
                  valueFormat={(val) => `${val} %`}
                  keys={["all", "master", "standard", "two", "three"]}
                  indexBy="property"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={{ scheme: "nivo" }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "#38bcb2",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "#eed312",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Typology",
                    legendPosition: "middle",
                    legendOffset: 32,
                    truncateTickAt: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "% Ensuite Property",
                    legendPosition: "middle",
                    legendOffset: -40,
                    truncateTickAt: 0,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                  role="application"
                  ariaLabel="Nivo bar chart demo"
                  barAriaLabel={(e) =>
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                  }
                />
              </div>
            </ColAnt>
            <ColAnt className="gutter-row h-auto" span={10}>
              {/* Pie chart typology by bedrooms */}
              <div
                className="bg-[#08415c] rounded-lg p-3 "
                style={{ height: "35vh" }}
              >
                <span className="font-base text-[#f3efe0] text-sm ">
                  DSQ Analysis (%)
                </span>{" "}
                <span>
                  <Tooltip
                    className="font-base float-right"
                    title="The pie chart provides a visual representation of the distribution of different housing typologies and the provision of DSQ within the market and enhances intuitive understanding of the market composition"
                  >
                    <ButtonAnt
                      style={{
                        backgroundColor: "#08415c",
                      }}
                      icon={
                        <i className="feather-help-circle text-[#3EB489]"></i>
                      }
                    />
                  </Tooltip>
                </span>{" "}
                <ResponsivePie
                  data={dsqProvisionPieData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={["rgb(255, 255, 255)", "rgb(62, 180, 137)"]}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  valueFormat={(val) => `${val} %`}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#FFF"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  fill={[
                    {
                      match: {
                        id: "Studio",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "1BR",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "2BR",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "3BR",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "4BR",
                      },
                      id: "lines",
                    },
                    {
                      match: {
                        id: "5BR",
                      },
                      id: "lines",
                    },
                  ]}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      justify: false,
                      translateX: 0,
                      translateY: 56,
                      itemsSpacing: 0,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: "#FFF",
                      itemDirection: "left-to-right",
                      itemOpacity: 1,
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </ColAnt>
          </RowAnt>
          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <ColAnt className="gutter-row h-auto" span={14}>
              {/* Pie chart typology by bedrooms */}
              <div
                className="bg-[#08415c] rounded-lg p-3 "
                style={{ height: "35vh" }}
              >
                <span className="font-base text-[#f3efe0] text-sm ">
                  Cloakroom Property Analysis (%)
                </span>{" "}
                <span>
                  <Tooltip
                    className="font-base float-right"
                    title="The bar graph illustrates the distribution of cloakrooms across different property configurations, providing a clear visual representation of how this feature is allocated within various unit types, such as studio apartments, one-bedroom, two-bedroom, and larger properties."
                  >
                    <ButtonAnt
                      style={{
                        backgroundColor: "#08415c",
                      }}
                      icon={
                        <i className="feather-help-circle text-[#3EB489]"></i>
                      }
                    />
                  </Tooltip>
                </span>{" "}
                <ResponsiveBar
                  data={generateCloakRoomBarChartData(filteredPropertyDetails, [
                    "Studio",
                    "1BR",
                    "2BR",
                    "3BR",
                    "4BR",
                    "5BR",
                  ])}
                  theme={theme}
                  valueFormat={(val) => `${val} %`}
                  keys={["Share", "Yes"]}
                  indexBy="property"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={["rgb(62, 180, 137)", "rgb(255, 255, 255)"]}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "#38bcb2",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "#eed312",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Typology",
                    legendPosition: "middle",
                    legendOffset: 32,
                    truncateTickAt: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "% Ensuite Property",
                    legendPosition: "middle",
                    legendOffset: -40,
                    truncateTickAt: 0,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </ColAnt>
            <ColAnt className="gutter-row h-auto" span={10}>
              {/* Pie chart typology by bedrooms */}
              <div
                className="bg-[#08415c] rounded-lg p-3 "
                style={{ height: "35vh" }}
              >
                <span className="font-base text-[#f3efe0] text-sm ">
                  Property Provision of Office/Study (%)
                </span>{" "}
                <span>
                  <Tooltip
                    className="font-base float-right"
                    title="The pie chart illustrates the distribution of home office and study rooms among the available properties in the market, providing valuable insights into the prevalence of work-from-home and study-friendly spaces in residential offerings. This analysis highlights the growing demand for functional home environments that cater to professional and academic needs."
                  >
                    <ButtonAnt
                      style={{
                        backgroundColor: "#08415c",
                      }}
                      icon={
                        <i className="feather-help-circle text-[#3EB489]"></i>
                      }
                    />
                  </Tooltip>
                </span>{" "}
                <ResponsivePie
                  data={officeProvisionPieData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={["rgb(255, 255, 255)", "rgb(62, 180, 137)"]}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  valueFormat={(val) => `${val} %`}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#FFF"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  fill={[
                    {
                      match: {
                        id: "Studio",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "1BR",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "2BR",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "3BR",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "4BR",
                      },
                      id: "lines",
                    },
                    {
                      match: {
                        id: "5BR",
                      },
                      id: "lines",
                    },
                  ]}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      justify: false,
                      translateX: 0,
                      translateY: 56,
                      itemsSpacing: 0,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: "#FFF",
                      itemDirection: "left-to-right",
                      itemOpacity: 1,
                      symbolSize: 18,
                      symbolShape: "circle",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemTextColor: "#000",
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </ColAnt>
          </RowAnt>
          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <ColAnt className="gutter-row" span={24}>
              <div
                className="bg-[#08415c] rounded-lg p-6 "
                style={{ height: "50vh", width: "100%" }}
              >
                <span className="font-base text-[#f3efe0] text-sm ">
                  Typology Per Development (%)
                </span>{" "}
                <span>
                  <Tooltip
                    className="font-base float-right"
                    title="The bar graph illustrates the distribution of housing typologies within each property, highlighting the predominant housing type as an indicator of prevailing market trends and buyer preferences. "
                  >
                    <ButtonAnt
                      style={{
                        backgroundColor: "#08415c",
                      }}
                      icon={
                        <i className="feather-help-circle text-[#3EB489]"></i>
                      }
                    />
                  </Tooltip>
                </span>{" "}
                <ResponsiveBar
                  keys={["value"]}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    // tickRotation: -45,
                    legend: "Percentage Grand Total Count of Properties", // Label for x-axis
                    legendPosition: "middle",
                    legendOffset: 36,
                    legendTextColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  valueFormat={(val) => `${val} %`}
                  axisLeft={{
                    value: (value) => <text fill="white">{value}</text>,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Typology configuration", // Label for y-axis
                    legendPosition: "middle",
                    legendOffset: -110,
                    legendTextColor: "#f3efe0",
                    color: "hsl(47, 44%, 92%)",
                  }}
                  theme={theme}
                  colors={"#3eb489"}
                  // colors={{ scheme: "nivo"}}
                  labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                  }}
                  indexBy="label"
                  margin={{ top: 30, right: 10, bottom: 50, left: 120 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  layout="horizontal"
                  data={countUniqueValuesForChart(
                    filteredPropertyOverview,
                    "Typology "
                  )}
                />
              </div>
            </ColAnt>
          </RowAnt>
        </>
      ),
    },
    {
      key: "4",
      label: "Stock Growth",
      children: (
        <>
          <div className="flex justify-between mb-8">
            {/* Year Picker  */}
            {/* <span className=" text-base font-medium ">
              Number of Properties: {filteredStock.length}
            </span> */}
            <div>
              <Dropdown
                trigger={["click"]}
                className=""
                menu={{
                  items: stockFilterOptions,
                }}
              >
                <Tooltip title="Filter">
                  <ButtonAnt
                    loading={selectedLocationLoading}
                    icon={<i className="line-icon-Filter-2"></i>}
                  />
                </Tooltip>
              </Dropdown>
              <ButtonAnt
                style={{ color: "#08415c" }}
                onClick={handleFilterStock}
                loading={stockPropertyLoading}
                className="ml-8"
              >
                Check Properties Per Year
              </ButtonAnt>
            </div>
          </div>
          <div className="mt-4 ">
            <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Alert
                message="About this view"
                description="This illustrates the quantity of new properties and total number of units introduced to the property market in a particular year, acting as an indicator of the real estate market's performance. A rise in housing stock is regarded favourably, signifying a positive response to market demand."
                type="info"
                className="mb-4 ml-4 mr-4 "
                showIcon
                closable
              />
              <ColAnt className="gutter-row" span={12}>
                <StatisticCard
                  title={"Number of Properties "}
                  value={filteredStock.length}
                />
              </ColAnt>
              <ColAnt className="gutter-row" span={12}>
                <StatisticCard
                  title={"No. of Units"}
                  value={filteredPropertyOverview
                    .filter((prop) => {
                      if (
                        filteredStock
                          .map((a) => a["propertyID"])
                          .includes(prop["Property ID"])
                      ) {
                        return prop;
                      } else {
                        return null;
                      }
                    })
                    .map((a) => a["number_of_units"])
                    .reduce((a, b) => a + b, 0)}
                />
              </ColAnt>
            </RowAnt>

            {/* <Table columns={stockTableColumns} dataSource={filteredStock} /> */}
          </div>
        </>
      ),
    },
    {
      key: "5",
      label: "Pipeline",
      children: (
        <>
          <Alert
            message="About this view"
            description="The visual displays the count of properties and total units we are tracking and are still pending entry into the market. These development proposals are currently in either the statutory permitting stage or the conceptual stages."
            type="info"
            className="mb-4 ml-4 mr-4 "
            showIcon
            closable
          />
          <div className="flex justify-between mb-8">
            {/* Year Picker  */}
            <div>
              <span className="text-base font-medium mr-24">
                Number of Properties in Pipeline: {pipelineProperties.length}
              </span>
            </div>

            <div>
              <span className=" text-base font-medium ">
                Number of Units in Pipeline:{" "}
                {pipelineProperties
                  .map((a) => a["No. of Units"])
                  .reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </div>
          <div className="mt-4 ">
            <Table
              columns={pipelineTableColumns}
              dataSource={pipelineProperties}
            />
          </div>
        </>
      ),
    },
  ];

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GlobalHeader theme="light" />
      <section className="m-4">
        <div className="">
          {/* Section Start */}
          <section
            className="h-[600px] bg-no-repeat bg-cover overflow-hidden relative bg-center items-center py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] lg:h-[400px] flex"
            style={{
              // backgroundImage: "url(",
              backgroundColor: "#08415c",
            }}
          >
            <Container>
              <Row className="items-center justify-center">
                <Col
                  lg={4}
                  sm={5}
                  className="col-9 text-center xs:mb-[10px] xs:flex xs:justify-center"
                >
                  <span className="mb-[10px] text-left text-sm text-[#f3efe0] uppercase block md:mb-[10px]">
                    Discover Nairobi
                  </span>
                  <h6 className="w-[85%] lg:w-[80%] text-left tracking-[-1px] text-[#3EB489] font-serif mb-0 xs:w-full">
                    Unveiling Insights Through Data Analysis
                  </h6>
                  {/* <img height="" width="" className="mx-auto" src="https://images.pexels.com/photos/12851371/pexels-photo-12851371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
                </Col>
                <Col lg={8} sm={7} className="col-10 sm:p-0">
                  <div className="relative text-right sm:text-end xs:text-center sm:mx-[15px]">
                    <div className="h-[1px] w-[90%] right-0 top-[20px] z-0 bg-[#3EB489] block absolute sm:block sm:w-full sm:top-[25px] xs:hidden xs:w-[95%] xs:right-[15px]"></div>
                    <Select
                      onChange={showModal}
                      bordered={false}
                      size={"large"}
                      placeholder="Please select area location"
                      className=" bg-[#3EB489] leading-[20px] text-white text-xmd relative inline-block text-center sm:py-[15px] sm:px-[25px]"
                      options={locationSelectionOptions}
                    />

                    {/* <Link
                  to="#"
                  className="px-[35px] py-[20px] bg-[#986248] leading-[20px] text-white text-xmd relative inline-block text-right sm:py-[15px] sm:px-[25px]"
                >
                  www.sixthsense.com
                </Link> */}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          {/* Section End */}

          {/* Section Start */}
          {selectedLocation.length === 0 ? (
            <Result
              icon={
                <img
                  className="h-64 ml-auto mr-auto"
                  src={SearchAreaImage}
                  alt="Select area to get results"
                />
              }
              title="Select area to get area data results"
              subTitle="1 search = 1 token."
            />
          ) : (
            <>
              <section>
                <Container fluid className="px-[30px] xs:px-[15px] mt-8">
                  <Row>
                    <div
                      className="col-12 col-xl-8 col-lg-7 flex md:mb-[30px] xs:mb-[15px]"
                      {...{ transition: { delay: 0.2 } }}
                    >
                      <div
                        className="cover-background w-full md:h-[450px]"
                        style={{
                          backgroundImage:
                            selectedLocation[0]["area"] === "Nairobi Kileleshwa"
                              ? `url(${Kileimg})`
                              : selectedLocation[0]["area"] ===
                                "Nairobi Kilimani"
                              ? `url(${KilimaniImg})`
                              : selectedLocation[0]["area"] ===
                                "Nairobi Westlands"
                              ? `url(${WestieImg})`
                              : selectedLocation[0]["area"] ===
                                "Nairobi Riverside"
                              ? `url(${RiverImg})`
                              : selectedLocation[0]["area"] ===
                                "Nairobi Lavington"
                              ? `url(${LaviImg})`
                              : `url(https://via.placeholder.com/1300x850)`,
                        }}
                      ></div>
                    </div>
                    <div
                      className="col-12 col-xl-4 col-lg-5"
                      {...{ transition: { delay: 0.4 } }}
                    >
                      <div className="p-[7.5rem] xl:p-16 md:p-24 xs:py-24 xs:px-[30px] bg-[#08415c]">
                        <Swiper
                          ref={swiperRef}
                          className="black-move mb-[50px] xs:mb-[30px]"
                          loop={true}
                          modules={[Autoplay, Keyboard]}
                          keyboard={{ enabled: true, onlyInViewport: true }}
                          autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                          }}
                        >
                          {Object.keys(selectedLocation[0]).map((key) => {
                            return (
                              <div key={key}>
                                <SwiperSlide key={key}>
                                  <Row>
                                    <Col>
                                      <span className="text-[#3EB489] block mb-[25px] uppercase font-serif font-medium">
                                        Area Data
                                      </span>
                                      <h6 className="font-serif font-medium text-[#f3efe0] w-[92%] xs:full">
                                        {key.toUpperCase()}
                                      </h6>
                                      <p className="text-[#f3efe0] opacity-60">
                                        {truncateText(
                                          selectedLocation[0][key],
                                          180
                                        )}
                                      </p>
                                      <Button
                                        onClick={showDrawer}
                                        className="mt-3"
                                      >
                                        <p className="text-[#f3efe0] font-base ">
                                          Read more
                                        </p>
                                      </Button>
                                    </Col>
                                  </Row>
                                </SwiperSlide>
                              </div>
                            );
                          })}
                        </Swiper>
                        <div className="flex">
                          <div
                            onClick={() => swiperRef.current.swiper.slidePrev()}
                            className="btn-slider-next rounded-full flex justify-center items-center text-black bg-white right-inherit left-[65px] h-[40px] w-[40px] cursor-pointer"
                          >
                            <button className="text-xmd">
                              <i className="feather-arrow-left"></i>
                            </button>
                          </div>
                          <div
                            onClick={() => swiperRef.current.swiper.slideNext()}
                            className="btn-slider-prev rounded-full flex justify-center items-center text-black bg-white right-inherit h-[40px] w-[40px] ml-[10px] cursor-pointer"
                          >
                            <button className="text-xmd">
                              <i className="feather-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Container>
              </section>

              {/* Section End */}

              {/* Drawer */}
              <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
              >
                {selectedLocation.length !== 0 &&
                  Object.keys(selectedLocation[0]).map((key) => {
                    return (
                      <>
                        <p className="text-[#08415c] uppercase font-serif font-medium">
                          {key}
                        </p>
                        <RowAnt>
                          <ColAnt span={24}>
                            <span>{selectedLocation[0][key]}</span>
                          </ColAnt>
                        </RowAnt>
                        <Divider />
                      </>
                    );
                  })}
              </Drawer>
              {/* Section Start */}
              <section className="pt-[130px] lg:pt-[90px] md:pt-[75px] sm:pt-[50px]">
                <Container>
                  <Row className="justify-center">
                    <Col
                      xl={6}
                      lg={7}
                      sm={8}
                      className="mb-28 text-center px-[15px] md:mb-20"
                    >
                      <span className="mb-[15px] font-serif font-medium text-[#3EB489] text-md uppercase block">
                        Insights at Your Fingertips
                      </span>
                      <h6 className="tracking-[-1px] text-[#08415c] font-serif mb-0">
                        Dive into the heart of Nairobi with our interactive
                        charts, providing a deeper understanding of its diverse
                        regions.
                      </h6>
                    </Col>
                  </Row>

                  <Tabs
                    color="#08415c"
                    defaultActiveKey="1"
                    centered
                    items={tabCategories}
                  />
                </Container>
              </section>
              {/* Section End */}
            </>
          )}
        </div>
      </section>
      <Modal
        title={
          selectedLocationLoading ||
          status === "exception" ||
          status === "success" ? (
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
        onOk={onSelectArea}
        onCancel={handleCancel}
        okText="Continue"
        okType="primary"
        cancelText="Cancel"
        cancelButtonProps={{
          disabled: selectedLocationLoading,
        }}
        okButtonProps={{
          className: "text-white bg-black",
          loading:
            selectedLocationLoading ||
            status === "exception" ||
            status === "success",
        }}
      >
        {selectedLocationLoading ||
        status === "exception" ||
        status === "success" ? (
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

export default Area;
