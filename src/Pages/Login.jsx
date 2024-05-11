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
import { Spin, notification } from "antd";
const Login = () => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const loginErrorNotification = () => {
    api.error({
      message: "Login Failed",
      description: "Incorrect email or password. Please try again",
    });
  };
  const loginSuccessNotification = () => {
    api.success({
      message: "Login Successful",
      description: "Welcome back",
    });
  };

  async function UserLogin(loginUserInfo) {
    try {
      setLoading(true);
      const { data, error } = await Supabase.auth.signInWithPassword({
        email: loginUserInfo.email,
        password: loginUserInfo.password,
      });

      if (!data.session || !data.user) {
        loginErrorNotification();
      }

      if (data.session && data.user) {
        loginSuccessNotification();
        navigate("/");
      }

      console.log("login info", data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
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
              <span className="text-[#3EB489] block uppercase mb-[10px]">
                Sign In
              </span>
              <h6 className="inline-block text-[#08415c] -tracking-[1px] w-[80%] mb-14 lg:w-[85%] sm:w-[55%] xs:w-full">
                Harness Comprehensive Insights <br />
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
                  <div className="relative subscribe-style-08">
                    <Form className="relative">
                      <Input
                        showErrorMsg={true}
                        type="email"
                        name="email"
                        className="border-[1px] medium-input border-solid border-transparent font-sans"
                        placeholder="Your email address"
                      />
                      <Input
                        showErrorMsg={true}
                        type="password"
                        name="password"
                        className="border-[1px] medium-input border-solid border-transparent font-sans"
                        placeholder="Create your password"
                      />
                      <p className="mb-3 text-left text-sm">
                        <Link to="/reset" className="underline">
                          Forgot password?
                        </Link>
                      </p>

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
