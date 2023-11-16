import React, {  useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from "react-scroll-parallax";
import IconWithText from './IconWithText/IconWithText';
import Typed from 'react-typed';
import {Swiper, SwiperSlide} from 'swiper/react'
import { fadeIn} from "../Functions/GlobalAnimations";
import { summaryData } from '../Data/SummaryData';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {Autoplay, EffectFade} from 'swiper/modules'
import HeroSelect from './HeroSelect';

const HeroCarousel = () => {
let combinedSummaryData = () =>{
    let numberSum = Object.values(summaryData).reduce((acc, curr) => (acc = acc + curr["number"]), 0); 
    let unitSum = Object.values(summaryData).reduce((acc, curr) => (acc = acc + curr["units"]), 0);
    let accerageSum = Object.values(summaryData).reduce((acc, curr) => (acc = acc + curr["accerage"]), 0);
    let priceSum = Object.values(summaryData).reduce((acc, curr) => (acc = acc + curr["price"]), 0);

    return {
        number: numberSum,
        units: unitSum,
        accerage: accerageSum,
        price: priceSum
    }  
}
    let [calculatedSummaryData, setCalculatedSummaryData] = useState(combinedSummaryData);
    let [selectedOption, setSelectedOption] = useState("all");

      let handleSelect = (option) => {

      setSelectedOption(option.target.value)

      if(option.target.value === "Kilimani"){
            setCalculatedSummaryData(summaryData.kilimani)
      } else
      if(option.target.value === "Kileleshwa"){
            setCalculatedSummaryData(summaryData.kileleshwa);
      } else
      if(option.target.value === "Westlands"){
            setCalculatedSummaryData(summaryData.westands);
      } else
      if(option.target.value === "Lavington"){
            setCalculatedSummaryData(summaryData.lavington);
      } else
      if(option.target.value === "Riverside"){
            setCalculatedSummaryData(summaryData.riverside);
      } else {
      if(option.target.value === "all"){
        setCalculatedSummaryData(combinedSummaryData);
      }
    }
    

    }
    const IconWithTextData_04 = [
        {
            icon: "line-icon-Home text-gradient bg-gradient-to-r from-[#3eb489] via-[#f3efe0] via[#3eb489] to-[#3eb489]",
            title: calculatedSummaryData.number,
            content: "Number of Properties",
        },
        {
            icon: "line-icon-Numbering-List text-gradient bg-gradient-to-r from-[#3eb489] via-[#f3efe0] via[#3eb489] to-[#3eb489]",
            title: calculatedSummaryData.units,
            content: "Number of Units",
        },
        {
            icon: "line-icon-Edit-Map text-gradient bg-gradient-to-r from-[#3eb489] via-[#f3efe0] via[#3eb489] to-[#3eb489]",
            title: calculatedSummaryData.accerage,
            content: "Aggregate Acreage",
        },
        {
            icon: "line-icon-Bank text-gradient bg-gradient-to-r from-[#3eb489] via-[#f3efe0] via[#3eb489] to-[#3eb489]",
            title: calculatedSummaryData.price.toString().length>9?(calculatedSummaryData.price/10**9).toFixed(2).toString()+"B":calculatedSummaryData.price.toString().length>6?(calculatedSummaryData.price/10**6).toFixed(2).toString()+"M":calculatedSummaryData.price,
            content: "Est. Market Value",
        },
    ]






  return (
    <Swiper 
    autoplay={{
        delay:2000,
        disableOnInteraction:false
    }}
    effect='fade'
    modules={[Autoplay,EffectFade]}
   >
       {/* Parallax Scrolling Start */}
    <SwiperSlide className="full-screen md:h-[600px] sm:h-[350px] md:flex md:items-center overflow-hidden relative bg-white">
      <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] sm:h-[70vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80` }}></Parallax>
           <div className="absolute top-0 left-0 h-full w-full opacity-80
            bg-gradient-to-b from-[#08415c] to-[#000000]"></div>
          <Container className="relative md:h-full">
            <Row className="h-[100vh] md:h-full">
                <Col className="flex flex-col">
     
                    <div className="flex flex-row items-center  mb-0 mt-[20vh]">
                    <span className="font-serif text-md text-[#3eb489] xs:text-xmd">Our Data Inventory</span>
                        <span className="bg-[#3eb489] w-[50%] h-[1px] ml-36 md:w-[70%] sm:ml-8 sm:w-[50px] xs:ml-8"></span>                   
                    </div>
                   
                    <div className=' w-full mt-[5vh] mb-[5vh]'>
                    <IconWithText
                    grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center gap-y-10"
                    theme="icon-with-text-04"
                    data={IconWithTextData_04}
                    animation={fadeIn}
                    animationDelay={6.5}
                    />
                    </div>
             
                    <h1 className="font-serif font-semibold text-white text-[65px] leading-[80px] w-[70%] mt-[2vh] tracking-[-5px] lg:text-[55px] lg:leading-[100px] md:text-[45px] md:leading-[85px] sm:text-[25px] sm:leading-[50px] sm:-tracking-[.5px] xs:w-[60%] xs:text-[60px] xs:leading-[65px]">
                                
                                <Typed
                                    className="font-semibold text-[#3eb489] text-[68px] "
                                    strings={["Elevate", "Inform"]}
                                    typeSpeed={40}
                                    backSpeed={40}
                                    loop
                                    showCursor
                                    cursorChar="|"
                                />
                                <span className="mr-[18px]"> the quality of your real estate investment decisions</span>
                            </h1>
                            <div className="relative subscribe-style-05">           
                            <HeroSelect selectedOption={selectedOption} calculatedSummaryData={calculatedSummaryData} handleSelect={handleSelect} />             
                    </div>

                    
                   

                    {/* <div className="flex flex-row items-center mt-auto mb-[7.5rem]">
                        <span className="bg-[#3eb489] w-[50%] h-[1px] mr-36 md:w-[40%] sm:mr-8 sm:w-[50px] xs:mr-8"></span>
                        <span className="font-serif font-semibold text-lg text-[#3eb489] xs:text-xmd">Property Market Overview</span>
                    </div> */}
         
                </Col>
            </Row>
        </Container>
    </SwiperSlide>
    {/* Parallax Scrolling End */}


       {/* Parallax Scrolling Start */}
       <SwiperSlide className="full-screen md:h-[600px] sm:h-[350px] md:flex md:items-center overflow-hidden relative bg-white">
        <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] sm:h-[70vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://images.unsplash.com/photo-1596005554384-d293674c91d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2698&q=80` }}></Parallax>
        <div className="absolute top-0 left-0 h-full w-full opacity-80
         bg-gradient-to-b from-[#08415c] to-[#000000]"></div>
        <Container className="relative md:h-full">
            <Row className="h-[100vh] md:h-full  ">
                <Col className="flex flex-col">
     
                <div className="flex flex-row items-center  mb-0 mt-[20vh]">
                    <span className="font-serif text-md text-[#3eb489] xs:text-xmd">Our Data Inventory</span>
                        <span className="bg-[#3eb489] w-[50%] h-[1px] ml-36 md:w-[70%] sm:ml-8 sm:w-[50px] xs:ml-8"></span>                   
                    </div>
                    <div className='w-full mt-[5vh] mb-[5vh]'>
    
                    <IconWithText 
        grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center gap-y-10"
        theme="icon-with-text-04"
        data={IconWithTextData_04}
        animation={fadeIn}
        animationDelay={0.5}
        />

                    </div>

<h1 className="font-serif font-semibold text-white text-[65px] mt-[2vh] leading-[80px] w-[75%] tracking-[-5px] lg:text-[55px] lg:leading-[100px] md:text-[45px] md:leading-[85px] sm:text-[25px] sm:leading-[50px] sm:-tracking-[.5px] xs:w-[60%] xs:text-[60px] xs:leading-[65px]">
                                
                                <Typed
                                    className="font-bold text-[#3eb489]"
                                    strings={[ "Improve","Assure"]}
                                    typeSpeed={40}
                                    backSpeed={40}
                                    loop
                                    showCursor
                                    cursorChar="|"
                                />
                                <span className="mr-[18px]"> the quality of your real estate investment decisions</span>
                            </h1>
                   
                    
                            <div className="relative  subscribe-style-07">

                            <HeroSelect selectedOption={selectedOption} handleSelect={handleSelect} />
                            </div>

                   
                    <div>
    
                    </div>
                    {/* <div className="flex flex-row items-center mt-auto mb-[7.5rem]">
                        <span className="bg-[#3eb489] w-[50%] h-[1px] mr-36 md:w-[40%] sm:mr-8 sm:w-[50px] xs:mr-8"></span>
                        <span className="font-serif font-semibold text-lg text-[#3eb489] xs:text-xmd">Property Market Overview</span>
                    </div> */}
         
                </Col>
            </Row>
        </Container>
    </SwiperSlide>
    {/* Parallax Scrolling End */}
       {/* Parallax Scrolling Start */}
       <SwiperSlide className="full-screen md:h-[600px] sm:h-[350px] md:flex md:items-center overflow-hidden relative bg-white">
        <Parallax className="lg-no-parallax bg-cover absolute top-[0px] left-0 md:-top-[30px] w-full h-[100vh] sm:h-[70vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://images.pexels.com/photos/14168997/pexels-photo-14168997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1` }}></Parallax>
        <div className="absolute top-0 left-0 h-full w-full opacity-80
         bg-gradient-to-b from-[#08415c] to-[#000000]"></div>
        <Container className="relative md:h-full">
            <Row className="h-[100vh] md:h-full  ">
                <Col className="flex flex-col">
     
                <div className="flex flex-row items-center  mb-0 mt-[20vh]">
                    <span className="font-serif text-md text-[#3eb489] xs:text-xmd">Our Data Inventory</span>
                        <span className="bg-[#3eb489] w-[50%] h-[1px] ml-36 md:w-[70%] sm:ml-8 sm:w-[50px] xs:ml-8"></span>                   
                    </div>
                    <div className='w-full mt-[5vh] mb-[5vh]'>
    
                    <IconWithText 
        grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center gap-y-10"
        theme="icon-with-text-04"
        data={IconWithTextData_04}
        animation={fadeIn}
        animationDelay={0.5}
        />

                    </div>

<h1 className="font-serif font-semibold text-white text-[65px] mt-[2vh] leading-[80px] w-[75%] tracking-[-5px] lg:text-[55px] lg:leading-[100px] md:text-[45px] md:leading-[85px] sm:text-[25px] sm:leading-[50px] sm:-tracking-[.5px] xs:w-[60%] xs:text-[60px] xs:leading-[65px]">
                                
                                <Typed
                                    className="font-bold text-[#3eb489]"
                                    strings={[ "Refine","Enrich"]}
                                    typeSpeed={40}
                                    backSpeed={40}
                                    loop
                                    showCursor
                                    cursorChar="|"
                                />
                                <span className="mr-[18px]"> the quality of your real estate investment decisions</span>
                            </h1>
                   
                    
                            <div className="relative  subscribe-style-07">

                            <HeroSelect selectedOption={selectedOption} handleSelect={handleSelect} />
                            </div>

                   
                    <div>
    
                    </div>
                    {/* <div className="flex flex-row items-center mt-auto mb-[7.5rem]">
                        <span className="bg-[#3eb489] w-[50%] h-[1px] mr-36 md:w-[40%] sm:mr-8 sm:w-[50px] xs:mr-8"></span>
                        <span className="font-serif font-semibold text-lg text-[#3eb489] xs:text-xmd">Property Market Overview</span>
                    </div> */}
         
                </Col>
            </Row>
        </Container>
    </SwiperSlide>
    {/* Parallax Scrolling End */}
    </Swiper>
    

    
  )
}

export default HeroCarousel