import React, { useEffect, useState } from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../Components/Form";

import { resetForm } from "../Functions/Utilities";
import { LoadingOutlined } from "@ant-design/icons";
import { useSupabaseAuth } from "../Context/Context";
import { Supabase } from "../Functions/SupabaseClient";
import { Result, Spin, notification } from "antd";
import LoginImg from "../Assets/img/login.svg";
import Buttons from "../Components/Buttons";
import { animated, easings, useSpring } from "@react-spring/web";
import ActivatedIcon from "../Assets/img/activated-icon.svg";

const UpdatePassword = () => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     if (!session.user) {
  //       navigate("/reset");
  //     }
  //   }, []);
  //   console.log(session);

  const [api, contextHolder] = notification.useNotification();
  const resetErrorNotification = () => {
    api.error({
      message: "Update Password Failed",
      description: "Seems something is wrong. Please try again later",
    });
  };
  const resetSuccessNotification = async () => {
    api.success({
      message: "Password Update Successful",
      description:
        "Your password has been changed successfully. Logging you in...",
    });
  };

  async function Reset(password) {
    try {
      setLoading(true);
      const { data, error } = await Supabase.auth.updateUser({
        password: password.password,
      });

      // console.log(data);
      if (error) {
        api.error({
          message: error.code,
          description: error.message,
        });
      }
      if (data) {
        // console.log("reset data ->", data);
        await resetSuccessNotification();
      }
      setTimeout(() => {
        setLoading(false);
        navigate("/user-dashboard");
      }, 5000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  const springs = useSpring({
    from: {
      opacity: 0.3,
      y: -150,
      scale: 0.3,
    },
    to: { scale: 1, opacity: 1, y: 0 },
    delay: 400,
    config: {
      easings: easings.steps(10),
    },
  });
  const checkWindow = window.location.href;

  // console.log(checkWindow.split("update-password")[1]);

  return checkWindow.split("update-password")[1] ===
    "#error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired" ? (
    <>
      <div className="absolute top-0 left-0 w-full h-full opacity-75 bg-gradient-to-tr from-[#08415c] via-[#3EB489] to-[#08415c]"></div>
      <Container className="relative mt-[15vh]">
        <Row className="justify-center">
          <Col xl={7} lg={8} md={10} className="xs:px-0">
            {/* <Link to="/login" className="text-white mb-2">
          <i className="line-icon-Arrow-OutRight mr-2"></i>
          <span>User Dashboard</span>
        </Link> */}

            <div className="text-center font-serif font-medium bg-white rounded-[6px] p-28 sm:p-20 xs:p-16">
              <animated.div style={{ ...springs }}>
                <Result
                  icon={
                    <img
                      className="h-64 ml-auto mr-auto"
                      src={ActivatedIcon}
                      alt="activation-icon"
                    />
                  }
                  title={`Ooops, this link seems to have been already used or expired`}
                  subTitle="If you suspect something is not right, please reach out to support"
                />
                <Buttons
                  ariaLabel="home"
                  href="/"
                  type="submit"
                  className="btn-fill btn-fancy w-1/2 font-medium font-serif rounded-none uppercase"
                  themeColor="#000000"
                  color="#fff"
                  size="sm"
                  title="Back Home"
                />
              </animated.div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
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
                Update Account Password
              </span>
              <h6 className="inline-block text-[#08415c] -tracking-[1px] w-[80%] mb-14 lg:w-[85%] sm:w-[55%] xs:w-full">
                Recover Your Account <br />
              </h6>
              <Formik
                initialValues={{
                  //   email: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  //   email: Yup.string()
                  // .email("Invalid email.")
                  // .required("Please fill your email"),
                  password: Yup.string()
                    .min(6, "Must be at least 6 characters")
                    .required("Please fill your password"),
                })}
                onSubmit={async (values, actions) => {
                  await Reset(values);
                  resetForm(actions);
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative subscribe-style-08">
                    <Form className="relative">
                      {/* <Input
                        showErrorMsg={true}
                        type="email"
                        name="email"
                        className="border-[1px] medium-input border-solid border-transparent font-sans"
                        placeholder="Your email address"
                      /> */}
                      <Input
                        showErrorMsg={true}
                        type="password"
                        name="password"
                        className="border-[1px] medium-input border-solid border-transparent font-sans"
                        placeholder="Enter New Password"
                      />

                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-xs py-[12px] px-[28px] uppercase`}
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
                          "Update Password"
                        )}
                      </button>

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

export default UpdatePassword;
