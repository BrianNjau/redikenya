import React, { useContext, useEffect, useState } from 'react'
import GlobalHeader from '../Components/GlobalHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Typed from 'react-typed';
import { fadeIn } from '../Functions/GlobalAnimations';

import MultiRangeSlider from '../Components/MultiRangeSlider';
import { Checkbox, Select, Skeleton, Result, FloatButton, Button, Modal, List, Space, Spin, Tooltip } from 'antd';
import GlobalContext from '../Context/Context';
import { Supabase } from '../Functions/SupabaseClient';
import { CodeOutlined, DollarOutlined, HomeOutlined,  MonitorOutlined, QuestionCircleOutlined, RiseOutlined } from '@ant-design/icons';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import MapPin from "../Assets/img/CilLocationPin.svg"

const Invest = () => {
const [loadingPropData, setLoadingPropData] = useState([]);
const [loadingPropOverview, setLoadingPropOverview] = useState([]);
const [propData, setPropData] = useState([]);
const [propOverview, setPropOverview] = useState([]);
const [selectedMarketPrice, setSelectedMarketPrice] = useState([]);
const [selectedRentPrice, setSelectedRentPrice] = useState([]);
const [selectedLocation, setSelectedLocation] = useState([]);
const [selectedTypology, setSelectedTypology] = useState([]);
const [filterSearchLoading, setFilterSearchLoading] = useState(false);
const [filterSearchResults, setFilterSearchResults] = useState([]);
const [isConfirmSearchModalOpen, setIsConfirmSearchModalOpen] = useState(false);

const { setHeaderHeight } = useContext(GlobalContext);

const mapsApi = process.env.REACT_APP_GOOGLEMAPSAPI;


useEffect(()=>{
setHeaderHeight(120);
fetchPropData(); 
fetchPropOverview();
},[]);


async function fetchPropData () {
try {
setLoadingPropData(true);

//get data
let { data: PropData } = await Supabase
  .from('PropData')
  .select('*');
  setPropData(PropData);

  setLoadingPropData(false)

} catch (error) {
  setLoadingPropData(false);
  console.log("Fetch property Data err >", error)
}
  }
  
  async function fetchPropOverview(){
    try{
    setLoadingPropOverview(true);
      //get data
    let { data: PropOverview } = await Supabase
    .from('Property Overview')
    .select('*');
    setPropOverview(PropOverview);
    setLoadingPropOverview(false);
    }catch(err){
      setLoadingPropOverview(false);
      console.log(err)
    }
  }


const marketPrices = propData.map(val =>  parseFloat(val["Market Price"].split(" ")[1].trim().replace(/,/g, '')));
const rents = propData.map(val =>  parseFloat(val["Rent"].replace(/,/g, '')));
const locations = [...new Set(propOverview.map(val =>  val["Location"]))];


const handleMarketPricePicker =  (marketPrices) => {
  setSelectedMarketPrice(marketPrices);
}
// const handleMarketPriceNumberPicker =  (marketPrices) => {
//   setSelectedMarketPrice(marketPrices);
// }
const handleRentPricePicker =  (rentPrices) => {
  setSelectedRentPrice(rentPrices)
}
const handleLocationPicker = (locations) =>{
  setSelectedLocation(locations)
}
const handleTypologyPicker = (typologies) =>{
  setSelectedTypology(typologies)
}


function filterByValue(data, selectedPrice, type){
    try{
      const isValidPrice = (marketPrice)=> {
        return !isNaN(parseFloat(marketPrice)) && isFinite(marketPrice);
        };
        const filterPriceRange = (result, property) => {
        const marketPrice = property[type];
        if((type!=="Rent" ) && (!marketPrice || !isValidPrice(marketPrice.split(" ")[1].trim().replace(/,/g, '')))){
          result.discarded.push(property) // add to discarded items
          return false;  
        };
        const priceValue = type==="Rent"? parseFloat(marketPrice.replace(/,/g,'')): parseFloat(marketPrice.split(" ")[1].trim().replace(/,/g,''));
        if(selectedPrice.length!==0 && (priceValue<selectedPrice[0] || priceValue >selectedPrice[1])){
          result.discarded.push(property) // add to discarded items
          return result;
        }; 
        result.filtered.push(property);
        return result;
      };
       const initialResult = {filtered: [], discarded: []};
       const {filtered, discarded }= data.reduce(filterPriceRange, initialResult)
       return {filtered, discarded};
    }catch(err){
      console.log(err);
    }
}

function filterByLocation(data, selectedLocation, lookUpData){
  try{
    if(selectedLocation.length===0){
      return data; 
    }
    const filterLocations = (result) => {
    const propertyID = result["PropertyID"];
    const foundLocation = lookUpData.find((a) => a["Property ID"] === propertyID && selectedLocation.includes(a["Location"]));
    console.log(foundLocation)
    if(foundLocation){
    return result
    }
    return false 
    } 
    const filteredResults = data.filter(filterLocations);
    return filteredResults

  }catch(err){
    console.log(err)
  }
}

function filterByTypology(data, typologies){
  try{

    if(typologies.length===0){
      return data
    }

    const filteredResults = data.filter((property)=> 
    typologies.includes(property["Typology "]));

    return filteredResults;


  }catch(err){
    console.log(err)
  }
}



 function filterProperties(){
  try {
    setFilterSearchLoading(true)
    const filterByMarketPrice = filterByValue(propData,selectedMarketPrice,'Market Price');// filter by marketprice
    console.log("MarketPrice result",filterByMarketPrice);
    const filterByRent = filterByValue(filterByMarketPrice.filtered, selectedRentPrice, 'Rent');
    const locationFiltered =  filterByLocation(filterByRent.filtered, selectedLocation, propOverview);
    console.log("FILTERED WITH LO",locationFiltered)
    const typologyFiltered = filterByTypology(locationFiltered, selectedTypology);
    setFilterSearchResults(typologyFiltered);
    setFilterSearchLoading(false)
  } catch (error) {
    setFilterSearchLoading(false);
    
  }
}

const showConfirmModal = () => {
  setIsConfirmSearchModalOpen(true);
};
const handleOkSearch = () => {
 filterProperties();
 setIsConfirmSearchModalOpen(false);
};

const handleCancelSearch = () => {
  setIsConfirmSearchModalOpen(false);
};


const IconText = ({icon,text}) => {

  return(
  <Space>
    {icon}
    {text}
  </Space>
);

}

const mapContainerStyle = {
  minWidth:"17vh",
  minHeight:"15vh",
  borderRadius:"10px",
  boxShadow:"rgba(black, 0.66) 0 30px 60px 0",
  transition:"1s $returnEasing"
}
const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: mapsApi,
})

  return (
    <div>
      
        <GlobalHeader theme="light" />
       {/* TO DO Make this section a component */}
        <section className="bg-lightgray py-[25px]">
     <Container>
       <Row className="items-center justify-center">
         <Col xl={8} lg={6}>
          {/* <h1 className="font-serif text-darkgray font-medium mb-0 text-lg md:text-center"></h1> */} 
         </Col>
         <Col xl={4} lg={6} className="breadcrumb mb-0 justify-end font-serif md:justify-center sm:mt-[10px] text-sm">
           <ul className="xs-text-center">
             <li>Invest</li>
             <li> 
            <Typed className="font-semibold text-[#3eb489]"
            strings={[ "PDI","Property Development And Investments", "Property Data And Insights"]}
            typeSpeed={60}
            backSpeed={60}
            loop
            showCursor
            cursorChar="|"/>
            </li>
           </ul>
         </Col>
       </Row>
     </Container>
   </section>

   <FloatButton.Group
      trigger="click"
      type="default"
      badge={{ dot: true }}
      icon={<MonitorOutlined />}
    >
      <Tooltip title="Generate PDI investment insights" >
      <FloatButton  badge={{ dot: true }} icon={<QuestionCircleOutlined  />} />
      </Tooltip>

     <Tooltip title="Let our AI analyze your results" >
     <FloatButton  badge={{ dot: true }} icon={<CodeOutlined />} />
     </Tooltip>
     
    </FloatButton.Group>
   {/* <FloatButton
      icon={<MonitorOutlined />}
      type="default"
      badge={{ dot: true }}
     
    /> */}

     {/* Section Start */}
     <section className="shopping-right-left-sidebar pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] mt-8">
                <Container>
                    <Row>
                        <Col lg={9} md={8} className="pl-[55px] md:pl-[15px] sm:mb-[30px] order-md-2 order-1 sm:px-0">

                            {/* List data here  */}

                      { 
                          filterSearchResults.length===0? <Result style={{right:"50%", bottom:"50%"}} status="404" title="Search to uncover investment insights" subTitle="1 search = 1 token"/>:
                            <div>
                                <div>
                                <span className='float-right text-sm mb-12'>Found results: {filterSearchResults.length}</span>
                                  <br />
                                  <hr />
                                </div>
                              <List 
                                  className='mt-8'
                                  itemLayout='vertical'
                                  size='large'
                                  pagination={{
                                    // onChange: (page)=>{
                                    //   console.log(page);
                                    // },
                                    pageSize: 8
                                  }}
                                  dataSource={filterSearchResults}
                                  footer={
                                  <div>
                                    <Typed className="font-semibold text-[#3eb489]"
                                    strings={[ "PDI Marketplace Kenya","Property Development And Investments", "Property Data And Insights"]}
                                    typeSpeed={6}
                                    backSpeed={16}
                                    loop
                                    showCursor
                                    cursorChar="|"/>
                                  </div>
                                  }
                                  renderItem={(item)=>(
                                    <List.Item key={item['Property Key']} 
                                     actions={[
                                      <IconText icon={<DollarOutlined />} text={`Market Price: ${item["Market Price"]}`} key={"market-price-icon"}/>,
                                      <IconText icon={<HomeOutlined />} text={`Typology: ${item["Typology "]}`} key={"home-price-icon"}/>,
                                      <IconText icon={<RiseOutlined />} text={`GRM: ${item["GRM (Years)"]} Years`} key={"grm-price-icon"}/>,
                                     ]}
                                     extra={
                                        isLoaded&&(
                                          <div className='md:hidden sm:hidden' style={mapContainerStyle}>

                                        
                                        <GoogleMap 
                                        mapContainerStyle={mapContainerStyle}
                                        center={{
                                       lat:   Number(propOverview.find(a => a["Property ID"] === item["PropertyID"])["Geo-Location"].split(',')[0]),
                                       lng:  Number(propOverview.find(a => a["Property ID"] === item["PropertyID"])["Geo-Location"].split(',')[1])  
                                                }}
                                        zoom={15}   
                                        >
                                        
                                        <MarkerF 
                                        options={{
                                          icon:MapPin
                                        }}
                                        key={`${Number(propOverview.find(a => a["Property ID"] === item["PropertyID"])["Geo-Location"].split(',')[0])} - ${Number(propOverview.find(a => a["Property ID"] === item["PropertyID"])["Geo-Location"].split(',')[1])}`}
                                        position={{
                                        lat:Number(propOverview.find(a => a["Property ID"] === item["PropertyID"])["Geo-Location"].split(',')[0]),
                                        lng:Number(propOverview.find(a => a["Property ID"] === item["PropertyID"])["Geo-Location"].split(',')[1]),
                                        }}
                                        />
                                        </GoogleMap>
                                        </div>
                                  )}
                                    >

               <List.Item.Meta
                  // avatar={<Avatar src={item.avatar} />}
                 title={<span>{
                  propOverview.find(a => a["Property ID"] === item["PropertyID"]) ? propOverview.find(a => a["Property ID"] === item["PropertyID"])["Name"] : <Spin/>        
                  }</span>}
                 description={
                  <span>
                   {propOverview.find(a => a["Property ID"] === item["PropertyID"]) ? propOverview.find(a => a["Property ID"] === item["PropertyID"])["Location"]: <Spin/>},  {propOverview.find(a => a["Property ID"] === item["PropertyID"]) ? propOverview.find(a => a["Property ID"] === item["PropertyID"])["Road"]: <Spin/>}
                  </span>
                 }
                />
                <div>
                  <ul>
                    <li>Rent: {item["Rent"]}</li>
                    <li>Rental Yield: {item["Rental Yield"]}</li>
                  </ul>
               
                </div>
                                    </List.Item>
                                    
                                  )}
                                  /> 
                                       
                                       
                                  </div>
                            }
                       
                            {/* <ShopWide filter={false} grid="grid grid-3col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large" data={shopWideData} /> */}
                        </Col>
                        <div className="col col-lg-3 col-md-4 shopping-sidebar inline-block order-md-1 order-2" {...fadeIn}>

                        <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[26px]">Filter By Market Price</span>

                                {
                                  loadingPropData ? <Skeleton active paragraph={{rows:1}}/>:<MultiRangeSlider
                                  min={0}
                                  max={Math.max(...marketPrices)}
                                  onChange={handleMarketPricePicker}
                              />
                                }
                                
                            </div>

                        <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[26px]">Filter By Rent</span>
                                {
                                  loadingPropData ? <Skeleton active paragraph={{rows:1}}/>:<MultiRangeSlider
                                  min={0}
                                  max={Math.max(...rents)}
                                  onChange={handleRentPricePicker}
                              />
                                }
                            </div>

                            <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[20px]">Filter By Location</span>

                                <Select loading={loadingPropOverview} mode="multiple" size={"large"} placeholder="Please select" style={{width: '100%',}} onChange={handleLocationPicker} options={locations.map((a) =>{return{value:a,label:a,}})}/>
                                {/* <ul className="list-style filter-color">
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#black"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#363636" }}></span>Carbon black</a><span className="item-qty">25</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#blue"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#657fa8" }}></span>Prussian blue</a><span className="item-qty">03</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#brown"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#936f5e" }}></span>Light brown</a><span className="item-qty">15</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#green"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#97a27f" }}></span>Parrot green</a><span className="item-qty">40</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#orange"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#b95b5b" }}></span>Dark orange</a><span className="item-qty">29</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#blue"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#b7b5b5" }}></span>Slate blue</a><span className="item-qty">35</span></li>
                                </ul> */}
                            </div>
                        


                            <div className="border-b border-mediumgray pb-12 mb-8 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[20px]">Filter By Typology</span>
                                <ul className="list-style filter-category">
                                  
                                  <Checkbox.Group onChange={handleTypologyPicker}>  
                                    <li>
                                        <Checkbox value="Studio">Studio</Checkbox>
                                    </li>
                                    <li>
                                    <Checkbox value="1BR">1 Bedroom</Checkbox>
                                    </li>
                                    <li>
                                    <Checkbox value="2BR">2 Bedroom</Checkbox>
                                    </li>
                                    <li>
                                    <Checkbox value="3BR">3 Bedroom</Checkbox>
                                    </li>
                                    <li>
                                    <Checkbox value="4BR">4 Bedroom</Checkbox>
                                    </li>
                                    <li>
                                    <Checkbox value="5BR">5 Bedroom</Checkbox>
                                    </li>
                                    </Checkbox.Group>
                                </ul>
                            </div>

                            <Modal centered open={isConfirmSearchModalOpen} onOk={handleOkSearch} okText="Search" confirmLoading={filterSearchLoading} okType='secondary' onCancel={handleCancelSearch}>
                            <Result title="Search for investment opportunities" subTitle="Please Note: 1 search = 1 token" />
                            </Modal>
                       
                           
                            <div>
                                {/* <span className="shop-title relative font-serif font-medium text-darkgray block mb-[30px]"> </span> */}
                                <Button size="large" loading={filterSearchLoading} onClick={showConfirmModal} className="w-full">
                                  Search
                                </Button>
                                {/* <Buttons ariaLabel="filter" onClick={filterProperties} type="submit" className="btn-fill btn-fancy w-full font-medium font-serif rounded-none uppercase md:mb-[15px] sm:mb-0 mb-4" themeColor="#3eb489" color="#fff" size="md" title={`Search`} /> */}
                                {/* <Buttons ariaLabel="reset" type="submit" className="btn-fill btn-fancy w-full font-medium font-serif rounded-none uppercase md:mb-[15px] sm:mb-0" themeColor="#70161e" color="#fff" size="md" title="Reset" /> */}
                                {/* <div className="tag-cloud d-inline-block margin-10px-top">
                                    <Link aria-label="product-tags-link" to="#">Off Plan</Link>
                                    <Link aria-label="product-tags-link" to="#">Occupation Ready</Link>
                                </div> */}
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

    </div>
  )
}

export default Invest