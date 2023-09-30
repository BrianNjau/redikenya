import React from 'react'

// Libraries
import { Col, Container, Row } from 'react-bootstrap'
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom'

import * as Yup from 'yup';

import { Checkbox, Input } from '../Components/Form'
import Buttons from '../Components/Buttons'
import { fadeIn } from "../Functions/GlobalAnimations";
import { resetForm } from '../Functions/Utilities';
const LoginRegister = () => {
  return (
    <>
      {/* Section Start */}
      <section className="bg-lightgray py-[25px]">
        <Container>
          <Row className="items-center justify-center">
            <Col xl={8} lg={6}>
              <h1 className="font-serif text-darkgray font-medium mb-0 text-lg md:text-center">Redi Kenya</h1>
            </Col>
            <Col xl={4} lg={6} className="breadcrumb mb-0 justify-end font-serif md:justify-center sm:mt-[10px] text-sm">
              <ul className="xs-text-center">
                <li><Link aria-label="homepage-link" to="/">Login</Link></li>
                <li>Register</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}

      {/* Section Start */}
      <section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]"{...fadeIn}>
        <Container>
          <Row className="justify-center">
            <Col xl={5} md={6} className="lg:px-[30px] md:px-[15px] sm:mb-[40px]">
              <h6 className="font-serif font-medium text-darkgray">Login</h6>
              <div className="bg-lightgray p-16 lg:mt-[35px] md:p-10">
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email("Invalid email.").required("Field is required."),
                    password: Yup.string().required("Field is required.")
                  })}
                  onSubmit={async (values, actions) => {
                    await new Promise((r) => setTimeout(r, 500));
                    resetForm(actions)
                  }}
                >
                  {({ isSubmitting, status }) => (
                    <Form>
                      <Input showErrorMsg={false} name="email" type="email" labelClass="mb-[20px]" label={<div className="mb-[15px]">Username or email address <span className="text-[#fb4f58]">*</span></div>} className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Enter your email" />
                      <Input showErrorMsg={false} name="password" type="password" labelClass="mb-[20px]" label={<div className="mb-[15px]">Password <span className="text-[#fb4f58]">*</span></div>} className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf]" placeholder="Enter your password" />
                      <Checkbox type="checkbox" name="terms_condition" className="inline-block" labelClass="flex items-center mb-[25px]">
                        <span className="ml-[10px] text-base">Remember me</span>
                      </Checkbox>
                      <Buttons ariaLabel="login" type="submit" className="btn-fill btn-fancy w-full font-medium font-serif rounded-none uppercase" themeColor="#232323" color="#fff" size="md" title="Login" />
                      <div className="text-right mt-[20px]">
                        <Buttons ariaLabel="reset-password" href="#" className="text-right text-[12px] btn-link after:bg-[#000] hover:text-[#000] font-medium font-serif uppercase btn after:h-[2px] md:text-md" size="md" color="#000" title="Lost your password?" />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
            <Col xl={{ span: 5, offset: 1 }} md={6} className="lg:px-[30px] md:px-[15px]">
              <h6 className="font-serif font-medium text-darkgray">Get started for free</h6>
              <div className="p-16 border border-mediumgray lg:mt-[35px] md:p-10">
                <Formik
                  initialValues={{ username: '', email: '', password: '' }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required("Field is required."),
                    email: Yup.string().email("Invalid email.").required("Field is required."),
                    password: Yup.string().required("Field is required.")
                  })}
                  onSubmit={async (values, actions) => {
                    await new Promise((r) => setTimeout(r, 500));
                    resetForm(actions)
                  }}
                >
                  {({ isSubmitting, status }) => (
                    <Form>
                      <Input showErrorMsg={false} name="username" type="text" labelClass="mb-[20px]" label={<div className="mb-[15px]">Username <span className="text-[#fb4f58]">*</span></div>} className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md leading-[initial]" placeholder="Enter your username" />
                      <Input showErrorMsg={false} name="email" type="email" labelClass="mb-[20px]" label={<div className="mb-[15px]">Email address <span className="text-[#fb4f58]">*</span></div>} className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md leading-[initial]" placeholder="Enter your email" />
                      <Input showErrorMsg={false} name="password" type="password" labelClass="mb-[20px]" label={<div className="mb-[15px]">Password <span className="text-[#fb4f58]">*</span></div>} className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md leading-[initial]" placeholder="Enter your password" />
                      <p className="mb-[25px] block text-sm">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link aria-label="privacy-policy-link" to="/privacy" target="_blank" className="underline"> privacy policy</Link>.</p>
                      <Buttons ariaLabel="register" type="submit" className="btn-fill btn-fancy w-full font-medium font-serif rounded-none uppercase md:mb-[15px] sm:mb-0" themeColor="#232323" color="#fff" size="md" title="Register" />
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
      </>
  )
}

export default LoginRegister