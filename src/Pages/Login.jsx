import React, { useEffect } from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../Components/Form";

import { resetForm } from "../Functions/Utilities";

import { useSupabaseAuth } from "../Context/Context";
const Login = () => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, []);

  return (
    <>
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
                initialValues={{ email: "" }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid email.")
                    .required("Field is required."),
                })}
                onSubmit={async (values, actions) => {
                  await new Promise((r) => setTimeout(r, 500));
                  resetForm(actions);
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative subscribe-style-08">
                    <Form className="relative">
                      <Input
                        showErrorMsg={false}
                        type="email"
                        name="email"
                        className="border-[1px] medium-input border-solid border-transparent font-sans"
                        placeholder="Your email address"
                      />
                      <Input
                        showErrorMsg={false}
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
                        className={`text-xs py-[12px] px-[28px] uppercase${
                          isSubmitting ? " loading" : ""
                        }`}
                      >
                        Sign In
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
