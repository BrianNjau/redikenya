import React, { useContext, useState } from "react";
import UserDashLayout from "../Components/UserDashLayout";
import { LoadingOutlined, MailFilled, UserOutlined } from "@ant-design/icons";
import { NotificationContext, useSupabaseAuth } from "../Context/Context";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { resetForm } from "../Functions/Utilities";
import { Input, Password } from "../Components/Form";
import { Supabase } from "../Functions/SupabaseClient";
import { Spin } from "antd";
import SuccessIcon from "../Assets/img/successIcon.png";
import FailureIcon from "../Assets/img/failIcon.png";
import Buttons from "../Components/Buttons";
const Profile = () => {
  const session = useSupabaseAuth();
  const [loading, setLoading] = useState(false);
  // const [username, setUsername] = useState(undefined);
  // const [password, setPassword] = useState(undefined);
  const { openNotification } = useContext(NotificationContext);

  async function UpdateProfile(userProfileInfo) {
    try {
      //
      setLoading(true);

      const { data, error } = await Supabase.auth.updateUser({
        data: {
          fullName: userProfileInfo.name,
        },
      });

      if (error) {
        openNotification(
          "topRight",
          error.code,
          error.message,
          <img className="w-8" src={FailureIcon} alt="success" />
        );
      }

      if (!error) {
        openNotification(
          "topRight",
          "Success!",
          "Profile updated successfully ",
          <img className="w-8" src={SuccessIcon} alt="success" />
        );
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // console.log("user", session.user.user_metadata.email);
  return (
    <UserDashLayout>
      <div className=" text-left">
        <span className="text-[18px] ml-8  -tracking-[0.1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          User Profile
        </span>{" "}
        <br />
        <hr className="mt-16 h-0.5 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
        <span className="text-[11px] ml-8   text-gray-700">
          View and edit your user profile here.
        </span>{" "}
        <div className="ml-8 text-[12px] mt-8 w-1/4">
          {/* User Profile Card */}
          <Formik
            initialValues={{
              name: `${session.user.user_metadata.fullName}`,
              // password: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .min(3, "Must have at least 3 characters")
                .required("Please fill your full name"),
              // password: Yup.string()
              //   .min(6, "Must be at least 6 characters")
              //   .required("Please fill your password"),
            })}
            onSubmit={async (values, actions) => {
              await UpdateProfile(values);
              // resetForm(actions); //clear input field and values
            }}
          >
            {({ isSubmitting, status }) => (
              <>
                <Form>
                  <span>Account Email</span>

                  <Input
                    placeholder={`${session.user.user_metadata.email}`}
                    className="medium-input mt-2 mb-4"
                    size="default"
                    variant="filled"
                    prefix={<MailFilled />}
                    disabled={true}
                    type="text"
                    name="email"
                  />
                  <span>Account Username</span>
                  <Input
                    placeholder={session.user.user_metadata.fullName}
                    className="medium-input mt-2 mb-4"
                    // defaultValue={session.user.user_metadata.fullName}
                    // value={session.user.user_metadata.fullName}
                    size="default"
                    // variant="filled"
                    prefix={<UserOutlined />}
                    type="text"
                    name="name"
                    // disabled
                    showErrorMsg={true}
                  />
                  {/* <span>Account Password</span>
                  <Password
                    className="medium-input mt-2 mb-4"
                    placeholder="Input new password"
                    showErrorMsg={true}
                    type="password"
                    size="default"
                    name="password"
                    prefix={<KeyOutlined />}
                  /> */}
                  <Buttons
                    type={"submit"}
                    className={
                      "mt-2 w-[40%]  btn-fill btn-fancy font-medium font-sans"
                    }
                    themeColor="#000"
                    color="#fff"
                    title={
                      loading ? (
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{ fontSize: 18, color: "green" }}
                              spin
                            />
                          }
                        />
                      ) : (
                        "Save"
                      )
                    }
                    size={"sm"}
                  />
                  {/* <button
                    aria-label="subscribe"
                    type="submit"
                    className={`w-[40%] mt-2 text-white rounded hover:bg-white bg-black btn-fill btn-fancy font-medium font-sans text-xs py-[14px] px-[28px] uppercase`}
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
                      "Save"
                    )}
                  </button> */}
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </UserDashLayout>
  );
};

export default Profile;
