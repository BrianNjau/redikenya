import React from 'react'
import GlobalHeader from '../Components/GlobalHeader'
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax'
import { fadeIn } from '../Functions/GlobalAnimations'
import Buttons from '../Components/Buttons'
import { SwiperSlide, Swiper } from 'swiper/react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { faker } from '@faker-js/faker';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  


const Economics = () => {


      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sum of Country population, Sum of urban population ',
          },
        },
      };
      const labels = ['2020', '2021', '2022'];
      const data = {
        labels,
        datasets: [
          {
            label: 'Sum of country population',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Sum of urban population',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      
      let chart1 = <Bar options={options} data={data}  />
      

      

      const swiperData = [
        {
         content: chart1
        },
        {
          img: "https://via.placeholder.com/800x548",
          title: "Exposure strategy",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
        },
        {
          img: "https://via.placeholder.com/800x548",
          title: "Multilingual portals",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
        }
      ]



    const swiperRef = React.useRef(null)
  return (
    <div className="bg-white">
    <GlobalHeader theme="light"/>
    {/* Section Start */}
   <section className="bg-lightgray py-[25px]">
     <Container>
       <Row className="items-center justify-center">
         <Col xl={8} lg={6}>
          {/* <h1 className="font-serif text-darkgray font-medium mb-0 text-lg md:text-center"></h1> */} 
         </Col>
         <Col xl={4} lg={6} className="breadcrumb mb-0 justify-end font-serif md:justify-center sm:mt-[10px] text-sm">
           <ul className="xs-text-center">
             <li>Economics</li>
             <li>Redi Kenya</li>
           </ul>
         </Col>
       </Row>
     </Container>
   </section>
   {/* Section End */}

    {/* Section Start */}
    <section id="services" className="relative py-[130px] lg:py-[90px] sm:py-[75px] xs:py-[50px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[100vh]" translateY={[-50, 50]} style={{ backgroundImage: `url(/assets/img/webp/our-services-17.webp)` }}></Parallax>
        <Container>
          <Row>
            <Col xl={7} lg={8} md={12} className="md:mb-[40px]">
              <Row>
                <Col className="relative mb-12 lg:mb-[40px] sm:mb-[7.5rem] xs:mb-[4.5rem]">
                  <span className="font-serif mb-[20px] text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] inline-block uppercase font-medium tracking-[1px]">Economics</span>
                  <h5 className="font-serif font-semibold text-darkgray">Country Data</h5>
                  <p className="w-[80%] mb-[4.5rem] md:w-full">Stay updated with the state of Kenya's real estate scene. Discover country insights and make more informed decisions</p>
                  <div className="flex">
                    <div onClick={() => swiperRef.current.swiper.slidePrev()} className="btn-slider-next transition-default rounded-full flex justify-center items-center text-black bg-transparent border-[1px] border-mediumgray right-inherit left-[65px] h-[40px] w-[40px] cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white">
                      <button className="text-xmd leading-none"><i className="feather-arrow-left"></i></button>
                    </div>
                    <div onClick={() => swiperRef.current.swiper.slideNext()} className="btn-slider-prev transition-default rounded-full flex justify-center items-center text-black right-inherit border-[1px] border-mediumgray h-[40px] w-[40px] ml-[10px] cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white" >
                      <button className="text-xmd leading-none"><i className="feather-arrow-right"></i></button>
                    </div>
                  </div>
                </Col>
                <Col>
                  <Swiper
                    ref={swiperRef}
                    effect="slide"
                   
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    slidesPerView={1} loop={true}>
                    {
                      swiperData.map((item, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <div className="border border-mediumgray rounded-[4px] overflow-hidden mr-[5px] xs:mr-0">

                                {item.content}
                                {/**  <Row className="g-0 row-cols-1 row-cols-sm-2">
                                <Col className="cover-background xs:h-[250px]" style={{ backgroundImage: `url(${item.img})` }}>
                                </Col>
                                <Col>
                                  <div className="p-16 lg:p-12">
                                    <span className="font-serif text-darkgray font-medium inline-block mb-[15px] text-xmd">{item.title}</span>
                                    <p className="mb-[25px]">{item.content}</p>
                                    <Buttons href="/page/about-us" className="btn-fill font-medium font-serif uppercase rounded md:mb-[15px]" themeColor="#232323" color="#fff" size="xs" title="read more" />
                                  </div>
                                </Col>
                              </Row>*/}


                             
                            </div>
                          </SwiperSlide>
                        )
                      })
                    }
                  </Swiper>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={12} xl={{ offset: 1 }}>
              <div className="sticky top-0">
                <div className="ourservice-list relative bg-gradient-to-bl from-[#741bd9] to-[#0039e3] w-full overflow-hidden rounded-[4px] p-16 lg:p-12 md:p-16">
                  <i className="line-icon-Cursor-Click2 text-[11rem] leading-[11rem]  text-darkgray opacity-20 absolute -top-[20px] -left-[30px]"></i>
                  <h6 className="font-serif font-medium text-white mb-[35px] sm:mb-[15px] relative z-[1]">Data Breakdown</h6>
                  <ul className="list-style-03 font-serif">
                    <li className="border-[#ffffff33] text-white !py-[10px] px-0 border-b mb-0">Est. Country Population : 55M</li>
                    <li className="border-[#ffffff33] text-white !py-[10px] px-0 border-b mb-0">Est. of Urban Population : 30.75%</li>
                    <li className="border-[#ffffff33] text-white !py-[10px] px-0 border-b mb-0">Country GDP Growth Q1: 5.3%</li>
                    
                  </ul>
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

export default Economics