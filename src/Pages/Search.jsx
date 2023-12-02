import React, { useContext, useEffect, useState } from 'react'
import GlobalHeader from '../Components/GlobalHeader'
import { Parallax } from 'react-scroll-parallax'
import { Col, Container, Form, Row } from 'react-bootstrap'
// import { Formik } from 'formik'
// import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { Supabase } from '../Functions/SupabaseClient'
import { Select} from 'antd';
// import Buttons from '../Components/Buttons'
import { fadeIn } from '../Functions/GlobalAnimations'
import GlobalContext from '../Context/Context'
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
    setHeaderHeight(154) 
    },[])

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
        <div className="md:flex md:items-center overflow-hidden relative py-[80px]">
        <Parallax className="lg-no-parallax bg-cover cover-background w-full absolute top-[0px] left-0  xl:-top-[90px] " translateY={[-40, 40]} ></Parallax>
        <div className="absolute top-0 left-0 w-full h-full opacity-100 bg-[#08415c]"></div>
        <Container>
          <Row className="justify-center items-center h-[400px] md:h-[320px] xs:h-[200px]">
            <Col lg={7} md={9} className="relative flex flex-col justify-center items-center">
              <div className="text-center mb-[40px]">
                <h1 style={{color:"#f3efe0"}} className="text-[32px] leading-[49px] font-serif  font-medium mb-0 sm:text-[30px] sm:leading-[40px]">Detailed Analysis on Property in Nairobi </h1>
              </div>
              <div className="relative w-full">
                    <div className="relative subscribe-style-05">
                      <Form className="relative">  
                   
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
                     suffixIcon={null}
                     loading={loadingRoad}
                      placeholder={propertyRoad.length===0?"Select Location to search road data":'Search road or leave blank to search by Location'}
                      status={propertyRoad.length===0?"error":''}
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
                        {/* <Input showErrorMsg={false} type="text" name="search" className="border-[1px] large-input border-solid border-transparent rounded-[4px]" placeholder="Type keywords to find answers" /> */}
                        <button style={{color:"#08415c"}} disabled={propertyRoad.length===0?true:false} onClick={onSubmitSearch} className={`text-xs py-[12px] !font-semibold px-[28px] uppercase xs:text-center}`}><i style={{color:"#08415c"}} className="fas fa-search text-xs leading-none mr-[10px] xs:mr-0"></i>{loadingSubmit?"Searching...":"search"}</button>
                      </Form>
                      <p style={{color:"#f3efe0", textAlign:"center"}} className='mt-4 '>1 search = 1 token </p>
                    </div>
 
             
              </div>
            </Col>
          </Row>
        </Container>
        </div>

              {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="items-center justify-center">
            <Col className="col-12 text-center mb-24">
              <span {...fadeIn} className="block font-serif mb-[18px]">Get accurate information to make informed property decisions</span>
              <h5 {...{ ...fadeIn, transition: { delay: 0.2 } }} className="font-serif text-darkgray font-semibold mb-0">Search For</h5>
            </Col>
          </Row>
          <Row className="justify-center gap-y-[30px]">
            <Col lg={6} md={9}>
              <div {...{ ...fadeIn, transition: { delay: 0.4 } }} className="rounded-[4px] bg-[#08415c] overflow-hidden p-16 flex">
                <div className="mr-[35px]">
                  <i className="line-icon-Money-Bag text-[60px] text-white"></i>
                </div>
                <div className="pl-[15px]">
                  <span className="font-serif text-xmd font-medium mb-[10px] block text-white">Market Prices</span>
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Access local property market data relevant in informing your investment objectives and Strategy</p>
                  {/* <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="Explore" /> */}
                </div>
              </div>
            </Col>
            <Col lg={6} md={9}>
              <div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="rounded-[4px] bg-[#3eb489] overflow-hidden p-16 flex">
                <div className="mr-[35px]">
                  <i className="line-icon-Bar-Chart text-[60px] text-white"></i>
                </div>
                <div className="pl-[15px]">
                  <span className="font-serif text-xmd font-medium mb-[10px] block text-white">Growth</span>
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Access local property market data relevant in informing your investment objectives and Strategy.</p>
                  {/* <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="explore" /> */}
                </div>
              </div>
            </Col>
            <Col lg={6} md={9}>
              <div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="rounded-[4px] bg-[#3eb489] overflow-hidden p-16 flex">
                <div className="mr-[35px]">
                  <i className="line-icon-Search-People text-[60px] text-white"></i>
                </div>
                <div className="pl-[15px]">
                  <span className="font-serif text-xmd font-medium mb-[10px] block text-white">Planning</span>
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Access local property market data relevant in informing your investment objectives and Strategy</p>
                  {/* <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="EXPLORE" /> */}
                </div>
              </div>
            </Col>
            <Col lg={6} md={9}>
              <div {...{ ...fadeIn, transition: { delay: 0.6 } }} className="rounded-[4px] bg-[#08415c] overflow-hidden p-16 flex">
                <div className="mr-[35px]">
                  <i className="line-icon-Bar-Chart3 text-[60px] text-white"></i>
                </div>
                <div className="pl-[15px]">
                  <span className="font-serif text-xmd font-medium mb-[10px] block text-white">Yields</span>
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Access local property market data relevant in informing your investment objectives and Strategy</p>
                  {/* <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="Explore" /> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}


    </div>
  )
}

export default Search