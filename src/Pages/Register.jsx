import React, { useEffect, useState } from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../Components/Form";
import { resetForm } from "../Functions/Utilities";
import { Supabase } from "../Functions/SupabaseClient";
import { Spin } from "antd";
import { useSupabaseAuth } from "../Context/Context";
import { LoadingOutlined } from "@ant-design/icons";

const Register = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();
  const session = useSupabaseAuth();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, []);

  async function RegisterUser(registerUserInfo) {
    try {
      //
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
      if (data.user) {
        //user obj returned on successful account creation
        setRegisterLoading(false);
        navigate("/verify-mail");
      }
      if (error) console.log(error);
    } catch (error) {
      console.log(error);
      setRegisterLoading(false);
    }
  }

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
                Sign Up
              </span>
              <h6 className="inline-block text-[#08415c] -tracking-[1px] w-[80%] mb-14 lg:w-[85%] sm:w-[55%] xs:w-full">
                Unlock the Power of Data <br /> Create Account for a Free Trial
              </h6>
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
                  await RegisterUser(values);
                  resetForm(actions); //clear input field and values
                }}
              >
                {({ isSubmitting, status }) => (
                  <div className="relative subscribe-style-08">
                    <Form className="relative">
                      <Input
                        showErrorMsg={true}
                        type="text"
                        name="name"
                        className="border-[1px] medium-input border-solid border-transparent font-sans"
                        placeholder="Your full name"
                      />
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
                      <p className="mb-[25px] block text-sm">
                        After you sign up, you will be able to select the
                        package that works for you and start a free trial. To
                        view our terms of use you can read our{" "}
                        <Link
                          aria-label="privacy-policy-link"
                          to="/terms-of-use"
                          className="underline"
                        >
                          {" "}
                          terms of use
                        </Link>
                        .
                      </p>
                      <button
                        aria-label="subscribe"
                        type="submit"
                        className={`text-xs py-[12px] px-[28px] uppercase${
                          isSubmitting ? " loading" : ""
                        } `}
                      >
                        {registerLoading ? (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{ fontSize: 24, color: "white" }}
                                spin
                              />
                            }
                          />
                        ) : (
                          "Create Account"
                        )}
                      </button>

                      <p className="mt-2 block text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                          Sign In
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

export default Register;
