import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Input } from "./Form";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import FooterData from "../Data/FooterData";
import { resetForm, sendEmail } from "../Functions/Utilities";
import FooterMenu, { Footer } from "./FooterMenu";
import LogoLight from "../Assets/img/lightL.png";
import LogoDark from "../Assets/img/darkL.png";
const GlobalFooter = (props) => {
  return (
    <Footer
      theme={props.theme}
      className={`${
        props.className ? ` ${props.className}` : ""
      } footer-style-03`}
    >
      <div className="py-[6%] lg:py-[8%] md:py-[50px] md:pb-0 xs:py-[50px]">
        <Container>
          <Row className="justify-between md:justify-start">
            <Col
              lg={{ span: 3, order: 0 }}
              sm={{ span: 6, order: 1 }}
              className="md:mb-[40px] xs:mb-[25px]"
            >
              <span className="font-serif font-medium block text-themecolor mb-[20px] xs:mb-[10px]">
                PDI Marketplace Kenya
              </span>
              <p className="md:w-9/12 xs:w-full">
                PDI Marketplace Kenya, your trusted partner in unlocking the
                power of data-driven decision-making within the realm of real
                estate investments.
              </p>
            </Col>
            <FooterMenu
              data={FooterData.slice(0, 2)}
              lg={{ span: 2, order: 0 }}
              md={6}
              sm={{ span: 6, order: 2 }}
              className="xl:px-[15px] md:mb-[40px] xs:mb-[25px]"
              titleClass="capitalize leading-[20px] mb-[25px]"
            />
            <Col
              xl={{ span: 3 }}
              lg={{ span: 4, order: 0 }}
              sm={{ span: 6, order: 3 }}
              md={5}
            >
              <span className="font-serif font-medium block text-themecolor mb-[20px] xs:mb-[10px]">
                Having Issues or Questions ?
              </span>
              <p className="mb-[10px] md:mb-[5px] ">
                Speak to one of our representatives.
              </p>
              <Link to="/support" className="mb-[5px] md:mb-[20px] text-white ">
                Visit Our <u> Customer Support Page</u>
              </Link>
              <br />
              <Link
                to="/disclaimer"
                className="mb-[5px] md:mb-[20px] text-white"
              >
                Read Our <u> Disclaimer</u>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-[35px] border-t border-[#ffffff1a]">
        <Container>
          <Row>
            <Col md={3} className="sm:mb-[20px]">
              <Link
                aria-label="link"
                to="/"
                className="sm:flex sm:justify-center"
              >
                <img src={LogoLight} alt="logo" className="h-24 mt-0" />
              </Link>
            </Col>
            <Col md={6} className="flex justify-center sm:mb-[20px]">
              <p className="mb-4 xs:text-center">
                &copy; {new Date().getFullYear()} PDI Marketplace Kenya. All
                Rights Reserved{" "}
              </p>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
    </Footer>
  );
};

export default GlobalFooter;
