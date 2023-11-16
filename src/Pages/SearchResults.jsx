import React from 'react'
import GlobalHeader from '../Components/GlobalHeader'
import { Parallax } from 'react-scroll-parallax'
import { Col, Container, Row } from 'react-bootstrap'
import { Button, Card, Checkbox, Dropdown, Select, ConfigProvider, Tabs, Tooltip as ToolTipANT } from 'antd'
import { useLocation } from 'react-router-dom'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { FilterOutlined,  } from '@ant-design/icons';
import { useState } from 'react'
import "./search.css"


ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const SearchResults = () => {





    let location = useLocation();
    let searchResults = location.state;
    let uniqueAvailableTypology = [...new Set(searchResults.propertyData.map((item) => item["Typology "]))];
    let [filteredPropertyData, setFilteredPropertyData] = useState(searchResults.propertyData);
    // let [filteredRoadResults, setFilteredRoadResults] = useState(searchResults.roadResults);


    //create filter functionality

    function onCheckFilter(checkedValues){
        console.log("checked", checkedValues)
        setFilteredPropertyData(searchResults.propertyData.filter(el => checkedValues.includes(el["Typology "])))
        
    }




    console.log("search results",searchResults);
    //search data specific to the overview

  let marketValuePicker = filteredPropertyData.map((a)=>{
      let val =  a["Market Price"].split(" ")[1].trim()
      return parseFloat(val.replace(/,/g, ''));
    })
  let floorValuePicker = filteredPropertyData.map((a)=> a["Floor area (SqM)"])

    //unit
  // let floorValuePicker = searchResults.propertyData.map((a)=>{
  //     let val =  a["Floor area (SqM)"].split(" ")[1].trim()
  //     return parseFloat(val.replace(/,/g, ''));
  //   })

  //checkbox options
  
  console.log(uniqueAvailableTypology)
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

    const scatterOptions = {

      plugins: {
        legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {
                  size: 16,
                  color:"#f3efe0"
              },
              color:"#f3efe0"
            },
          },
        tooltip: {
            callbacks: {
                label: function(item, context) {
                 
                  
                  // console.log("here item", item)

                   let marketPriceDetails = filteredPropertyData[item.dataIndex];
                   let propertyName = searchResults.roadResults.filter(el => el["Property ID"] === marketPriceDetails["PropertyID"])[0]["Name"];
                   let saleType = searchResults.roadResults.filter(el => el["Property ID"] === marketPriceDetails["PropertyID"])[0]["Sale type"];
                   let amenitiesLocation = searchResults.roadResults.filter(el => el["Property ID"] === marketPriceDetails["PropertyID"])[0]["Wellness location"];
                   let location = searchResults.roadResults.filter(el => el["Property ID"] === marketPriceDetails["PropertyID"])[0]["Location"];
                   let road = searchResults.roadResults.filter(el => el["Property ID"] === marketPriceDetails["PropertyID"])[0]["Road"];
                      console.log(marketPriceDetails)
                      
                      let label = [`Property name: ${propertyName}`];
                      label.push(`Floor area (SqM): ${marketPriceDetails["Floor area (SqM)"]}`);
                      label.push(`Market price: ${marketPriceDetails["Market Price"]}`);
                      label.push(`Typology: ${marketPriceDetails["Typology "]}`);
                      label.push(`Sale type : ${saleType}`);
                      label.push(`DSQ: ${marketPriceDetails["DSQ"]}`);
                      label.push(`En-suite: ${marketPriceDetails["En-suite"]}`);
                      label.push(`Cloak room: ${marketPriceDetails["Cloak room"]}`);
                      label.push(`Amenities location: ${amenitiesLocation}`);
                      label.push(`Location: ${location}`);
                      label.push(`Road: ${road}`);
                      label.push(` `);
                      label.push(`Click to view this property`);

                   return label;
                }
            }
        }
    },
      
        scales: {
          
          y: {
            title: {
                display: true,
                text: "Market Price",
                font: {
                    size: 15
                },
                color:"#f3efe0"
            },
            ticks:{
              color:"#f3efe0"
            }
          },
          x: {
            
            title: {
                display: true,
                text: "Floor area (SqM)",
                font: {
                    size: 15
                },
                color:"#f3efe0"
              
            },
            ticks:{
              color:"#f3efe0",
              backdropColor:"#f3efe0",
            }
          },
         
          
        },
        
       
        
      };
    
  

  
     let testData = [];
    
    
    for(let i=0; i<marketValuePicker.length; i++) {

      let myObj = {};

      for(let j =0; j<floorValuePicker.length; j++){
          myObj.x = floorValuePicker[i];
          myObj.y = marketValuePicker[i];
      }

      testData.push(myObj)

    }

