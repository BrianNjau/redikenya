import React from 'react'
import Header, { HeaderNav, Menu, MobileMenu } from './Header'
import { Col, Navbar } from 'react-bootstrap'
import LogoLight from "../Assets/img/lwhite.png"
import LogoDark from "../Assets/img/logo.png"
import { Link } from 'react-router-dom'
import { Image } from 'antd'

const GlobalHeader = (props) => {
  return (
    <section>
    {/**   theme can be configured as 'light' or 'dark' */}
     {/* Header Start */}
     <Header topSpace={{ desktop: true }} type="reverse-scroll">
     <HeaderNav fluid="fluid" theme={props.theme} expand="lg" className="digital-agency-header py-[0px] px-[35px] md:px-[15px] md:py-[20px] sm:px-0" containerClass="md:pr-0">
         <Col lg={2} sm={6} xs={"auto"} className="mr-auto ps-0">
             <Link aria-label="header logo" className="flex items-center" to="/">
                 <Navbar.Brand className="inline-block p-0 m-0 mt-0">
                     <Image preview={false} className="default-logo p-1" width={120}  src={(props.theme==="dark")?LogoLight:LogoDark}  alt='logo' />
                     <Image preview={false} className="mobile-logo   right-8" width={100}  src={LogoDark} alt='logo' />
                     <Image className="alt-logo p-1" src={(props.theme==="dark")?LogoLight:LogoDark} width={120} preview={false} alt='logo' />
                    
                 </Navbar.Brand>
             </Link>
         </Col>
         <Menu className="justify-center col-auto col-lg-8 md:hidden" {...props} />
         <MobileMenu className="order-last d-lg-none" type="full" {...props} />
         <Col lg={2} xs={"auto"} className="justify-end pe-0 flex items-center">
           {/*  <Link to="/login-register" className="text-[#F3EFE0] font-serif hover:text-[#3EB489]  mr-[2rem] p-2"><i className="line-icon-User mr-[1rem]"></i>Login</Link>
                 <Buttons ariaLabel="button" href="/login-register" className="btn-fill mx-[8px] font-medium uppercase rounded-[80px]" themeColor="#3EB489" color="#F3EFE0" size="md" title="Try free" />
             */}
              {/*<SocialIcons theme="social-icon-style-01 block text-center" iconColor="light" size="xs" data={SocialIconsData} />*/}
        
         </Col>
     </HeaderNav>
 </Header>
 {/* Header End */}
   </section>
  )
}

export default GlobalHeader