import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from "react-scroll-parallax";
import IconWithText from './IconWithText/IconWithText';
import {IconWithTextData_04} from './IconWithText/IconWithTextData';
import Typed from 'react-typed';
import {Swiper, SwiperSlide} from 'swiper/react'
import { fadeIn} from "../Functions/GlobalAnimations";

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {Autoplay, EffectFade} from 'swiper/modules'

const HeroCarousel = () => {
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
     
          {/* <div className="flex flex-row items-center  mb-0">
              <span className="font-serif text-lg text-[#3eb489] xs:text-xmd">Property Market Overview</span>
                        <span className="bg-[#3eb489] w-[50%] h-[1px] ml-36 md:w-[70%] sm:ml-8 sm:w-[50px] xs:ml-8"></span>                   
                    </div>
                    */}
                    <div className='mt-8 mb-0 w-full mt-[20rem] mb-[10rem]'>
                    <IconWithText
        grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center gap-y-10"
        theme="icon-with-text-04"
        data={IconWithTextData_04}
        animation={fadeIn}
        animationDelay={6.5}
        />
                    </div>
             
                    <h1 className="font-serif font-semibold text-white text-[65px] leading-[80px] w-[70%] mt-[6rem] tracking-[-5px] lg:text-[55px] lg:leading-[100px] md:text-[45px] md:leading-[85px] sm:text-[25px] sm:leading-[50px] sm:-tracking-[.5px] xs:w-[60%] xs:text-[60px] xs:leading-[65px]">
                                
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

                            <div className="relative w-[40rem] subscribe-style-05">
                     
                        <select name="search" className="border-[1px] large-input border-solid border-transparent rounded-[4px]">
                        <option>Westlands</option>
                        <option>Lavington</option>
                        </select>
                        <button type="submit" className={`text-xs py-[12px] !font-semibold px-[28px] uppercase }`}><i className="fas fa-search text-white text-xs leading-none mr-[10px] xs:mr-0"></i>search</button>
                  
                    </div>

                    
                   

                    <div className="flex flex-row items-center mt-auto mb-[7.5rem]">
                        <span className="bg-[#3eb489] w-[50%] h-[1px] mr-36 md:w-[40%] sm:mr-8 sm:w-[50px] xs:mr-8"></span>
                        <span className="font-serif font-semibold text-lg text-[#3eb489] xs:text-xmd">Property Market Overview</span>
                    </div>
         
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
     
          {/* <div className="flex flex-row items-center  mb-0">
              <span className="font-serif text-lg text-[#3eb489] xs:text-xmd">Property Market Overview</span>
                        <span className="bg-[#3eb489] w-[50%] h-[1px] ml-36 md:w-[70%] sm:ml-8 sm:w-[50px] xs:ml-8"></span>                   
                    </div>
                    */}
                    <div className='mt-8 mb-0 w-full mt-[20rem] mb-[10rem]'>
                    <IconWithText
        grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 text-center gap-y-10"
        theme="icon-with-text-04"
        data={IconWithTextData_04}
        animation={fadeIn}
        animationDelay={0.5}
        />
                    </div>
                    <h1 className="font-serif font-semibold text-white text-[65px] leading-[80px] w-[70%] mt-[6rem] tracking-[-5px] lg:text-[55px] lg:leading-[100px] md:text-[45px] md:leading-[85px] sm:text-[25px] sm:leading-[50px] sm:-tracking-[.5px] xs:w-[60%] xs:text-[60px] xs:leading-[65px]">
                                
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
                    
                            <div className="relative w-[40rem] subscribe-style-05">
                     
                     <select name="search" className="border-[1px] large-input border-solid border-transparent rounded-[4px]">
                     <option>Westlands</option>
                     <option>Lavington</option>
                     </select>
                     <button type="submit" className={`text-xs py-[12px] !font-semibold px-[28px] uppercase }`}><i className="fas fa-search text-white text-xs leading-none mr-[10px] xs:mr-0"></i>search</button>
               
                 </div>

                   
                    <div>
    
                    </div>
                    <div className="flex flex-row items-center mt-auto mb-[7.5rem]">
                        <span className="bg-[#3eb489] w-[50%] h-[1px] mr-36 md:w-[40%] sm:mr-8 sm:w-[50px] xs:mr-8"></span>
                        <span className="font-serif font-semibold text-lg text-[#3eb489] xs:text-xmd">Property Market Overview</span>
                    </div>
         
                </Col>
            </Row>
        </Container>
    </SwiperSlide>
    {/* Parallax Scrolling End */}
    </Swiper>
    

    
  )
}

export default HeroCarousel