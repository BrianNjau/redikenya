import React, { useEffect, useRef, useState } from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../Components/Form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { resetForm } from "../Functions/Utilities";
import { LoadingOutlined } from "@ant-design/icons";
import { useSupabaseAuth } from "../Context/Context";
import { Supabase } from "../Functions/SupabaseClient";
import { Spin, notification } from "antd";
import LoginImg from "../Assets/img/login.svg";

const ResetPassword = () => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [captchaToken, setCaptchaToken] = useState();
  const captcha = useRef();
  useEffect(() => {
    if (session) {
      navigate("/");
    }
    if (intervalId) {
      clearInterval(intervalId);
    }
  }, [session, intervalId]);

  const [api, contextHolder] = notification.useNotification();
  const resetErrorNotification = () => {
    api.error({
      message: "Reset Failed",
      description: "Incorrect email. Please try again",
    });
  };
  const resetSuccessNotification = async () => {
    api.success({
      message: "Reset Mail Sent",
      description:
        "Please check your email we have sent an update password link to you",
    });
  };

  async function Reset(email) {
    try {
      setLoading(true);
      setCountdown(30);
      const { data, error } = await Supabase.auth.resetPasswordForEmail(
        email.email,
        {
          options: captchaToken,
        }
      );

      // Set an interval to update the countdown every second
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Store the interval ID to clear it if necessary
      setIntervalId(interval);

      if (error) {
        api.error({
          message: error.code,
          description: error.message,
        });
      }
      if (data) {
        console.log("reset data ->", data);
        await resetSuccessNotification();
      }
      // Set a timeout to re-enable the button after 30 seconds
      setTimeout(() => {
        setLoading(false);
        clearInterval(interval);
      }, 30000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      resetErrorNotification();
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#08415c] via-[#3EB489] to-[#08415c]"></div>
      <Container className="relative mt-[15vh]">
        <Row className="justify-center">
          <Col xl={7} lg={8} md={10} className="xs:px-0">
            <Link to="/" className="text-white mb-2">
              <i className="line-icon-Arrow-OutLeft mr-2"></i>
              <span>back</span>
            </Link>

            <div className="text-center font-serif font-medium bg-white rounded-[6px] p-28 sm:p-20 xs:p-16">
              <img
                src={LoginImg}
                alt="welcome to pdi"
                className="h-32 ml-auto mr-auto mb-2"
              />
              <span className="text-[#3EB489] block uppercase mb-[10px]">
                Reset Account Password
              </span>
              <h6 className="inline-block text-[#08415c] -tracking-[1px] w-[80%] mb-14 lg:w-[85%] sm:w-[55%] xs:w-full">
                Recover Your Account <br />
              </h6>
              <Formik
                initialValues={{
                  email: "",
                  // password: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid email.")
                    .required("Please fill your email"),
                  // password: Yup.string().required("Please fill your password"),
                })}
                onSubmit={async (values, actions) => {
                  await Reset(values);
                  resetForm(actions);
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative subscribe-style-08">
                    <Form className="relative">
                      <Input
                        showErrorMsg={true}
                        type="email"
                        name="email"
                        className="border-[1px] medium-input border-solid border-transparent font-sans"
                        placeholder="Your email address"
                      />
                      {/* <Input
                        showErrorMsg={true}
                        type="password"
                        name="password"
                        className="border-[1px] medium-input border-solid border-transparent font-sans"
                        placeholder="Create your password"
                      /> */}
                      <HCaptcha
                        ref={captcha}
                        sitekey="a0b218b4-5e24-499e-8154-e4a08c6ae2b0"
                        onVerify={(token) => {
                          setCaptchaToken(token);
                        }}
                      />

                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-xs py-[12px] px-[28px] mt-2 uppercase`}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spin
                              indicator={
                                <LoadingOutlined
                                  style={{ fontSize: 24, color: "white" }}
                                  spin
                                />
                              }
                            />
                          </>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                      {loading ? (
                        <>
                          Please wait {countdown} seconds before sending email
                          again
                        </>
                      ) : (
                        ""
                      )}

                      {/* <p className="mt-2 block text-sm">
                        Remember your account?{" "}
                        <Link to="/login" className="underline">
                          Sign In
                        </Link>
                      </p> */}
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
