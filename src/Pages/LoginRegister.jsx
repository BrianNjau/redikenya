import React, { useContext, useEffect, useState } from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Checkbox, Input } from "../Components/Form";
import Buttons from "../Components/Buttons";
import { fadeIn } from "../Functions/GlobalAnimations";
import { resetForm } from "../Functions/Utilities";
import GlobalHeader from "../Components/GlobalHeader";
import { GlobalContext } from "../Context/Context";
import { Supabase } from "../Functions/SupabaseClient";
import { Spin } from "antd";

const LoginRegister = () => {
  const { setHeaderHeight } = useContext(GlobalContext);
  useEffect(() => {
    setHeaderHeight(120);
  });
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);
  // const [registerName, setRegisterName] = useState('');
  // const [registerEmail, setRegisterEmail] = useState('');
  // const [registerPassword, setRegisterPassword] = useState('');

  async function registerUser(registerUserInfo) {
    try {
      setRegisterLoading(true);

      const { data, error } = await Supabase.auth.signUp({
        email: registerUserInfo.email,
        password: registerUserInfo.password,
        options: {
          data: {
            fullName: registerUserInfo.name,
          },
        },
      });
      // console.log("Register response=>", data);
      // console.log("Register error response=>", error);
      setRegisterLoading(false);
      navigate("/verify-mail");
    } catch (error) {
      console.log(error);
      setRegisterLoading(false);
    }
  }

  return (
    <>
      <div>
        {/** <SideButtons /> */}
        <div className="bg-white">
          <GlobalHeader theme="light" />

          {/* Section Start */}
          <section className="bg-lightgray py-[25px]">
            <Container>
              <Row className="items-center justify-center">
                <Col xl={8} lg={6}>
                  {/* <h1 className="font-serif text-darkgray font-medium mb-0 text-lg md:text-center"></h1> */}
                </Col>
                <Col
                  xl={4}
                  lg={6}
                  className="breadcrumb mb-0 justify-end font-serif md:justify-center sm:mt-[10px] text-sm"
                >
                  <ul className="xs-text-center">
                    <li>Login</li>
                    <li>Register</li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </section>
          {/* Section End */}

          {/* Section Start */}
          <section
            className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]"
            {...fadeIn}
          >
            <Container>
              <Row className="justify-center">
                <Col
                  xl={5}
                  md={6}
                  className="lg:px-[30px] md:px-[15px] sm:mb-[40px]"
                >
                  <h6 className="font-serif font-medium text-[#08415c]">
                    Login
                  </h6>
                  <div className="bg-lightgray p-16 lg:mt-[35px] md:p-10">
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email("Invalid email.")
                          .required("Field is required."),
                        password: Yup.string().required("Field is required."),
                      })}
                      onSubmit={async (values, actions) => {
                        await new Promise((r) => setTimeout(r, 500));
                        resetForm(actions);
                      }}
                    >
                      {({ isSubmitting, status }) => (
                        <Form>
                          <Input
                            showErrorMsg={false}
                            name="email"
                            type="email"
                            labelClass="mb-[20px]"
                            label={
                              <div className="mb-[15px] text-[#08415c]">
                                Email address{" "}
                                <span className="text-[#fb4f58]">*</span>
                              </div>
                            }
                            className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf]"
                            placeholder="Enter your email"
                          />
                          <Input
                            showErrorMsg={false}
                            name="password"
                            type="password"
                            labelClass="mb-[20px]"
                            label={
                              <div className="mb-[15px] text-[#08415c]">
                                Password{" "}
                                <span className="text-[#fb4f58]">*</span>
                              </div>
                            }
                            className="py-[13px] px-[15px] text-md leading-[initial] w-full border-[1px] border-solid border-[#dfdfdf]"
                            placeholder="Enter your password"
                          />
                          <Checkbox
                            type="checkbox"
                            name="terms_condition"
                            className="inline-block"
                            labelClass="flex items-center mb-[25px]"
                          >
                            <span className="ml-[10px] text-base">
                              Remember me
                            </span>
                          </Checkbox>
                          <Buttons
                            ariaLabel="login"
                            type="submit"
                            className="btn-fill btn-fancy w-full font-medium font-serif rounded-none uppercase"
                            themeColor="#08415c"
                            color="#fff"
                            size="md"
                            title="Login"
                          />
                          <div className="text-right mt-[20px]">
                            <Buttons
                              ariaLabel="reset-password"
                              href="#"
                              className="text-right text-[12px] btn-link after:bg-[#08415c] hover:text-[#08415c] font-medium font-serif uppercase btn after:h-[2px] md:text-md"
                              size="md"
                              color="#08415c"
                              title="Lost your password?"
                            />
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Col>
                <Col
                  xl={{ span: 5, offset: 1 }}
                  md={6}
                  className="lg:px-[30px] md:px-[15px]"
                >
                  <h6 className="font-serif font-medium text-[#08415c]">
                    Create account to start your free trial
                  </h6>

                  {/* Handle registration */}

                  <div className="p-16 border border-mediumgray lg:mt-[35px] md:p-10">
                    <Formik
                      initialValues={{
                        name: "",
                        email: "",
                        password: "",
                      }}
                      validationSchema={Yup.object().shape({
                        name: Yup.string()
                          .min(3, "Must have at least 3 characters")
                          .required("Please fill your full name"),
                        email: Yup.string()
                          .email("Invalid email.")
                          .required("Please fill your email"),
                        password: Yup.string()
                          .min(6, "Must be at least 6 characters")
                          .required("Please fill your password"),
                      })}
                      onSubmit={async (values, actions) => {
                        registerUser(values);
                        resetForm(actions); //clear input field and values
                      }}
                    >
                      {(formik) => (
                        <Form>
                          <Input
                            showErrorMsg={true}
                            name="name"
                            type="text"
                            labelClass="mb-[20px]"
                            label={
                              <div className="mb-[15px] text-[#08415c]">
                                Full Name{" "}
                                <span className="text-[#fb4f58]">*</span>
                              </div>
                            }
                            className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md leading-[initial]"
                            placeholder="Enter your full name"
                          />
                          <Input
                            showErrorMsg={true}
                            name="email"
                            type="email"
                            labelClass="mb-[20px]"
                            label={
                              <div className="mb-[15px] text-[#08415c]">
                                Email address{" "}
                                <span className="text-[#fb4f58]">*</span>
                                <br />
                              </div>
                            }
                            className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md leading-[initial]"
                            placeholder="Enter your email"
                          />
                          <Input
                            showErrorMsg={true}
                            name="password"
                            type="password"
                            labelClass="mb-[20px]"
                            label={
                              <div className="mb-[15px] text-[#08415c]">
                                Password{" "}
                                <span className="text-[#fb4f58]">*</span>
                              </div>
                            }
                            className="py-[13px] px-[15px] w-full border-[1px] border-solid border-[#dfdfdf] text-md leading-[initial]"
                            placeholder="Create your password"
                          />
                          <p className="mb-[25px] block text-sm">
                            As you create your account, you will be able to
                            select the package that works for you and start a
                            free trial. To view our terms of use you can read
                            our{" "}
                            <Link
                              aria-label="privacy-policy-link"
                              to="/terms-of-use"
                              target="_blank"
                              className="underline"
                            >
                              {" "}
                              terms of use
                            </Link>
                            .
                          </p>
                          {registerLoading ? (
                            <Spin />
                          ) : (
                            <Buttons
                              ariaLabel="register"
                              type="submit"
                              className="btn-fill btn-fancy w-full font-medium font-serif rounded-none uppercase md:mb-[15px] sm:mb-0"
                              themeColor="#08415c"
                              color="#fff"
                              size="md"
                              title="Create Account"
                            />
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          {/* Section End */}
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
