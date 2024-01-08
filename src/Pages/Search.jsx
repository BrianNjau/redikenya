import React, { useContext, useEffect, useState } from 'react'
import GlobalHeader from '../Components/GlobalHeader'
import { Parallax } from 'react-scroll-parallax'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Supabase } from '../Functions/SupabaseClient'
import { Avatar, Button, Card, Divider, Select, Space, Tooltip, Row as RowAnt, Col as ColAnt} from 'antd';
import GlobalContext from '../Context/Context'
import { InfoCircleOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'

const Search =  () => {

    const navigate = useNavigate()
    let [location, setLocation] = useState([]);
    let [propertyRoad, setPropertyRoad] = useState([]);
    let [loadingLocation, setLoadingLocation] = useState(false);
    let [loadingRoad, setLoadingRoad] = useState(false);
    let [loadingSubmit, setLoadingSubmit] = useState(false);
    let [selectedRoad, setSelectedRoad] = useState('');
    let [selectedLocation, setSelectedLocation] = useState('');


    const { setHeaderHeight } = useContext(GlobalContext);
    useEffect(()=>{
    setHeaderHeight(120) 
    });


      const onChange = async (value) => {
      try{
        setSelectedLocation(value);
      setLoadingRoad(true);
      const { data: propertyRoadData } = await Supabase.from('Property Overview').select('Road').eq('Location',value);
      if(propertyRoadData){
        setPropertyRoad(propertyRoadData);
        
      }
      setLoadingRoad(false);

      
    }catch(err){
      console.log(err);
      setLoadingRoad(false)
    }
    };
       // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    
     async function fetchProperties(){
        try{
          setLoadingLocation(true);
          
          const { data: propertyLocation } = await Supabase.from('Property Overview').select('Location');
  
         
          if(propertyLocation){
            setLocation(propertyLocation);
          }
          setLoadingLocation(false)
        }catch(err){
          console.log(err)
          setLoadingLocation(false);
        }     
      }

      const onSubmitSearch = async (e) => {
          try{
            e.preventDefault();
            setLoadingSubmit(true);
            // road specific search
            if(selectedRoad){
            const { data: searchedRoadResults } = await Supabase.from('Property Overview').select().eq('Road', selectedRoad);
            const propertyId = searchedRoadResults.map(a => a["Property ID"])

  
            //search data specific to the overview
            const {data: propertyDataSearched} = await Supabase.from("PropData").select().in("PropertyID", propertyId);
            // console.log(propertyDataSearched);
              let searched = {
                roadResults: searchedRoadResults,
                road: selectedRoad,
                propertyData: propertyDataSearched
              }
              navigate('/search-results',{state: searched });
            }else {

          
              const { data: searchedLocationResults } = await Supabase.from('Property Overview').select().eq('Location', selectedLocation);
              // console.log(searchedLocationResults)
              const propertyId = searchedLocationResults.map(a => a["Property ID"])
              //search data specific to the overview
              const {data: propertyDataSearched} = await Supabase.from("PropData").select().in("PropertyID", propertyId);
              // console.log(propertyDataSearched);
                let searched = {
                  roadResults: searchedLocationResults,
                  location: selectedLocation,
                  propertyData: propertyDataSearched
                }
                navigate('/search-results',{state: searched });
            }
            setLoadingSubmit(false);
          }catch(err){
            console.log(err)
          }
      }

      useEffect(()=>{
        fetchProperties();  
      },[]);

      let uniqueLocations =  [...new Set(location.map((item) => item.Location))];
      let uniqueRoad =  [...new Set(propertyRoad.map((item) => item.Road))];
     

  return (
    <div className=''> 
        <GlobalHeader theme="light" />
        <div className="md:flex md:items-center overflow-hidden relative py-[80px] mb-24">
        <Parallax className="lg-no-parallax bg-cover cover-background w-full absolute top-[0px] left-0  xl:-top-[90px] " translateY={[-40, 40]} ></Parallax>
        <div className="absolute top-0 left-0 w-full h-full opacity-100 bg-[#08415c]"></div>
        <Container>
          <Row className="justify-center items-center h-[400px] md:h-[320px] xs:h-[200px]">
            <Col lg={7} md={9} className="relative flex flex-col justify-center items-center">
              <div className="text-center mb-[40px]">
                <h1 style={{color:"#f3efe0"}} className="text-[32px] leading-[49px] font-serif  font-medium mb-0 sm:text-[30px] sm:leading-[40px]">Search for Nairobi Property Data</h1>
              </div>
              <div className="relative w-full">
                  
                    <Space.Compact block size="large">
                      <Select 
                      className='my-select-container mr-1'
                      placeholder="Location"
                      size='large'
                     style={{width: '27%'}}
                     loading={loadingLocation}
                     onChange={onChange}
                     options= {uniqueLocations.map((a) =>{
                        return{
                          value:a,
                          label:a,
                        }
                       })}
                        />
                      <Select 
                      className='my-select-container'
                     size='large'
                    style={{width: '70%', borderRadius:"4px"}}
                    showSearch
                    suffixIcon={propertyRoad.length===0 ?
                    <Tooltip title="Select Location to search road data">
                    <InfoCircleOutlined style={{ color: 'orange' }} />
                  </Tooltip>:null }
                    loading={loadingRoad}
                    placeholder='Search road or leave blank to search by Location'
                    status={propertyRoad.length===0?"info":''}
                      optionFilterProp="children"
                       filterOption={filterOption}
                       options={uniqueRoad.map((a) =>{
                        return{
                          value:a,
                          label:a,
                        }
                       })}
                       onChange={((e)=> setSelectedRoad(e))}
                        />

              <Button className='' style={{ color:"#FFFFFF"}} icon={<i className="fas fa-search text-xs"></i>} loading={loadingSubmit} disabled={propertyRoad.length===0?true:false} onClick={onSubmitSearch}>
                <span className='text-xs font-semibold'>
                SEARCH
                </span>
                </Button>
              </Space.Compact>
              <p style={{color:"#f3efe0", textAlign:"center"}} className='mt-4 '>1 search = 1 token </p> 
              </div>
            </Col>
          </Row>
        </Container>
        </div>


        <Divider className="mt-8">Uncover Vital Property Insights </Divider>
    <RowAnt gutter={16} className='m-4' >
      <ColAnt className="gutter-row" span={8}>
      <Card style={{ width: 450, marginTop: 16,  height:320 }} >
        <Meta
          avatar={<Avatar size={64} style={{ backgroundColor: '#FFFFFF' }}  icon={<i className="line-icon-Search-People text-[#08415c]"></i>}/>}
          title="Search"
          description={
            <>
           <span> Access local property market data relevant in informing your investment objectives and Strategy</span>
           <br />
           <br />
            <p className='text-sm'>
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
      <Card style={{ width: 450, marginTop: 16 , height:320 }} >
        <Meta
          avatar={<Avatar size={64} style={{ backgroundColor: '#FFFFFF' }}  icon={<i className="line-icon-Bar-Chart text-[#08415c]"></i>}/>}
          title="Area Data"
          description={
            <>
           <span>Access hyperlocal data to help you identify the most attractive local areas within the city or neighbourhood.</span>
           <br />
           <br />
           <RowAnt gutter={8} >

            <ColAnt className='gutter-row' span={12}>

            <p className='text-sm'>
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
            <ColAnt className='gutter-row' span={12}>

            <p className='text-sm'>
           
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
      <Card style={{ width: 450, marginTop: 16, height:320 }} >
        <Meta
          avatar={<Avatar size={64} style={{ backgroundColor: '#FFFFFF' }}  icon={<i className="line-icon-Money-Bag text-[#08415c]"></i>}/>}
          title="Invest"
          description={
            <>
           <span> Search for optimal investment opportunity within your capital outlay.</span>
           <br />
           <br />

           <p className='text-sm'>
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
      </ColAnt>
    </RowAnt>


 
    <RowAnt gutter={16} className='m-4 mb-8' >
      <ColAnt className="gutter-row" span={8}>
      <Card style={{ width: 450, marginTop: 16,  height:150 }} >
        <Meta
          avatar={<Avatar size={64} style={{ backgroundColor: '#FFFFFF' }}  icon={<i className="line-icon-Pipe text-[#08415c]"></i>}/>}
          title="Project pipeline"
          description={
            <>
           <span>Access upcoming projects in your location of interest.</span>
           <br />
           <br />
            </>
          }
        />
      </Card>
      </ColAnt>
      <ColAnt className="gutter-row" span={8}>
      <Card style={{ width: 450, marginTop: 16 , height:150 }} >
        <Meta
          avatar={<Avatar size={64} style={{ backgroundColor: '#FFFFFF' }}  icon={<i className="line-icon-Bar-Chart3 text-[#08415c]"></i>}/>}
          title="Economic Data"
          description={
            <>
           <span>Access macro-economic data which plays an important role in shaping the real estate market.</span>
           <br />
           <br />
            </>
          }
        />
      </Card>
      </ColAnt>
      <ColAnt className="gutter-row" span={8}>
      <Card style={{ width: 450, marginTop: 16, height:150 }} >
        <Meta
          avatar={<Avatar size={64} style={{ backgroundColor: '#FFFFFF' }}  icon={<i className="line-icon-Dashboard text-[#08415c]"></i>}/>}
          title="Visuals"
          description={
            <>
           <span> Access modern, well detailed and easy to understand dashboards offering key insights on data points</span>
           <br />
           <br />
          
            </>
          }
        />
      </Card>
      </ColAnt>
    </RowAnt>
    </div>
  )
}

export default Search