import React, { useContext, useEffect, useRef, useState } from "react";

// Libraries
import { Col, Container, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input, Password } from "../Components/Form";
import { resetForm } from "../Functions/Utilities";
import { Supabase } from "../Functions/SupabaseClient";
import { Spin } from "antd";
import { NotificationContext, useSupabaseAuth } from "../Context/Context";
import { LoadingOutlined } from "@ant-design/icons";
import Welcome from "../Assets/img/welcome.svg";
// import SuccessIcon from "../Assets/img/successIcon.png";
import FailureIcon from "../Assets/img/failIcon.png";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Register = () => {
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();
  const session = useSupabaseAuth();
  const { openNotification } = useContext(NotificationContext);
  const [captchaToken, setCaptchaToken] = useState();
  const captcha = useRef();
  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, []);

  async function RegisterUser(registerUserInfo) {
    try {
      //
      setRegisterLoading(true);

      //first check if such email exists
      const { data, error } = await Supabase.auth.signUp({
        email: registerUserInfo.email,
        password: registerUserInfo.password,
        options: {
          data: {
            fullName: registerUserInfo.name,
          },
          captchaToken,
        },
      });
      //user returned is fake thus already exists
      if (
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
      ) {
        openNotification(
          "topRight",
          "Sign Up Failed!",
          "Account already exists",
          <img className="w-8" src={FailureIcon} alt="success" />
        );
      } else if (data.user && data.user.identities.length > 0) {
        //user obj returned on successful account creation

        // console.log(data);

        navigate("/verify-mail");
      }
      setRegisterLoading(false);
      if (error) {
        openNotification(
          "topRight",
          error.code,
          error.message,
          <img className="w-8" src={FailureIcon} alt="success" />
        );
      }
    } catch (error) {
      console.log(error);
      setRegisterLoading(false);
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
      <Container className="relative mt-[15vh]">
        <Row className="justify-center">
          <Col xl={7} lg={8} md={10} className="xs:px-0">
            <Link to="/" className="text-white mb-2">
              <i className="line-icon-Arrow-OutLeft mr-2"></i>
              <span>back</span>
            </Link>

            <div className="text-center font-serif font-medium bg-white rounded-[6px] p-20 sm:p-20 xs:p-16">
              <img
                src={Welcome}
                alt="welcome to pdi"
                className="h-32 ml-auto mr-auto mb-2"
              />
              <span className="text-[#3EB489] block font-serif uppercase mb-[10px]">
                Sign Up For Free
              </span>
              <h6 className="inline-block text-[#08415c] -tracking-[1px] w-[80%] mb-10 lg:w-[85%] sm:w-[55%] xs:w-full">
                Unlock the Power of Property Data
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
                  <div>
                    <Form className="relative">
                      <Input
                        showErrorMsg={true}
                        type="text"
                        name="name"
                        className=" medium-input font-sans mb-4"
                        placeholder="Your full name"
                      />
                      <Input
                        showErrorMsg={true}
                        type="email"
                        name="email"
                        className="border-[1px] mb-4  medium-input font-sans"
                        placeholder="Your email address"
                      />
                      <Password
                        showErrorMsg={true}
                        type="password"
                        name="password"
                        className="border-[1px] medium-input mb-4  font-sans"
                        placeholder="Create your password"
                      />
                      <HCaptcha
                        ref={captcha}
                        sitekey="a0b218b4-5e24-499e-8154-e4a08c6ae2b0"
                        onVerify={(token) => {
                          setCaptchaToken(token);
                        }}
                      />
                      <p className="mb-[25px] block text-sm">
                        After you sign up, you will be granted free tokens to
                        try PDI for free, no contract, no commitments. To view
                        our terms of use you can read our{" "}
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
                        className={`w-[100%] mt-2 text-white rounded hover:bg-white bg-black btn-fill btn-fancy font-medium font-sans text-xs py-[14px] px-[28px] uppercase`}
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
