import React from 'react'
import GlobalHeader from '../Components/GlobalHeader'
import { Parallax } from 'react-scroll-parallax'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'

import { Select } from 'antd';
import Buttons from '../Components/Buttons'
import { fadeIn } from '../Functions/GlobalAnimations'
const Search = () => {

    const navigate = useNavigate()


    const onChange = (value) => {
      console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
      console.log('search:', value);
    };
    
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


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

                   

                      <Select 
                      className='my-select-container'
                     size='large'
                    style={{width: '100%', borderRadius:"4px"}}
                    showSearch
                    suffixIcon={null}
                      placeholder="Select road to search. Eg. ngong road"
                      optionFilterProp="children"
                      onChange={onChange}
                       onSearch={onSearch}
                       filterOption={filterOption}
                       options={[
                          {
                          value: 'othaya Road',
                          label: 'othaya Road',
                          },
                         {
                          value: 'muthangari Road',
                          label: 'muthangari Road',
                          },
                          {
                          value: 'ngong Road',
                           label: 'ngong Road',
                     },
                      ]}
                        />
                        {/* <Input showErrorMsg={false} type="text" name="search" className="border-[1px] large-input border-solid border-transparent rounded-[4px]" placeholder="Type keywords to find answers" /> */}
                        <button style={{color:"#08415c"}} type="submit" className={`text-xs py-[12px] !font-semibold px-[28px] uppercase xs:text-center${isSubmitting ? " loading" : ""}`}><i style={{color:"#08415c"}} className="fas fa-search text-xs leading-none mr-[10px] xs:mr-0"></i>search</button>
                      </Form>
                      <p style={{color:"#f3efe0", textAlign:"center"}} className='mt-4 '>1 search = 1 token </p>
                    </div>
                  )}
                </Formik>
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
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Lorem ipsum is simply dummy text of the and typesetting industry lorem ipsum.</p>
                  <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="Explore" />
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
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Lorem ipsum is simply dummy text of the and typesetting industry lorem ipsum.</p>
                  <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="explore" />
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
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Lorem ipsum is simply dummy text of the and typesetting industry lorem ipsum.</p>
                  <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="EXPLORE" />
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
                  <p className="text-white opacity-60 w-[90%] lg:w-full mb-[20px]">Lorem ipsum is simply dummy text of the and typesetting industry lorem ipsum.</p>
                  <Buttons ariaLabel="faq" href="#" className="font-medium font-serif uppercase btn-link !tracking-[.5px] after:h-[2px] after:bg-[#fff] hover:opacity-70 hover:text-white" size="xl" color="#fff" title="Explore" />
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