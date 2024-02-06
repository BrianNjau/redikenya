import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Button, Checkbox, Dropdown, Select, Row as RowAnt, Col as ColAnt,  ConfigProvider,  Tooltip as ToolTipANT, Modal, Statistic,  notification } from 'antd'
import {useLocation, useNavigate } from 'react-router-dom'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from 'react'
import "./search.css"
import { useContext } from 'react'
import GlobalContext from '../Context/Context'
import { useEffect } from 'react'
import { GoogleMap, useJsApiLoader,InfoWindowF,MarkerF } from '@react-google-maps/api';
import StatisticCard from '../Components/StatisticCard';
import { ScatterChart, Scatter as RechartScatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer, Legend as RechartsLegend, Label } from 'recharts';
import MapPin from "../Assets/img/CilLocationPin.svg"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
const mapsApi = process.env.REACT_APP_GOOGLEMAPSAPI;
const SearchResults = () => {

  
 
  //Maps

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapsApi,
  })
  //AIzaSyBscXCca5fy4M1LLmKh2qEZE4RUXyuvdqs
  // AIzaSyC4V6QqaOkXqMH48fb8DfzB1o79N2otnJw
  const containerStyle = {
    width:"100%",
    height: "700px"
  }

  const centerLocations={
    westlands: {
      lat:-1.266944,
      lng:36.811667
    },
    lavington: {
      lat:-1.2765100,
      lng:36.7753400
    },
    kilimani: {
      lat:-1.2893,
      lng:36.7869
    },
    kileleshwa: {
      lat:-1.2807,
      lng:36.7817
    },
    riverside: {
      lat:-1.271818,
      lng:36.805263
    }
  }



  const { setHeaderHeight } = useContext(GlobalContext);
  useEffect(()=>{
  setHeaderHeight(20) 
  });
    const [saleType, setSaleType] = useState(undefined);
    const [dsq, setDsq] = useState(undefined);
    const [ensuite, setEnsuite] = useState(undefined);
    const [cloakroom, setCloakRoom] = useState(undefined);
    const [amenitiesLocation, setAmenitiesLocation] = useState(undefined);
    const [scatterLocation, setScatterLocation] = useState(undefined);
    const [scatterRoad, setScatterRoad] = useState(undefined);
    const [  , setIsModalOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(undefined);
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate();
    let [displayMarketView, setDisplayMarketView] = useState("scatterChart")
    let location = useLocation();
    let searchResults = location.state;
    let uniqueAvailableTypology = [...new Set(searchResults.propertyData.map((item) => item["Typology "]))];
    let [filteredPropertyData, setFilteredPropertyData] = useState(searchResults.propertyData);
    // let [filteredRoadResults, setFilteredRoadResults] = useState(searchResults.roadResults);
    //create filter functionality
    function onCheckFilter(checkedValues){
        // console.log("checked", checkedValues)
        setFilteredPropertyData(searchResults.propertyData.filter(el => checkedValues.includes(el["Typology "])))
        
    }
    function onMarketPriceSelectChange(selectedValue){
     
      if(selectedValue==="mapView"){
        setDisplayMarketView("mapView");
      } else if(selectedValue==="tableView"){
        setDisplayMarketView("tableView");
      } else if(selectedValue==="scatterChart"){
        setDisplayMarketView("scatterChart");
      }
    }

     console.log("search results",searchResults);

     let unitsNumberPicker = searchResults.roadResults.map((a)=>{
      let val =  a.number_of_units
      return val;
    })
     let floorTotalPicker = searchResults.roadResults.map((a)=>{
      let val =  a["Total no. of floors"]
      return val;
    })
     let densityPicker = searchResults.roadResults.map((a)=>{
      let val =  a["Density (units/acre)"]
      return val;
    })
     let floorAreaPicker = searchResults.propertyData.map((a)=>{
      let val =  a["Floor area (SqM)"]
      return val;
    })
    //search data specific to the overview
  let marketValuePicker = filteredPropertyData.map((a)=>{
      let val =  a["Market Price"].split(" ")[1].trim()
      return parseFloat(val.replace(/,/g, ''));
    })
  // let floorValuePicker = filteredPropertyData.map((a)=> a["Floor area (SqM)"])
    //unit
 let unitValuePicker = filteredPropertyData.map((a)=>{
       let val =  a["Unit Price/SqM"].split(" ")[1].trim()
       return parseFloat(val.replace(/,/g, ''));
     })
 let rentalYieldValuePicker = filteredPropertyData.map((a)=>{
       let val =  a["Rental Yield"].trim()
       return parseFloat(val.replace(/,/g, ''));
     })
 let rentValuePicker = filteredPropertyData.map((a)=>{
       let val =  a["Rent"].trim()
       return parseFloat(val.replace(/,/g, ''));
     })
 let grmYieldValuePicker = filteredPropertyData.map((a)=>{
       let val =  a["GRM (Years)"]
       return val;
     })


  //checkbox options
  // console.log(uniqueAvailableTypology)
  const typologyOptions = uniqueAvailableTypology;
   
  const filterOptions = [
    {
      key: '1',
      label: (
        <div>
          
          <Checkbox.Group options={typologyOptions} onChange={onCheckFilter} defaultValue={uniqueAvailableTypology}  />
        </div>
      ),
    },
   
  ];
    //format data for scatter chart

    let antdScatterChartData = filteredPropertyData.map(item => {
      let propertyName = searchResults.roadResults.filter(el => el["Property ID"] === item["PropertyID"])[0]["Name"];
      let saleType = searchResults.roadResults.filter(el => el["Property ID"] === item["PropertyID"])[0]["Sale type"];
      let amenitiesLocation = searchResults.roadResults.filter(el => el["Property ID"] === item["PropertyID"])[0]["Wellness location"];
      let location = searchResults.roadResults.filter(el => el["Property ID"] === item["PropertyID"])[0]["Location"];
      let road = searchResults.roadResults.filter(el => el["Property ID"] === item["PropertyID"])[0]["Road"];
      let unit = parseFloat(item["Unit Price/SqM"].split(" ")[1].trim().replace(/,/g, ''))
      let marketPrice = parseFloat(item["Market Price"].split(" ")[1].trim().replace(/,/g, ''));
      return {
        propertyName: propertyName,
        floorArea:item["Floor area (SqM)"],
        marketPrice: marketPrice,
        typology: item["Typology "],
        saleType: saleType,
        dsq: item["DSQ"],
        ensuite: item["En-suite"],
        cloakroom: item["Cloak room"],
        amenitiesLocation:amenitiesLocation,
        location:location,
        road:road,
        unit:unit
      }});

      const CustomToolTip = ({active, payload, label}) =>{

          // console.log(payload)
        if(active && payload && payload.length){
          return (
            <div style={{background: "rgb(256, 256, 256, 0.85)"}} className='rounded-md p-3 px-8 font-bold text-xs' >
      <RowAnt gutter={8}>
      <ColAnt  flex="auto" className="gutter-row" >
      <span >Property Name:</span>
      </ColAnt>
      <ColAnt  flex="auto" className="gutter-row">
      <span >{payload[0].payload["propertyName"]} </span>
      </ColAnt>
      </RowAnt>
            
      <RowAnt gutter={8}>
      <ColAnt  flex="auto" className="gutter-row" >
      <span >Market Price:</span>
      </ColAnt>
      <ColAnt  flex="auto" className="gutter-row items-start">
      <span>Ksh. {payload[0].payload["marketPrice"].toLocaleString().trim()}</span>
      </ColAnt>
      </RowAnt>
      <RowAnt gutter={8}>
      <ColAnt  flex="auto" className="gutter-row" >
      <span >Typology:</span>
      </ColAnt>
      <ColAnt  flex="auto" className="gutter-row items-start">
      <span >{payload[0].payload["typology"].trim()} </span>
      </ColAnt>
      </RowAnt>
            
      <RowAnt gutter={8}>
      <ColAnt  flex="auto" className="gutter-row" >
      <span >Floor Area:</span>
      </ColAnt>
      <ColAnt  flex="auto" className="gutter-row items-start">
      <span >{payload[0].payload["floorArea"]} Sqm </span>
      </ColAnt>
      </RowAnt>
      <RowAnt gutter={8}>
      <ColAnt  flex="auto" className="gutter-row" >
      <span >Unit Price/Sqm:</span>
      </ColAnt>
      <ColAnt  flex="auto" className="gutter-row items-start">
      <span >Ksh. {payload[0].payload["unit"].toLocaleString().trim()}</span>
      </ColAnt>
      </RowAnt>

      {
        saleType ? (
          <RowAnt gutter={8}>
          <ColAnt  flex="auto" className="gutter-row" >
          <span >Sale Type:</span>
          </ColAnt>
          <ColAnt  flex="auto" className="gutter-row">
          <span >{payload[0].payload["saleType"].trim()} </span>
          </ColAnt>
          </RowAnt>
        ): null
      }
      {
        dsq ? (
          <RowAnt gutter={8}>
          <ColAnt  flex="auto" className="gutter-row" >
          <span >DSQ:</span>
          </ColAnt>
          <ColAnt  flex="auto" className="gutter-row items-start">
          <span >{payload[0].payload["dsq"].trim()} </span>
          </ColAnt>
          </RowAnt>
        ): null
      }
      {
        ensuite ? (
          <RowAnt gutter={8}>
          <ColAnt  flex="auto" className="gutter-row" >
          <span >Ensuite:</span>
          </ColAnt>
          <ColAnt  flex="auto" className="gutter-row items-start">
          <span >{payload[0].payload["ensuite"].trim()} </span>
          </ColAnt>
          </RowAnt>
        ): null
      }
      {
        cloakroom ? (
          <RowAnt gutter={8}>
          <ColAnt  flex="auto" className="gutter-row" >
          <span >Cloakroom:</span>
          </ColAnt>
          <ColAnt  flex="auto" className="gutter-row items-start">
          <span >{payload[0].payload["cloakroom"].trim()} </span>
          </ColAnt>
          </RowAnt>
        ): null
      }
      {
        amenitiesLocation ? (
          <RowAnt gutter={8}>
          <ColAnt  flex="auto" className="gutter-row" >
          <span >Amenities Location:</span>
          </ColAnt>
          <ColAnt  flex="auto" className="gutter-row items-start">
          <span >{payload[0].payload["amenitiesLocation"].trim()} </span>
          </ColAnt>
          </RowAnt>
        ): null
      }
      {
        scatterLocation ? (
          <RowAnt gutter={8}>
          <ColAnt  flex="auto" className="gutter-row" >
          <span >Location:</span>
          </ColAnt>
          <ColAnt  flex="auto" className="gutter-row items-start">
          <span >{payload[0].payload["location"].trim()} </span>
          </ColAnt>
          </RowAnt>
        ): null
      }
      {
        scatterRoad ? (
          <RowAnt gutter={8}>
          <ColAnt  flex="auto" className="gutter-row" >
          <span >Road:</span>
          </ColAnt>
          <ColAnt  flex="auto" className="gutter-row items-start">
          <span >{payload[0].payload["road"].trim()} </span>
          </ColAnt>
          </RowAnt>
        ): null
      }
      <br />
      <span className='font-semibold text-sm -tracking-[1px]'>Click to view this property</span>
     </div>
          )
        }
        return null 
      }

      const [api, contextNotification] = notification.useNotification();
      const openNotificationWithIcon = () => {
        api["success"]({
          message: `Update Successful`,
          description:
            'Hover over the datapoints to uncover.',
        });
      };

      const handlePropertyCheckbox = (selectedItemArray) =>{
         openNotificationWithIcon();
        console.log("SELECTED",selectedItemArray);
        if(selectedItemArray.includes("saleType")){
          setSaleType(true)
         
        } else{
          setSaleType(false)
        }
        if(selectedItemArray.includes("dsq")){
          setDsq(true);
        } else{
          setDsq(false)
        }
        if(selectedItemArray.includes("ensuite")){
          setEnsuite(true);
        } else{
          setEnsuite(false)
        }
        if(selectedItemArray.includes("cloakroom")){
          setCloakRoom(true);
        } else{
          setCloakRoom(false)
        }
        if(selectedItemArray.includes("amenitiesLocation")){
          setAmenitiesLocation(true);
        } else{
          setAmenitiesLocation(false)
        }
        if(selectedItemArray.includes("location")){
          setScatterLocation(true);
        } else{
          setScatterLocation(false)
        }
        if(selectedItemArray.includes("road")){
          setScatterRoad(true);
        } else{
          setScatterRoad(false)
        }

      }

    let marketPriceTotal = marketValuePicker.length===0?0:marketValuePicker.reduce((partialSum, a) => partialSum + a, 0);
    let unitsNumberTotal = unitsNumberPicker.length===0?0:unitsNumberPicker.reduce((partialSum, a) => partialSum + a, 0);
    let densityTotal = densityPicker.length===0?0:densityPicker.reduce((partialSum, a) => partialSum + a, 0);
    let floorTotal = floorTotalPicker.length===0?0:floorTotalPicker.reduce((partialSum, a) => partialSum + a, 0);
    let floorAreaTotal = floorAreaPicker.length===0?0:floorAreaPicker.reduce((partialSum, a) => partialSum + a, 0);
    let avgFloorAreaTotal= floorAreaPicker.length===0?0:Math.round((floorAreaTotal/(floorAreaPicker.length) + Number.EPSILON) * 100) / 100
    let avgFloor = floorTotalPicker.length===0?0:Math.round((floorTotal/(floorTotalPicker.length) + Number.EPSILON) * 100) / 100
    let avgDensity = densityPicker.length===0?0:Math.round((densityTotal/(densityPicker.length) + Number.EPSILON) * 100) / 100
    let avgUnits = unitsNumberPicker.length===0?0:Math.round((unitsNumberTotal/(unitsNumberPicker.length) + Number.EPSILON) * 100) / 100
    let avgMarket = marketValuePicker.length===0?0:Math.round((marketPriceTotal/(marketValuePicker.length) + Number.EPSILON) * 100) / 100
    let minMarket = marketValuePicker.length===0?0:Math.min(...marketValuePicker);
    let maxMarket = marketValuePicker.length===0?0:Math.max(...marketValuePicker);

    let medianCal = (arr) => {
      let medSort = [...arr].sort((a, b) => a - b);

      const half = Math.floor(medSort.length / 2);
    
      return (
        filteredPropertyData.length===0?0:medSort.length % 2
        ? medSort[half]
        : (medSort[half - 1] + medSort[half]) / 2
      );
      }    
      const handleOk = () => {
        setIsModalOpen(false);
        navigate("/search");
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const confirm = () => {
        modal.confirm({
          title: "You are going back to the search page",
          icon: <i className='line-icon-Danger m-2 text-red-600'></i>,
          content: (
            <>
       
        <p>Kindly note that every search costs a token.</p>
        
        <p>Do you want to return ? </p>
            </>
          ),
          okText: 'Yes Proceed',
          okType:"danger",
          cancelText: 'Cancel',
          onOk:handleOk,
          onCancel:handleCancel
        });
      };

      const scatterDataCheckbox = [
        { label: 'Sale Type', value: 'saleType' },
        { label: 'DSQ', value: 'dsq' },
        { label: 'Ensuite', value: 'ensuite' },
        { label: 'Cloakroom', value: 'cloakroom' },
        { label: 'Amenities Location', value: 'amenitiesLocation' },
        { label: 'Location', value: 'location' },
        { label: 'Road', value: 'road' },
      ];

    

  return (
   
    <div>
         {contextNotification}

    <div className='flex justify-between'>
    <ToolTipANT title="Back">
    <Button onClick={confirm}  className='ml-4'> <i className='line-icon-Arrow-Back3 '></i></Button>
    </ToolTipANT>
    <ToolTipANT title="Save Search">
    <Button  className='mr-4'> <i className='line-icon-Save'></i></Button>
    </ToolTipANT>
    </div>
 

         {contextHolder}
         {/* NavBar hidden */}
         {/* <GlobalHeader theme="light" /> */}
           {/* Parallax Section Start */}
      <div className="py-[10px] h-auto overflow-hidden md:relative md:py-[30px] mt-8">
        {/* <Parallax className="lg-no-parallax absolute top-[0] w-full h-full lg:bg-cover" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg2.webp)` }}></Parallax> */}
        <Container className="h-full relative">
          <Row className="justify-center">
            <Col xl={6} lg={6} sm={8} className="text-center flex justify-center flex-col font-serif">
            <h2 className="text-[#08415c] font-bold text-lg -tracking-[1px] mb-5">Searched for: {searchResults.road||searchResults.location}</h2>
              {/* <h1 className="text-gradient bg-gradient-to-r from-[#08415c] via-[#08415c] to-[#08415c] mb-[20px] inline-block text-xmd leading-[20px]">Found: {searchResults.propertyData.length} data points , {searchResults.roadResults.length} properties , {unitsNumberTotal} units</h1>  */}
              {/* <h3 className="text-gray font-base text-md -tracking-[1px] mb-5">Found: {searchResults.roadResults.length} properties & {unitsNumberTotal} units</h3> */}
            </Col>
          </Row>
          <Row className="justify-center mb-4" >
    <Col xl={4} lg={6} sm={8} className="text-center flex justify-center flex-col font-serif">
      <Statistic title="Data Points" value={searchResults.propertyData.length}   />
    </Col>
    <Col xl={4} lg={6} sm={8} className="text-center flex justify-center flex-col font-serif">
      <Statistic title="Properties" value={searchResults.roadResults.length} />
    </Col>
    <Col xl={4} lg={6} sm={8} className="text-center flex justify-center flex-col font-serif">
      <Statistic title="Units" value={unitsNumberTotal}  />
    </Col>
  </Row>
        </Container>
      </div>
      {/* Parallax Section End */}
      <ConfigProvider 
      theme={{
        components:{
          Tabs: {
            colorPrimary: '#08415c',
            itemHoverColor:"rgba(8, 65, 92, .5)"
          },
          Checkbox:{
            colorPrimary: '#08415c'
          },
          Dropdown:{
            colorPrimary: '#08415c',
            itemHoverColor:"#08415c"
          },
          Select:{
            colorPrimary: '#08415c',
          },
          Statistic:{
            colorPrimary:"#3eb489"
          }
        }
      }}
      >
         {/* Section Start */}
         <section className="pb-[130px] lg:pb-[90px] md:pb-[75px] sm:pb-[50px] bg-lightgray overflow-visible relative">
        <Container>
          <Row>
            <Col xs={12} className="xs:px-0">

            <div className='mt-4'>



<Select
onChange={onMarketPriceSelectChange}
defaultValue={displayMarketView}
options={[
  {
    value: 'scatterChart',
    label: 'Scatter Chart',
  },
  {
    value: 'mapView',
    label: 'Map View ',
  },
  {
    value: 'tableView',
    label: 'Table View',
  },
 
]}
className='w-auto mb-12'     
/>
{/* Tab options */}

{/* DropDown options */}

{
  displayMarketView ==="scatterChart" ?
  <>
<Dropdown  trigger={['click']}
  className='ml-8'
  
  menu={{
  items: filterOptions,
  }}
  >
  <ToolTipANT title="Filter">
  <Button  icon={<i className='line-icon-Filter-2'></i>}  /> 
  </ToolTipANT>
  
  </Dropdown> 
  
    </> :<></>
}
{/* Render based on selected select value */}




{
displayMarketView==="scatterChart"? 
(
<>
{/* Display Dash Card */}
<Row className='mb-6 ' gutter={16}>
<Col span={8}>
  <StatisticCard title={"Median of Unit Price/SqM"} value={`Ksh. ${Math.round(medianCal(unitValuePicker)).toLocaleString()}`||0}/>
</Col>
<Col span={8}>
  <StatisticCard title={"Median of Rent"} value={`Ksh. ${medianCal(rentValuePicker).toLocaleString()}`||0}/>
</Col>
<Col span={8}>
  <StatisticCard title={"Median of Rental Yield"} value={`${Math.round(medianCal(rentalYieldValuePicker)).toLocaleString()}%`||0}/>
</Col>
<Col span={8}>
  <StatisticCard title={"Median of GRM (Years)"} value={`${Math.round(medianCal(grmYieldValuePicker)).toLocaleString()}`||0}/> 
</Col>
</Row>
<Row className='mb-6 ' gutter={16}>
<Col span={8}>
  <StatisticCard title={"Average of Market Price"} value={`Ksh. ${Math.round(avgMarket).toLocaleString()||0}`}/>
</Col>
<Col span={8}>
  <StatisticCard title={"Median of Market Price"} value={`Ksh. ${Math.round(medianCal(marketValuePicker)).toLocaleString()||0}`}/>
</Col>
<Col span={8}>
  <StatisticCard title={"Min of Market Price"} value={`Ksh. ${Math.round(minMarket).toLocaleString()||0}`}/>
</Col>
<Col span={8}>
  <StatisticCard title={"Max of Market Price"} value={`Ksh. ${Math.round(maxMarket).toLocaleString()||0}`} /> 
</Col>
</Row>
{/* <Scatter  className='bg-[#08415c] rounded-md p-4' options={scatterOptions} data={scatterData} /> */}


{/* scatter chart upgrade */}
<ResponsiveContainer width="100%" height={700}>
<ScatterChart  className='bg-[#08415c]  rounded-md p-5' margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }} >
  <CartesianGrid opacity={0.5}   strokeDasharray="2  2"  />
  <XAxis  style={{
    fontSize:"0.9rem"
  }} tick={{fill:"#f3efe0"}} dataKey="floorArea" type='number' name='FloorArea (SqM)' unit="sqm" >
  <Label fill='#f3efe0' value="Floor area (SqM)" offset={0} position="bottom" />
  </XAxis>
  <YAxis style={{
    fontSize:"0.9rem"
  }} tickFormatter={(val)=> 
     `Ksh.${val.toLocaleString()}`
  } tick={{fill:"#f3efe0"}} dataKey="marketPrice" type='number' name='Estimated Market Price' >
  <Label fill='#f3efe0' value="Market Price" angle={0} offset={30}  position="top" />
  </YAxis>
  <RechartTooltip content={<CustomToolTip/>} cursor={{ strokeDasharray: '3 3' }}/>
  <RechartsLegend  verticalAlign="top" height={36} />
  <RechartScatter name={`Data point`} data={antdScatterChartData} fill="#3eb489" />
</ScatterChart>
</ResponsiveContainer>


<div className="text-center  flex justify-center flex-col font-serif ">
 
<span className='text-[#08415c] font-base text-md -tracking-[1px] mt-4'>Apply property data parameters to uncover high yield prospects</span>
    <br />
   <Checkbox.Group onChange={handlePropertyCheckbox} className='justify-center text-[#08415c]' options={scatterDataCheckbox}  />
</div>

</>

): displayMarketView==="mapView"? 

<>
{/* Display Dash Card */}
<Row className='mb-6 ' gutter={16}>
<Col span={8}>
  <StatisticCard title={ "Average No. of Units (per property) "} value={`${Math.round(avgUnits).toLocaleString()||0}`||0}/>
</Col>
<Col span={8}>
  <StatisticCard title={"Average Density (units/acre)"} value={Math.round(avgDensity)}/>
</Col>
{/* <Col span={8}>
  <StatisticCard title={"Average no. of floors"} value={`${medianCal(rentalYieldValuePicker).toLocaleString()}%`||0}/>
</Col>
<Col span={8}>
  <StatisticCard title={"Median of GRM (Years)"} value={`${medianCal(grmYieldValuePicker).toLocaleString()}`||0}/> 
</Col> */}
</Row>
<Row className='mb-6 ' gutter={16}>
<Col span={8}>
  <StatisticCard title={ "Average of Floor Area (SqM)"} value={Math.round(avgFloorAreaTotal)}/>
</Col>
{/* <Col span={8}>
  <StatisticCard title={"Median of Total No. of Floors"} value={`${medianCal(floorTotalPicker).toLocaleString()}`||0}/>
</Col> */}
<Col span={8}>
  <StatisticCard title={"Average no. of floors"} value={Math.floor(Math.round(avgFloor))}/>
</Col>
{/* <Col span={8}>
  <StatisticCard title={"No. of Plotted Properties"} value={searchResults.roadResults.length}/> 
</Col> */}
</Row>



<div style={{ height: '60vh', width: '100%' }}>
{
isLoaded&&(
<GoogleMap 
mapContainerStyle={containerStyle}
center={{
lat:selectedPlace?Number(selectedPlace["Geo-Location"].split(',')[0]):searchResults.location===("Nairobi Westlands")?centerLocations.westlands.lat:searchResults.location===("Nairobi Kilimani")?centerLocations.kilimani.lat:searchResults.location===("Nairobi Kileleshwa")?centerLocations.kileleshwa.lat:searchResults.location===("Nairobi Lavington")?centerLocations.lavington.lat:centerLocations.riverside.lat,
lng:selectedPlace?Number(selectedPlace["Geo-Location"].split(',')[1]):searchResults.location===("Nairobi Westlands")?centerLocations.westlands.lng:searchResults.location===("Nairobi Kilimani")?centerLocations.kilimani.lng:searchResults.location===("Nairobi Kileleshwa")?centerLocations.kileleshwa.lng:searchResults.location===("Nairobi Lavington")?centerLocations.lavington.lng:centerLocations.riverside.lng
}}
zoom={14}   
>



{searchResults.roadResults.map((place)=>(
<MarkerF
options={ 
  {
    icon:MapPin
  }
}


key={`${Number(place["Geo-Location"].split(',')[0])} - ${Number(place["Geo-Location"].split(',')[1])}`}
onClick={()=>{
place===selectedPlace?setSelectedPlace(undefined):setSelectedPlace(place);
}}
position={{
lat:Number(place["Geo-Location"].split(',')[0]),
lng:Number(place["Geo-Location"].split(',')[1])
}}
/>
))}
{selectedPlace&&(
<InfoWindowF

position={{
lat: Number(selectedPlace["Geo-Location"].split(',')[0]),
lng: Number(selectedPlace["Geo-Location"].split(',')[1])
}}

zIndex={1} 
option={{
// pixelOffset:{
//   width:0,
//   height:-40,
// }
}}
onCloseClick={()=>setSelectedPlace(undefined)}>
<div>
<p className='font-semibold'>Property Name:{selectedPlace.Name}</p>
<p className=''>Typology:{selectedPlace["Typology "]}</p>
<p>Number of Units:{selectedPlace.number_of_units}</p>
<p>Acreage:{selectedPlace["erf (acres)"]}</p>
<p>Density:{selectedPlace["Density (units/acre)"]}</p>
<p>Number of Floors:{selectedPlace["Habitable no. of Floors"]}</p>
<p>Location:{selectedPlace.Location}</p>

<br />
<Button>View this Property</Button>

{/* <Divider orientation="left">{selectedPlace.Name}</Divider>
<RowAnt gutter={16}>
<ColAnt className="gutter-row" span={6}>
<div>Property Name:</div>
</ColAnt>
<Col className="gutter-row" span={6}>
<div>{selectedPlace.Name}</div>
</Col>
</RowAnt>
*/}

</div>

</InfoWindowF>
)} 
</GoogleMap>
)
}
</div>
</>:
<p>HERE IS TABLE VIEW </p>
}
</div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
    </ConfigProvider>
    </div>
  )
}

export default SearchResults