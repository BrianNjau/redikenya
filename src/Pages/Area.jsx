import React, { useEffect, useState } from "react";
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
} from "antd";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Link } from "react-router-dom";
import { areaData } from "../Data/AreaDataText";
import Kileimg from "../Assets/img/kileleshwa.jpg";
import KilimaniImg from "../Assets/img/kilimani.jpg";
import WestieImg from "../Assets/img/aboutImg.jpg";
import { Supabase } from "../Functions/SupabaseClient";
import StatisticCard from "../Components/StatisticCard";
import { ResponsivePie } from "@nivo/pie";
import { Bar, ResponsiveBar } from "@nivo/bar";

const Area = () => {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedLocationLoading, setSelectedLocationLoading] = useState(false);
  const [locationOverview, setLocationOverview] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [filteredPropertyDetails, setFilteredPropertyDetails] = useState([]);
  const [filteredPropertyOverview, setFilteredPropertyOverview] = useState([]);
  const [roads, setRoads] = useState([]);
  const [typology, setTypology] = useState([]);
  const [selectedRoad, setSelectedRoad] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedTypology, setSelectedTypology] = useState([]);
  const swiperRef = React.useRef(null);
  // const swiperRef2 = React.useRef(null);
  // const [activeSlide, setActiveSlide] = useState(0);
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
      console.log("road refresh ");
    }
    // if(filteredPropertyDetails.length===0&&)
    setFilteredPropertyDetails(propertyDetails);
    setFilteredPropertyOverview(locationOverview);
    setSelectedTypology(typology);
  }, [roads, propertyDetails, typology, locationOverview]);

  const marketPricePicker =
    filteredPropertyDetails.length === 0
      ? []
      : filteredPropertyDetails.map((a) => {
          let val = a["Market Price"].split(" ")[1].trim();
          return parseFloat(val.replace(/,/g, ""));
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
          let val = a["Rent"].trim();
          return parseFloat(val.replace(/,/g, ""));
        });
  const unitValuePicker =
    filteredPropertyDetails.length === 0
      ? []
      : filteredPropertyDetails.map((a) => {
          let val = a["Unit Price/SqM"].split(" ")[1].trim();
          return parseFloat(val.replace(/,/g, ""));
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

  async function onSelectArea(e) {
    try {
      if (roads.length > 0) {
        setRoads([]);
      }
      setSelectedLocationLoading(true);
      const selectedArea = areaData.filter(
        (areadata) => areadata["area"] === e
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
            ...new Set(propertyDataSearched.map((item) => item["Typology "])),
          ];
          // console.log(typologies);
          setTypology(typologies);
          setPropertyDetails(propertyDataSearched);
          console.log("Property overview", data);
          console.log("Property detail", propertyDataSearched);
        }
      }
      if (error) console.log(error);
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
              selectedTypology.includes(el["Typology "]) &&
              propertyId.includes(el["PropertyID"])
          )
        );
        const overviewIds = propertyDetails
          .filter(
            (el) =>
              selectedTypology.includes(el["Typology "]) &&
              propertyId.includes(el["PropertyID"])
          )
          .map((a) => a["PropertyID"]);
        //filter property overview
        setFilteredPropertyOverview(
          locationOverview.filter((el) =>
            overviewIds.includes(el["Property ID"])
          )
        );
      } else {
        //filter property detail
        setFilteredPropertyDetails(
          propertyDetails.filter((el) =>
            selectedTypology.includes(el["Typology "])
          )
        );
        const overviewIds = propertyDetails
          .filter((el) => selectedTypology.includes(el["Typology "]))
          .map((a) => a["PropertyID"]);
        //filter property overview
        setFilteredPropertyOverview(
          locationOverview.filter((el) =>
            overviewIds.includes(el["Property ID"])
          )
        );
      }
      // console.log("filteredOver", filteredPropertyOverview);
      console.log("filteredDets", filteredPropertyDetails);
      setFilterLoading(false);
    } catch (error) {
      setFilterLoading(false);
    }
  }

  //

  // handle chart options
  // const marketProfileChartSeries =  [
  //   {
  //     name: 'Average Market Price',
  //     //
  //     // [2423232,100033]
  //     data: filteredPropertyDetails.map((a)=> a["Ty"])
  //   },
  //   {
  //     name: 'Median of Market Price',
  //     data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
  //       min: 10,
  //       max: 20
  //     })
  //   },
  //   {
  //     name: 'Average of Rental Yield',
  //     data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
  //       min: 10,
  //       max: 15
  //     })
  //   },
  //   {
  //     name: 'Median of Rental Yield',
  //     data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
  //       min: 10,
  //       max: 15
  //     })
  //   }
  // ];
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
        stroke: "#f3efe0", // Change color of grid lines
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
  };

  function countUniqueValuesForChart(data, key) {
    return data.reduce((accumulator, currentValue) => {
      const value = currentValue[key];
      const existingEntry = accumulator.find((item) => item.label === value);

      if (existingEntry) {
        existingEntry.value++;
      } else {
        accumulator.push({ label: value, value: 1 });
      }

      return accumulator;
    }, []);
  }

  const typologyByBedroomsPieData = [
    {
      id: "Studio",
      value: filteredPropertyDetails.filter(
        (el) => el["Typology "] === "Studio"
      ).length,
      label: "Studio",
      color: "hsl(202, 70%, 50%)",
    },
    {
      id: "1BR",
      value: filteredPropertyDetails.filter((el) => el["Typology "] === "1BR")
        .length,
      label: "1BR",
      color: "hsl(280, 70%, 50%)",
    },
    {
      id: "2BR",
      value: filteredPropertyDetails.filter((el) => el["Typology "] === "2BR")
        .length,
      label: "2BR",
      color: "hsl(211, 70%, 50%)",
    },
    {
      id: "3BR",
      value: filteredPropertyDetails.filter((el) => el["Typology "] === "3BR")
        .length,
      label: "3BR",
      color: "hsl(65, 70%, 50%)",
    },
    {
      id: "4BR",
      value: filteredPropertyDetails.filter((el) => el["Typology "] === "4BR")
        .length,
      label: "4BR",
      color: "hsl(259, 70%, 50%)",
    },
    {
      id: "5BR",
      value: filteredPropertyDetails.filter((el) => el["Typology "] === "5BR")
        .length,
      label: "5BR",
      color: "hsl(278, 21%, 28%)",
    },
  ];
  const dsqProvisionPieData = [
    {
      id: "DSQ",
      value: filteredPropertyDetails.filter((el) => el["DSQ"] === "Yes").length,
      label: "DSQ",
      color: "hsl(47, 44%, 92%)",
    },
    {
      id: "NoDSQ",
      value: filteredPropertyDetails.filter((el) => el["DSQ"] === "None")
        .length,
      label: "NoDSQ",
      color: "hsl(355, 67%, 26%)",
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
                  loading={selectedLocationLoading}
                  icon={<i className="line-icon-Filter-2"></i>}
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
              style={{ color: "#08415c" }}
              onClick={handleFilterArea}
              loading={filterLoading}
              className="ml-8"
            >
              Filter Area Data
            </ButtonAnt>
          </div>

          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                title={"Average of Rental Yield"}
                value={`${Math.round(avgRentalYield).toLocaleString() || 0} %`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Average of Rent"}
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
                  (marketPriceTotal.toString().length > 9
                    ? (marketPriceTotal / 10 ** 9).toFixed(1).toString() + "B"
                    : marketPriceTotal.toString().length > 6
                    ? (marketPriceTotal / 10 ** 6).toFixed(1).toString() + "m"
                    : marketPriceTotal
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
                title={"Median of Rental Yield"}
                value={`${
                  Math.round(medianCal(rentalYieldPicker)).toLocaleString() || 0
                } %`}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Median of Rent"}
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
                  loading={selectedLocationLoading}
                  icon={<i className="line-icon-Filter-2"></i>}
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
              style={{ color: "#08415c" }}
              onClick={handleFilterArea}
              loading={filterLoading}
              className="ml-8"
            >
              Filter Area Data
            </ButtonAnt>
          </div>

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
                value={Math.min(...propertyUnitPicker) || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Maximum No. of units in a development"}
                value={Math.max(...propertyUnitPicker) || 0}
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
                value={Math.min(...propertyDensityPicker) || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Max of Density (units/acre)"}
                value={Math.max(...propertyDensityPicker) || 0}
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
                value={Math.min(...propertyAcrePicker) || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Max of erf (acres)"}
                value={Math.max(...propertyAcrePicker) || 0}
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
                value={Math.min(...propertySkylinePicker) || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={8}>
              <StatisticCard
                title={"Max of Total No. of floors"}
                value={Math.max(...propertySkylinePicker) || 0}
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
                  loading={selectedLocationLoading}
                  icon={<i className="line-icon-Filter-2"></i>}
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
              style={{ color: "#08415c" }}
              onClick={handleFilterArea}
              loading={filterLoading}
              className="ml-8"
            >
              Filter Area Data
            </ButtonAnt>
          </div>

          <RowAnt className="mb-4" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                value={Math.min(...floorAreaPicker) || 0}
              />
            </ColAnt>
            <ColAnt className="gutter-row" span={5}>
              <StatisticCard
                title={"Max Floor area (SqM)"}
                value={Math.max(...floorAreaPicker) || 0}
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
                  Typology Analysis (Units)
                </span>{" "}
                <ResponsivePie
                  data={typologyByBedroomsPieData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
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
                        id: "DSQ",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "NoDSQ",
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
            <ColAnt className="gutter-row h-auto" span={10}>
              {/* Pie chart typology by bedrooms */}
              <div
                className="bg-[#08415c] rounded-lg p-3 "
                style={{ height: "35vh" }}
              >
                <span className="font-base text-[#f3efe0] text-sm ">
                  DSQ Analysis (Units)
                </span>{" "}
                <ResponsivePie
                  data={dsqProvisionPieData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
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
                  Typology Per Devepment (Per Property)
                </span>{" "}
                <ResponsiveBar
                  keys={["value"]}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    // tickRotation: -45,
                    legend: "Grand Total Number of Properties", // Label for x-axis
                    legendPosition: "middle",
                    legendOffset: 36,
                    legendTextColor: "rgba(255, 255, 255, 0.3)",
                  }}
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
                  colors={{ scheme: "accent" }}
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
      children: "Content of Typology & Plinth",
    },
    {
      key: "5",
      label: "Pipeline",
      children: "Content of Typology & Plinth",
    },
  ];

  // console.log("Selected location", selectedLocation);

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
                    Discover Kenya
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
                      onChange={onSelectArea}
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
              status="404"
              title="Kindly select area to get area data results"
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
                        {/* <p className="site-description-item-profile-p uppercase font-serif font-medium"
style={{
marginBottom: 24,
}}
>
{selectedLocation[0]["area"]}
</p> */}
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
                      <span className="mb-[15px] font-serif font-medium text-[#08415c] text-md uppercase block">
                        Insights at Your Fingertips
                      </span>
                      <h6 className="tracking-[-1px] text-darkgray font-serif mb-0">
                        Dive into the heart of Kenya with our interactive
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
    </div>
  );
};

export default Area;
