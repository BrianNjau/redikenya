import React, { useContext, useRef } from "react";
import GlobalHeader from "../Components/GlobalHeader";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { Checkbox, Input, TextArea } from "../Components/Form";
import Buttons from "../Components/Buttons";
import { AnimatePresence } from "framer-motion";
import Overlap from "../Components/Overlap";
import GlobalFooter from "../Components/GlobalFooter";
import * as Yup from "yup";
import FailureIcon from "../Assets/img/failIcon.png";
import SuccessIcon from "../Assets/img/successIcon.png";
import { Supabase } from "../Functions/SupabaseClient";
import { resetForm } from "../Functions/Utilities";
import { NotificationContext } from "../Context/Context";
const Support = () => {
  const form = useRef(null);
  const ContactFormSchema = Yup.object().shape({
    name: Yup.string().required("Field is required."),
    content: Yup.string().required("Field is required."),
    userEmail: Yup.string()
      .email("Invalid email.")
      .required("Field is required."),
    terms_condition: Yup.boolean().oneOf([true], "Message").required(),
  });
  const { openNotification } = useContext(NotificationContext);
  const sendReportEmail = async (content) => {
    // console.log("useremail", userEmail);
    // console.log("phone", phone);
    const { data, error } = await Supabase.functions.invoke("send-mail", {
      body: {
        subject: `Issue Report from ${content.userEmail}`,
        content: content.content,
        to: "info@pdimarketplace.com", // The support email
        name: content.name,
        phone: content.phone,
      },
    });

    if (!error) {
      openNotification(
        "topRight",
        "Email Sent Successfully",
        "We have received your mail and will respond as soon as we can",
        <img className="w-8" src={SuccessIcon} alt="success" />
      );
    } else {
      openNotification(
        "topRight",
        error.code,
        error.message,
        <img className="w-8" src={FailureIcon} alt="fail" />
      );
    }
  };

  return (
    <div className="bg-white">
      <GlobalHeader theme="light" />
      <section className="bg-lightgray py-[40px] sm:py-[30px]">
        <Container>
          <Row className="xs:text-center">
            <Col
              xl={8}
              lg={6}
              className="flex md:justify-center md:mb-[15px] sm:block sm:text-center sm:mb-[9px]"
            >
              <h1 className="text-lg leading-[28px] text-darkgray font-medium mb-0 font-serif inline-block">
                Have a question ?
              </h1>
              <span className="font-serif text-md leading-[28px] relative pl-[25px] ml-[30px] block sm:p-0 before:absolute before:bg-darkgray before:content-[''] before:h-[12px] before:top-[8px] before:w-[2px] before:left-0 sm:before:hidden sm:ml-0">
                Talk to one of our representatives
              </span>
            </Col>
            <Col
              xl={4}
              lg={6}
              className="breadcrumb justify-end px-[15px] text-sm font-serif m-0 md:justify-center"
            >
              <ul>
                <li className="!leading-[30px]">
                  {/* <Link aria-label="link for" to="/support"> */}
                  Contact Support
                  {/* </Link> */}
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section Start */}
      <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px]">
        <Container>
          <Row className="row-cols-1 row-cols-lg-4 row-cols-sm-2 md:gap-y-[50px] sm:gap-y-[30px] text-center">
            <Col>
              <i className="line-icon-Geo2-Love text-gradient bg-[#3EB489] text-[32px] mb-[30px] sm:mb-[10px] inline-block md:mb-[15px]"></i>
              <div className="text-darkgray uppercase text-sm font-medium font-serif mb-[10px]">
                FIND US
              </div>
              <p className="w-[75%] lg:w-[90%] md:w-[60%] sm:w-[75%] xs:w-full mx-auto">
                New Rehema House, Nairobi
              </p>
            </Col>
            <Col>
              <i className="line-icon-Headset text-gradient bg-[#3EB489] text-[32px] mb-[30px] sm:mb-[10px] inline-block md:mb-[15px]"></i>
              <div className="text-darkgray uppercase text-sm font-medium font-serif mb-[10px]">
                Call Us
              </div>
              <p className="w-[70%] lg:w-full mx-auto">Phone: +254 723946261</p>
            </Col>
            <Col>
              <i className="line-icon-Mail-Read text-gradient bg-[#3EB489] text-[32px] mb-[30px] sm:mb-[10px] inline-block md:mb-[15px]"></i>
              <div className="text-darkgray uppercase text-sm font-medium font-serif mb-[10px]">
                E-MAIL US
              </div>
              <p className="w-[70%] lg:w-full mx-auto">
                <a
                  aria-label="mail"
                  href="mailto:info@yourdomain.com"
                  className="hover:text-basecolor"
                >
                  info@pdimarketplace.com
                </a>
              </p>
            </Col>
            <Col>
              <i className="line-icon-Information text-gradient bg-[#3EB489] text-[32px] mb-[30px] sm:mb-[10px] inline-block md:mb-[15px]"></i>
              <div className="text-darkgray uppercase text-sm font-medium font-serif mb-[10px]">
                Reach Out
              </div>
              <p className="w-[75%] lg:w-full md:w-[60%] sm:w-[75%] mx-auto">
                Get a response within 24hrs
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Section End */}
      {/* Section Start */}
      <section
        className="pt-[160px] pb-[250px] lg:pt-[120px] md:pt-[95px] md:pb-[220px] sm:py-[80px] xs:py-[50px] relative bg-cover overflow-hidden bg-center bg-no-repeat bg-fixed lg:bg-local"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1611348524140-53c9a25263d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2673&q=80)`,
        }}
      >
        <div className="absolute h-full w-full opacity-80 top-0 left-0 bg-gradient-to-tr from-[#3EB489] via-[#195a78] to-[#08415c]"></div>
      </section>
      {/* Section End */}
      {/* Section Start */}
      <section className="bg-lightgray pb-[130px] lg:pb-[90px] md:pb-[75px] sm:py-[50px]">
        <Container>
          <div transitionDelay={0.5}>
            <Overlap
              value={20}
              className="relative p-32 lg:p-[104px] md:p-[60px] sm:p-[55px] xs:px-[22px] xs:py-[44px] shadow-[0_0_30px_rgba(0,0,0,0.1)] bg-white"
            >
              <Row className="justify-center">
                <Col
                  xl={6}
                  lg={7}
                  className="col-12 text-center mb-[4.5rem] md:mb-12"
                >
                  <span className="font-serif mb-[5px] -tracking-[.5px] text-xmd block">
                    Fill out the form and we'll be in touch soon!
                  </span>
                  <h4 className="font-serif font-semibold text-darkgray">
                    How we can help you?
                  </h4>
                </Col>
                <Col className="col-12">
                  <Formik
                    initialValues={{
                      name: "",
                      userEmail: "",
                      phone: "",
                      content: "",
                      terms_condition: false,
                    }}
                    validationSchema={ContactFormSchema}
                    onSubmit={async (values, actions) => {
                      actions.setSubmitting(true);
                      const response = await sendReportEmail(values);
                      resetForm(actions);
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form ref={form}>
                        <Row className="row-cols-1 row-cols-md-2">
                          <Col className="mb-16 sm:mb-[25px]">
                            <Input
                              showErrorMsg={false}
                              type="text"
                              name="name"
                              className="py-[15px] px-[20px] text-md w-full border-[1px] border-solid border-[#dfdfdf]"
                              labelClass="mb-[25px]"
                              placeholder="Your name"
                            />
                            <Input
                              showErrorMsg={false}
                              type="email"
                              name="userEmail"
                              className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]"
                              labelClass="mb-[25px]"
                              placeholder="Your email address"
                            />
                            <Input
                              showErrorMsg={false}
                              type="tel"
                              name="phone"
                              className="py-[15px] px-[20px] w-full text-md border-[1px] border-solid border-[#dfdfdf]"
                              placeholder="Mobile number"
                            />
                          </Col>
                          <Col className="mb-16 sm:mb-[20px]">
                            <TextArea
                              className="border-[1px] border-solid border-[#dfdfdf] w-full py-[15px] px-[20px] text-md h-[210px] resize-none"
                              rows="6"
                              name="content"
                              placeholder="Your message"
                            ></TextArea>
                          </Col>
                          <Col className="text-left sm:mb-[20px]">
                            <Checkbox
                              type="checkbox"
                              name="terms_condition"
                              className="inline-block mt-[4px]"
                              labelClass="flex items-start"
                            >
                              <span className="ml-[10px] text-sm inline-block w-[85%]">
                                I accept the terms & conditions and I understand
                                that my data will be held securely in accordance
                                with the
                                <Link
                                  aria-label="checkbox"
                                  to="/privacy-policy"
                                  target="_blank"
                                  className="text-darkgray underline hover:text-fastblue"
                                >
                                  {" "}
                                  privacy policy
                                </Link>
                                .
                              </span>
                            </Checkbox>
                          </Col>
                          <Col className="text-right sm:text-center">
                            <Buttons
                              type="submit"
                              className={`text-xs tracking-[1px] rounded-none py-[12px] px-[28px] uppercase${
                                isSubmitting ? " loading" : ""
                              }`}
                              themeColor={["#3EB489", "#195a78", "#08415c"]}
                              size="md"
                              color="#fff"
                              title="Send Message"
                            />
                          </Col>
                        </Row>
                        <AnimatePresence>
                          {/* {status && <Row><Col xs={12}><div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MessageBox className="mt-[20px] py-[10px]" theme="message-box01" variant="success" message="Your message has been sent successfully!" /></div></Col></Row>} */}
                        </AnimatePresence>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Overlap>
          </div>
        </Container>
      </section>
      {/* Section End */}
      {/* Section End */}
      <GlobalFooter
        theme="dark"
        className="bg-[#262b35] text-slateblue gym-fitness-footer"
      />
    </div>
  );
};

export default Support;
