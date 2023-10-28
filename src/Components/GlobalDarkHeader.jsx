import React from 'react'
import Header, { HeaderCart, HeaderLanguage, HeaderNav, Menu, SearchBar } from './Header'
import { Parallax } from 'react-scroll-parallax'
import { Col, Container, Form, Navbar, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import { Input } from './Form'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

const GlobalDarkHeader = (props) => {
    const navigate = useNavigate()
  return (
    <>
          {/* Header Start */}
          <Header topSpace={{ md: true }} type="reverse-scroll">
          <HeaderNav theme="dark" expand="lg" className="py-[0px] lg:px-[15px] md:px-0">
            <Col className="col-auto col-sm-6 col-lg-2 me-auto ps-lg-0 xs:!px-0">
              <Link aria-label="header logo" className="flex items-center" to="/">
                <Navbar.Brand className="inline-block p-0 m-0">
                  <img className="default-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-white.webp' data-rjs='/assets/img/webp/logo-white@2x.webp' alt='logo' />
                  <img className="alt-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                  <img className="mobile-logo" width="111" height="36" loading="lazy" src='/assets/img/webp/logo-fast-blue-black.webp' data-rjs='/assets/img/webp/logo-fast-blue-black@2x.webp' alt='logo' />
                </Navbar.Brand>
              </Link>
            </Col>
            <div className="col-auto hidden order-last md:block xs:!pr-0">
              <Navbar.Toggle className="md:ml-[10px] sm:ml-0">
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
                <span className="navbar-toggler-line"></span>
              </Navbar.Toggle>
            </div>
            <Navbar.Collapse className="col-auto px-0 justify-end">
              <Menu {...props} />
            </Navbar.Collapse>
            <Col className="col-auto text-right pe-0">
              <SearchBar className="pr-0 xs:pl-[15px]" />
              <HeaderLanguage className="xs:pl-[15px]" />
              <HeaderCart className="xs:pl-[15px]" style={{ "--base-color": "#0038e3" }} />
            </Col>
          </HeaderNav>
        </Header>
        {/* Header End */}
    
        {/* Parallax section End */}
        <div className="md:flex md:items-center overflow-hidden relative py-[80px]">
          <Parallax className="lg-no-parallax bg-cover cover-background w-full h-[100vh] absolute top-[0px] left-0 xl:h-[700px] xl:-top-[90px] xs:h-[480px]" translateY={[-40, 40]} style={{ backgroundImage: `url(https://via.placeholder.com/1920x1100)` }}></Parallax>
          <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-darkgray"></div>
          <Container>
            <Row className="justify-center items-center h-[400px] md:h-[320px] xs:h-[200px]">
              <Col lg={7} md={9} className="relative flex flex-col justify-center items-center">
                <div className="text-center mb-[40px]">
                  <h1 className="text-[42px] leading-[49px] font-serif text-white font-medium mb-0 sm:text-[30px] sm:leading-[40px]">How can we help you?</h1>
                </div>
                <div className="relative w-full">
                  <Formik
                    initialValues={{ search: '' }}
                    validationSchema={Yup.object().shape({ search: Yup.string().required("Field is required.") })}
                    onSubmit={async (values, actions) => {
                      await new Promise((r) => setTimeout(r, 500));
                      actions.resetForm()
                      navigate('/blogs/blog-grid', { state: { search: values } })
                    }}
                  >
                    {({ isSubmitting, status }) => (
                      <div className="relative subscribe-style-05">
                        <Form className="relative">
                          <Input showErrorMsg={false} type="text" name="search" className="border-[1px] large-input border-solid border-transparent rounded-[4px]" placeholder="Type keywords to find answers" />
                          <button type="submit" className={`text-xs py-[12px] !font-semibold px-[28px] uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i className="fas fa-search text-fastblue text-xs leading-none mr-[10px] xs:mr-0"></i>search</button>
                        </Form>
                      </div>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Parallax section End */}
        </>
  )
}

export default GlobalDarkHeader