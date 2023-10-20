import React from 'react'
import GlobalHeader from '../Components/GlobalHeader'
import { Col, Container, Row } from 'react-bootstrap'
import { Parallax } from 'react-scroll-parallax'
import { fadeIn } from '../Functions/GlobalAnimations'

import { SwiperSlide, Swiper } from 'swiper/react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
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
      const labels = ['2020', '2022', '2023'];
      const data = {
        labels,
        datasets: [
          {
            label: 'Sum of country population',
            data: [51985780, 54027487, 55100586],
            backgroundColor: 'rgba(8, 65, 92)',
          },
          {
            label: 'Sum of urban population',
            data: [14975059, 16264626,16943167],
            backgroundColor: 'rgba(62, 180, 137)',
          },
        ],
      };
      
      let chart1 = <Bar options={options} data={data}  />

      const lineChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sum of Rate by Year',
          },
        },
      };
      const lineChartLabel = ['2019','2020','2021','2022','2023'];
      const lineData = {
        labels: lineChartLabel,
        datasets: [
          {
            label: 'Sum of Rate %',
            data: [4.8, 4.6, 2.4, 6.2, 5.3],
            borderColor: 'rgb(8, 65, 92)',
            backgroundColor: 'rgba(62, 180, 137)',
          },
        ],
      };

      let line1 = <Line options={lineChartOptions} data={lineData} />;

      const barCounty1Options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sum of Number of Buildings Completed per Year ',
          },
        },
      };
      const barChart1Labels = ['2018','2019','2020','2021', '2022'];
      const countyBar1Data = {
        labels:barChart1Labels,
        datasets: [
          {
            label: 'Sum of competed buildings per year',
            data: [12725,13976,16248,13350,20025],
            backgroundColor: 'rgba(62, 180, 137)',
          },
        ],
      };
      
      let countyChart2 = <Bar options={barCounty1Options} data={countyBar1Data}  />
      const barCounty2Options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sum of value of Buildings Approved By NCCG per Year',
          },
        },
      };
      const barChart2Labels = ['2018','2019','2020','2021', '2022'];
      const countyBar2Data = {
        labels:barChart2Labels,
        datasets: [
          {
            label: 'Sum of value of Buildings Approved By NCCG per Year',
            data: [210297000000,207625000000,153575000000,102856000000,162454000000],
            backgroundColor: 'rgba(8, 65, 92)',
          },
        ],
      };
      
      let countyChart3 = <Bar options={barCounty2Options} data={countyBar2Data}  />
      

      const swiperData = [
        {
         content: chart1
        },
        {
          content: line1
        },
      ]


      const lineChartOptions2 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Est. Nairobi Population by Year',
          },
        },
      };
      const lineChartLabel2 = ['2020','2021','2022','2023','2025', '2030', '2035'];
      const lineData2 = {
        labels: lineChartLabel2,
        datasets: [
          {
            label: 'Est. Population by Year',
            data: [4734881,4922192,5111844,5325160,5766989,7030891,8499403],
            borderColor: 'rgb(8, 65, 92)',
            backgroundColor: 'rgba(62, 180, 137)',
          },
        ],
      };

      let line2 = <Line options={lineChartOptions2} data={lineData2} />;


      const swiperCountyData = [
        {
         content: line2
        },
        {
          content: countyChart2
        },
        {
          content: countyChart3
        },
      ]



    const countrySwiperRef = React.useRef(0)
    const countySwiperRef = React.useRef(1)
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
        <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[70vh]" translateY={[-50, 50]} style={{ backgroundImage: `url(/assets/img/webp/our-services-17.webp)` }}></Parallax>
        <Container>
          <Row>
            <Col xl={7} lg={8} md={12} className="md:mb-[40px]">
              <Row>
                <Col className="relative mb-12 lg:mb-[40px] sm:mb-[7.5rem] xs:mb-[4.5rem]">
                  <span className="font-serif mb-[20px] text-gradient bg-gradient-to-r from-[#08415c] via-[#08415c] to-[#08415c] inline-block uppercase font-medium tracking-[1px]">Economics</span>
                  <h5 className="font-serif font-semibold text-darkgray">Country Data</h5>
                  <p className="w-[80%] mb-[4.5rem] md:w-full">Stay updated with the state of Kenya's real estate scene. Discover country insights and make more informed decisions</p>
                  <div className="flex">
                    <div onClick={() => countrySwiperRef.current.swiper.slidePrev()} className="btn-slider-next transition-default rounded-full flex justify-center items-center text-black bg-transparent border-[1px] border-mediumgray right-inherit left-[65px] h-[40px] w-[40px] cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white">
                      <button className="text-xmd leading-none"><i className="feather-arrow-left"></i></button>
                    </div>
                    <div onClick={() => countrySwiperRef.current.swiper.slideNext()} className="btn-slider-prev transition-default rounded-full flex justify-center items-center text-black right-inherit border-[1px] border-mediumgray h-[40px] w-[40px] ml-[10px] cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white" >
                      <button className="text-xmd leading-none"><i className="feather-arrow-right"></i></button>
                    </div>
                  </div>
                </Col>
                <Col>
                  <Swiper
                    ref={countrySwiperRef}
                    effect="slide"
                   
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    slidesPerView={1} loop={true}>
                    {
                      swiperData.map((item, i) => {
                        return (
                          <SwiperSlide key={i}>
                            <div className="border border-mediumgray w-full rounded-[4px] overflow-hidden mr-[5px] xs:mr-0">

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
                <div className="ourservice-list relative bg-gradient-to-bl from-[#08415c] to-[#08415c] w-full overflow-hidden rounded-[4px] p-16 lg:p-12 md:p-16">
                  <i className="line-icon-Cursor-Click2 text-[11rem] leading-[11rem]  text-darkgray opacity-20 absolute -top-[20px] -left-[30px]"></i>
                  <h6 className="font-serif font-medium text-[#f3efe0] mb-[35px] sm:mb-[15px] relative z-[1]">Data Breakdown</h6>
                  <ul className="list-style-03 font-serif">
                    <li style={{color:"#f3efe0"}} className="border-[#f3efe0] text-[#f3efe0] !py-[10px] px-0 border-b mb-0">Est. Country Population : 55M</li>
                    <li style={{color:"#f3efe0"}} className="border-[#f3efe0] text-[#f3efe0] !py-[10px] px-0 border-b mb-0">Est. of Urban Population : 30.75%</li>
                    <li style={{color:"#f3efe0"}} className="border-[#f3efe0] text-[#f3efe0] !py-[10px] px-0 border-b mb-0">Country GDP Growth Q1: 5.3%</li>
                    
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}



    {/* Section Start */}
    <section id="services" className="bg-lightgray relative py-[130px] lg:py-[90px] sm:py-[75px] xs:py-[50px]" {...fadeIn}>
        <Parallax className="lg-no-parallax bg-cover absolute -top-[50px] left-0 w-full h-[70vh]" translateY={[-50, 50]} style={{ backgroundImage: `url(/assets/img/webp/our-services-17.webp)` }}></Parallax>
        <Container>
          <Row>
            <Col xl={7} lg={8} md={12} className="md:mb-[40px]">
              <Row>
                <Col className="relative mb-12 lg:mb-[40px] sm:mb-[7.5rem] xs:mb-[4.5rem]">
                  <span className="font-serif mb-[20px] text-gradient bg-gradient-to-r from-[#08415c] via-[#08415c] to-[#08415c] inline-block uppercase font-medium tracking-[1px]">Economics</span>
                  <h5 className="font-serif font-semibold text-darkgray">Nairobi County Data</h5>
                  <p className="w-[80%] mb-[4.5rem] md:w-full">Stay updated with the state of Kenya's real estate scene. Discover county insights and make more informed decisions</p>
                  <div className="flex">
                    <div onClick={() => countySwiperRef.current.swiper.slidePrev()} className="btn-slider-next transition-default rounded-full flex justify-center items-center text-black bg-transparent border-[1px] border-mediumgray right-inherit left-[65px] h-[40px] w-[40px] cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white">
                      <button className="text-xmd leading-none"><i className="feather-arrow-left"></i></button>
                    </div>
                    <div onClick={() => countySwiperRef.current.swiper.slideNext()} className="btn-slider-prev transition-default rounded-full flex justify-center items-center text-black right-inherit border-[1px] border-mediumgray h-[40px] w-[40px] ml-[10px] cursor-pointer hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:border-white hover:bg-white" >
                      <button className="text-xmd leading-none"><i className="feather-arrow-right"></i></button>
                    </div>
                  </div>
                </Col>
                <Col>
                  <Swiper
                    ref={countySwiperRef}
                    effect="slide"
                   
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    slidesPerView={1} loop={true}>
                    {
                      swiperCountyData.map((item, i) => {
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
                <div className="ourservice-list relative bg-gradient-to-bl from-[#08415c] to-[#08415c] w-full overflow-hidden rounded-[4px] p-16 lg:p-12 md:p-16">
                  <i className="line-icon-Cursor-Click2 text-[11rem] leading-[11rem]  text-darkgray opacity-20 absolute -top-[20px] -left-[30px]"></i>
                  <h6 className="font-serif font-medium text-[#f3efe0] mb-[35px] sm:mb-[15px] relative z-[1]">Data Breakdown</h6>
                  <ul className="list-style-03 font-serif">
                    <li style={{color:"#f3efe0"}} className="border-[#f3efe0] text-[#f3efe0] !py-[10px] px-0 border-b mb-0">Completed Buildings in 2022 : 20K</li>
                    <li style={{color:"#f3efe0"}} className="border-[#f3efe0] text-[#f3efe0] !py-[10px] px-0 border-b mb-0">Value of Buildings Approved : 162Bn</li>
                    <li style={{color:"#f3efe0"}} className="border-[#f3efe0] text-[#f3efe0] !py-[10px] px-0 border-b mb-0">Sum of Population : 5M</li>
                    
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