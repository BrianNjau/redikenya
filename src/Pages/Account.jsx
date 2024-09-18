import React from "react";
import UserDashLayout from "../Components/UserDashLayout";
import { useSupabaseAuth } from "../Context/Context";
import { Card } from "antd";
import {
  InfoCircleFilled,
  InfoCircleOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import Buttons from "../Components/Buttons";

const Account = () => {
  const session = useSupabaseAuth();
  console.log("user", session);
  return (
    <UserDashLayout>
      <div className=" text-left">
        <span className="text-[18px] ml-8  -tracking-[0.1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          Account Status
        </span>{" "}
        <br />
        <hr className="mt-16 h-0.5 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
        <div className="ml-8 ">
          <span className="text-[11px] text-gray-700">
            Manage your account and account settings here
          </span>{" "}
          <Card className=" mt-4  w-[38%] bg-gray-100">
            <div className="flex justify-between">
              <InfoCircleTwoTone className="mb-4 ml-2" />
              <div>
                <span className=" text-[14px] font-semibold">
                  Having issues with your account?
                </span>
                <br />
                <span className="text-[14px] ">
                  Get easy access to support through here
                </span>
              </div>
              <Buttons
                className={
                  "mt-2 h-10 bg-white btn-fill btn-fancy font-medium font-sans"
                }
                themeColor="#000"
                color="#000"
                title={"Support"}
                size={"sm"}
              />
            </div>
          </Card>
          <div className="mt-8">
            <p>
              Sign Out Devices
              <br />
              <span className="text-[12px]  text-gray-500">
                This will sign out all other devices using your account
              </span>
            </p>

            <Buttons
              className={"mt-2 h-10  btn-fill btn-fancy font-medium font-sans"}
              themeColor="#000"
              color="#fff"
              title={"Sign Out"}
              size={"sm"}
            />
          </div>
          <div className="mt-8">
            <p>
              Reset Account Password
              <br />
              <span className="text-[12px]  text-gray-500">
                We will send an email to you with instructions on how to reset
                your password
              </span>
            </p>

            <Buttons
              className={"mt-2 h-10  btn-fill btn-fancy font-medium font-sans"}
              themeColor="#000"
              color="#fff"
              title={"Reset Password"}
              size={"sm"}
            />
          </div>
          <div className="mt-8">
            <p>
              Delete Your Account
              <br />
              <span className="text-[12px]  text-gray-500">
                This will delete all data associated with your account
                irretrievably
              </span>
            </p>

            <Buttons
              className={"mt-2 h-10  btn-fill btn-fancy font-medium font-sans"}
              themeColor="#8c271e"
              color="#fff"
              title={"Delete Account"}
              size={"sm"}
            />
          </div>
        </div>
      </div>
    </UserDashLayout>
  );
};

export default Account;