// console.log(testData)

    const scatterData = {
      datasets: [
        {
          label: 'Data point',
          data: testData,
          backgroundColor: 'rgba(62, 180, 137)',
        },
       
      ],
     
    };

    let marketPriceTotal = marketValuePicker.reduce((partialSum, a) => partialSum + a, 0);
    let avgMarket = Math.round((marketPriceTotal/(marketValuePicker.length) + Number.EPSILON) * 100) / 100
    let minMarket = marketValuePicker.length===0?0:Math.min(...marketValuePicker);
    let maxMarket = marketValuePicker.length===0?0:Math.max(...marketValuePicker);

    let medianCal = () => {
      let medSort = [...marketValuePicker].sort((a, b) => a - b);

      const half = Math.floor(medSort.length / 2);
    
      return (medSort.length % 2
        ? medSort[half]
        : (medSort[half - 1] + medSort[half]) / 2
      );
    }



    // Tab
    const items = [
        {
          key: '1',
          label: (
            <span >
                <i className='line-icon-Money-2 mr-2'></i>
               Market Prices
            </span>
          ),
          children: (
            <div>

              <Select
              defaultValue="scatter"
              options={[
                {
                  value: 'scatter',
                  label: 'Scatter Chart',
                },
                {
                  value: 'map',
                  label: 'Map View ',
                },
                {
                  value: 'table',
                  label: 'Table View',
                },
               
              ]}
              className='w-auto mb-12'     
              />
            {/* Tab options */}

  {/* DropDown options */}
    <Dropdown  trigger={['click']}
      className='ml-8'
    menu={{
     items: filterOptions,
    }}
  >
    <ToolTipANT title="Filter">
    <Button  icon={<FilterOutlined />}  /> 
    </ToolTipANT>
  
  </Dropdown>
  {/* DropDown Options */}

<Row className='mb-6 ' gutter={16}>
    <Col span={8}>
      <Card className='bg-[#08415c]' bordered={false}>
      <div className=''>
      <span className='font-base text-[#f3efe0] text-md mb-1'>Average of Market Price</span>
       <br /> 
       {/* <hr className='text-[#f3efe0]' /> */}       
      <span className='font-semibold text-[#3eb489] text-[1.8rem] '>Ksh. {avgMarket.toLocaleString()||0}</span>
      </div> 
        {/* <Statistic
          title="Average of Market Price"
          
          value={avgMarket||0}
          precision={2}
          
          valueStyle={{
            color: '#3eb489',
          }}
          prefix={"Ksh. "}
          suffix=""
        /> */}
      </Card>
    </Col>
    <Col span={8}>
      <Card className='bg-[#08415c]' bordered={false}>
      <div className=''>
      <span className='font-base text-[#f3efe0] text-md mb-1'>Median of Market Price</span>
       <br /> 
       {/* <hr className='text-[#f3efe0]' /> */}       
      <span className='font-semibold text-[#3eb489] text-[1.8rem] '>Ksh. {medianCal().toLocaleString()||0}</span>
      </div> 
        {/* <Statistic
          title="Median of Market Price"
          value={medianCal()||0}
          precision={2}
          titleStyle={{color:"#3eb489"}}
          valueStyle={{
            color: '#08415c',
          }}
          prefix={"Ksh. "}
          suffix=""
        /> */}
      </Card>
    </Col>
    <Col span={8}>
      <Card  className='bg-[#08415c]'  bordered={false}>
      <div className=''>
      <span className='font-base text-[#f3efe0] text-md mb-1'>Min of Market Price</span>
       <br /> 
       {/* <hr className='text-[#f3efe0]' /> */}       
      <span className='font-semibold text-[#3eb489] text-[1.8rem] '>Ksh. {minMarket.toLocaleString()||0}</span>
      </div> 
        {/* <Statistic
          title="Min of Market Price"
          value={minMarket||0}
          precision={2}
          valueStyle={{
            color: '#08415c',
          }}
          prefix={"Ksh. "}
          suffix=""
        /> */}
      </Card>
    </Col>
    <Col span={8}>
      <Card  className='bg-[#08415c]'   bordered={false}>

      <div className=''>
      <span className='font-base text-[#f3efe0] text-md mb-1'>Max of Market Price</span>
       <br /> 
       {/* <hr className='text-[#f3efe0]' /> */}       
      <span className='font-semibold text-[#3eb489] text-[1.8rem] '>Ksh. {maxMarket.toLocaleString()||0}</span>
      </div> 

        {/* <Statistic
          title="Max of Market Price"
          value={maxMarket||0}
          precision={2}
          style={{
            color:"#3eb489"
          }}
          valueStyle={{
            color: '#08415c',
          }}
          prefix={"Ksh. "}
          suffix=""
        /> */}
      </Card>
    </Col>
  </Row>

  <Scatter  className='bg-[#08415c] rounded-md p-4' options={scatterOptions} data={scatterData} />


            </div>
          ),
        },
        {
          key: '2',
          label: (
            <span>
                <i className='line-icon-Money-Bag mr-2'></i>
                Unit Prices
            </span>
          ),
          children: 'Content of Map View ',
        },
        {
          key: '3',
          label:  (
            <span>
                <i className='line-icon-Hotel mr-2'></i>
                Rents
            </span>
          ),
          children: 'Content of Table pan',
        },
        {
          key: '4',
          label:  (
            <span>
                <i className='line-icon-Bar-Chart4 mr-2'></i>
                Rental Yields
            </span>
          ),
          children: 'Content of Table pan',
        },
        {
          key: '5',
          label:  (
            <span>
                <i className='line-icon-Bar-Chart2 mr-2'></i>
                Gross Rent Multiplier
            </span>
          ),
          children: 'Content of Table pan',
        },
      ];


  return (
    <div>
         
         <GlobalHeader theme="light" />
           {/* Parallax Section Start */}
      <div className="py-[60px] h-auto overflow-hidden md:relative md:py-[30px]">
        <Parallax className="lg-no-parallax absolute top-[0] w-full h-full lg:bg-cover" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg2.webp)` }}></Parallax>
        <Container className="h-full relative">
          <Row className="justify-center h-[100px] sm:h-[50px]">
            <Col xl={6} lg={6} sm={8} className="text-center flex justify-center flex-col font-serif">
              <h1 className="text-gradient bg-gradient-to-r from-[#08415c] via-[#08415c] to-[#08415c] mb-[15px] inline-block text-xmd leading-[20px]">{searchResults.roadResults.length} data points</h1>
              <h2 className="text-darkgray font-bold text-lg -tracking-[1px] mb-0">Searched for: {searchResults.road||searchResults.location}</h2>
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
            <Tabs
            defaultActiveKey="1"
            centered
            items={items}
            />
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