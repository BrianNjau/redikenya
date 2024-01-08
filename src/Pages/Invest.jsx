import React from 'react'
import GlobalHeader from '../Components/GlobalHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Typed from 'react-typed';

import { fadeIn } from '../Functions/GlobalAnimations';
import { Link } from 'react-router-dom';
import MultiRangeSlider from '../Components/MultiRangeSlider';
import { Select } from 'antd';
const Invest = () => {

    let maxSliderNumber = 50000000

    const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
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
            strings={[ "PDI","Property Development & Investments", "Property Data & Insights"]}
            typeSpeed={80}
            backSpeed={80}
            loop
            showCursor
            cursorChar="|"/>
            </li>
           </ul>
         </Col>
       </Row>
     </Container>
   </section>

     {/* Section Start */}
     <section className="shopping-right-left-sidebar pt-0 py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] mt-8">
                <Container>
                    <Row>
                        <Col lg={9} md={8} className="pl-[55px] md:pl-[15px] sm:mb-[30px] order-md-2 order-1 sm:px-0">

                            {/* List data here  */}
                            {/* <ShopWide filter={false} grid="grid grid-3col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-large" data={shopWideData} /> */}
                        </Col>
                        <div className="col col-lg-3 col-md-4 shopping-sidebar inline-block order-md-1 order-2" {...fadeIn}>

                        <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[26px]">Filter By Market Price</span>
                                <MultiRangeSlider
                                    min={0}
                                    max={maxSliderNumber}
                                    onChange={({ min, max }) => (`min = ${min}, max = ${max}`)}
                                />
                            </div>

                            <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[20px]">Filter By Location</span>

                                <Select mode="multiple" size={"large"} placeholder="Please select" defaultValue={['a10', 'c12']}style={{width: '100%',}}options={options}
        />
                                {/* <ul className="list-style filter-color">
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#black"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#363636" }}></span>Carbon black</a><span className="item-qty">25</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#blue"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#657fa8" }}></span>Prussian blue</a><span className="item-qty">03</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#brown"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#936f5e" }}></span>Light brown</a><span className="item-qty">15</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#green"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#97a27f" }}></span>Parrot green</a><span className="item-qty">40</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#orange"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#b95b5b" }}></span>Dark orange</a><span className="item-qty">29</span></li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} target="_blank" href="#blue"><span className="product-cb paroduct-color-cb" style={{ backgroundColor: "#b7b5b5" }}></span>Slate blue</a><span className="item-qty">35</span></li>
                                </ul> */}
                            </div>
                        


                            <div className="border-b border-mediumgray pb-12 mb-12 relative">
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[20px]">Filter By Typology</span>
                                <ul className="list-style filter-category">
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#shirt"><span className="product-cb product-category-cb"></span>Studio</a>
                                    {/* <span className="item-qty">25</span> */}
                                    </li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#bags"><span className="product-cb product-category-cb"></span>1 Bedroom</a>
                                    {/* <span className="item-qty">05</span> */}
                                    </li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#shirt"><span className="product-cb product-category-cb"></span>2 Bedroom</a>
                                    {/* <span className="item-qty">36</span> */}
                                    </li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#t-shirt"><span className="product-cb product-category-cb"></span>3 Bedroom</a>
                                    {/* <span className="item-qty">05</span> */}
                                    </li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#skirts"><span className="product-cb product-category-cb"></span>4 Bedroom</a>
                                    {/* <span className="item-qty">09</span> */}
                                    </li>
                                    <li><a aria-label="product-category" rel="noreferrer" onClick={(e) => e.preventDefault()} href="#jacket"><span className="product-cb product-category-cb"></span>5 Bedroom</a>
                                    {/* <span className="item-qty">12</span> */}
                                    </li>
                                </ul>
                            </div>
                       
                           
                            <div>
                                <span className="shop-title relative font-serif font-medium text-darkgray block mb-[30px]">Filter By Sale Type </span>
                                <div className="tag-cloud d-inline-block margin-10px-top">
                                    <Link aria-label="product-tags-link" to="#">Off Plan</Link>
                                    <Link aria-label="product-tags-link" to="#">Occupation Ready</Link>
                                </div>
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