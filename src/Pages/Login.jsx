import React, { useContext, useEffect, useRef, useState } from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input, Password } from "../Components/Form";

import { resetForm } from "../Functions/Utilities";
import { KeyOutlined, LoadingOutlined, MailOutlined } from "@ant-design/icons";
import { NotificationContext, useSupabaseAuth } from "../Context/Context";
import { Supabase } from "../Functions/SupabaseClient";
import { Spin } from "antd";
import LoginImg from "../Assets/img/logini.svg";
import SuccessIcon from "../Assets/img/successIcon.png";
import FailureIcon from "../Assets/img/failIcon.png";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Login = () => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { openNotification } = useContext(NotificationContext);
  const [captchaToken, setCaptchaToken] = useState();
  const captcha = useRef();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, []);

  async function UserLogin(loginUserInfo) {
    try {
      setLoading(true);
      const { data, error } = await Supabase.auth.signInWithPassword({
        email: loginUserInfo.email,
        password: loginUserInfo.password,
        options: { captchaToken },
      });
      captcha.current.resetCaptcha();

      if (!data.session || !data.user) {
        openNotification(
          "topRight",
          "Login Failed!",
          error.message,
          <img className="w-8" src={FailureIcon} alt="success" />
        );
      }

      if (data.session && data.user) {
        openNotification(
          "topRight",
          "Success!",
          "You are now logged in",
          <img className="w-8" src={SuccessIcon} alt="success" />
        );

        navigate("/user-dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      openNotification(
        "topRight",
        error.code,
        error.message,
        <img className="w-8" src={FailureIcon} alt="success" />
      );
    }
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#08415c] via-[#3EB489] to-[#08415c]"></div>
      <Container className="relative mt-[7vh]">
        <Row className="justify-center">
          <Col xl={7} lg={8} md={10} className="xs:px-0">
            <Link to="/" className="text-white mb-2">
              <i className="line-icon-Arrow-OutLeft mr-2"></i>
              <span>back</span>
            </Link>

            <div className="text-center font-serif font-medium bg-white rounded-[6px] p-20 sm:p-20 xs:p-16">
              <img
                src={LoginImg}
                alt="welcome to pdi"
                className="h-32 ml-auto mr-auto mb-2"
              />
              <span className="text-[#3EB489] block uppercase mb-[10px]">
                Sign In
              </span>
              <h6 className="inline-block text-[#08415c] -tracking-[1px] w-[80%] mb-14 lg:w-[85%] sm:w-[55%] xs:w-full">
                Discover Comprehensive Insights <br />
                Drive Informed Decisions
              </h6>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid email.")
                    .required("Please fill your email"),
                  password: Yup.string().required("Please fill your password"),
                })}
                onSubmit={async (values, actions) => {
                  await UserLogin(values);
                  resetForm(actions);
                }}
              >
                {({ isSubmitting, status }) => (
                  <div>
                    <Form className="relative ">
                      <Input
                        prefix={<MailOutlined />}
                        showErrorMsg={true}
                        type="email"
                        name="email"
                        size="large"
                        className=" medium-input font-serif mb-3"
                        placeholder="Your email address"
                      />
                      <Password
                        showErrorMsg={true}
                        type="password"
                        name="password"
                        size="large"
                        className=" medium-input p-[12px] mb-3"
                        prefix={<KeyOutlined />}
                        placeholder="Input password"
                      />
                      <p className="mb-3 text-left text-sm">
                        <Link to="/reset" className="underline">
                          Forgot password?
                        </Link>
                      </p>
                      <HCaptcha
                        ref={captcha}
                        sitekey="a0b218b4-5e24-499e-8154-e4a08c6ae2b0"
                        onVerify={(token) => {
                          setCaptchaToken(token);
                        }}
                      />

                      {/* <Buttons
                        className={
                          "w-[100%] mt-3 bg-white btn-fill btn-fancy font-medium font-sans"
                        }
                        themeColor="#000"
                        color="#000"
                        title={"Renew subscription"}
                        size={"md"}
                      /> */}
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`w-[100%] mt-2 text-white rounded hover:bg-white bg-black btn-fill btn-fancy font-medium font-sans text-xs py-[14px] px-[28px] uppercase`}
                      >
                        {loading ? (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{ fontSize: 24, color: "white" }}
                                spin
                              />
                            }
                          />
                        ) : (
                          "Sign In"
                        )}
                      </button>

                      <p className="mt-2 block text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="underline">
                          Sign Up
                        </Link>
                      </p>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
