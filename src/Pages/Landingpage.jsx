import React from 'react'

// Libraries
import { Col,Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header, { HeaderNav, Menu, MobileMenu } from '../Components/Header';
import HeroCarousel from '../Components/HeroCarousel';
import Logo from "../Assets/img/1.png"
import Buttons from '../Components/Buttons';
const Landingpage = (props) =>{



    
  return (
    <div style={props.style}>
                    {/**<SideButtons /> */}
                    <div className="bg-white" >
     {/* Header Start */}
            <Header topSpace={{ md: true }} type="reverse-scroll">
                    <HeaderNav fluid="fluid" theme="dark" expand="lg" className="digital-agency-header py-[0px] px-[35px] md:px-[15px] md:py-[20px] sm:px-0" containerClass="md:pr-0">
                        <Col lg={2} sm={6} xs={"auto"} className="mr-auto ps-0">
                            <Link aria-label="header logo" className="flex items-center" to="/">
                                <Navbar.Brand className="inline-block p-0 m-0 mt-0">
                                    <img className="default-logo" loading="lazy" src={Logo} data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                                    <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-brownish-orange-green.webp' data-rjs='/assets/img/webp/logo-brownish-orange-green@2x.webp' alt='logo' />
                                    <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-brownish-orange-green.webp' data-rjs='/assets/img/webp/logo-brownish-orange-green@2x.webp' alt='logo' />
                                </Navbar.Brand>
                            </Link>
                        </Col>
                        <Menu className="justify-center col-auto col-lg-8 md:hidden" {...props} />
                        <MobileMenu className="order-last d-lg-none" type="full" {...props} />
                        <Col lg={2} xs={"auto"} className="justify-end pe-0 flex items-center">
                        <Link to="/login-register" className="text-[#F3EFE0] font-serif hover:text-[#3EB489]  mr-[2rem] p-2"><i className="line-icon-User mr-[1rem]"></i>Login</Link>
                        <Buttons ariaLabel="button" href="/login-register" className="btn-fill mx-[8px] font-medium uppercase rounded-[80px]" themeColor="#3EB489" color="#F3EFE0" size="md" title="Try free" />
                            {/*<SocialIcons theme="social-icon-style-01 block text-center" iconColor="light" size="xs" data={SocialIconsData} />*/}
                        </Col>
                    </HeaderNav>
                </Header>
                {/* Header End */}

                <HeroCarousel/>
       
            </div>             
    </div>
  )
}

export default Landingpage