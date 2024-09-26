import React, { useState } from "react";
import Buttons from "./Buttons";
import { Card, Modal } from "antd";
import axios from "axios";
import { useUserWallet } from "../Context/Context";

const ManageSub = () => {
  const secret = process.env.REACT_APP_PAYSTACK_TEST_SECRET;
  const { subscriptionWallet } = useUserWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // console.log("Subscription Wallet", subscriptionWallet);
  const generateLink = async () => {
    const { data, error } = await axios.get(
      `https://api.paystack.co/subscription/${subscriptionWallet.subscription_code}/manage/link`,
      {
        headers: {
          Authorization: "Bearer " + secret, //the token is a variable which holds the token
        },
      }
    );
    if (data) {
      return data;
    }
    if (error) console.log(error);
  };

  const handleManage = async () => {
    try {
      // get link

      const manageLink = await generateLink();

      if (manageLink.status === true) {
        //generated link to manage sub
        setGeneratedLink(manageLink.data.link);
        showModal();
      }

      console.log("Link =>", manageLink);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="bg-[#000000] b" bordered={true}>
      <span className="font-medium mb-8 text-[#3eb489] ml-4">
        Subscription is auto-renewing
      </span>
      <div className="mt-12 mb-12 text-center ">
        {" "}
        <span className="text-[32px] text-white ml-2">
          {/* {loadingTokens ? "" : tokenCount} */}Active
        </span>
        {/* <span className="text-[11px] text-slate-300 ml-2">/ month</span> */}
      </div>
      <div className="flex justify-between  ">
        <span className="text-[12px] text-slate-200 ml-2">
          PDI Marketplace Kenya{" "}
        </span>
        {/* <span className="text-[14px] text-white ml-2"> 15 Tokens </span> */}
      </div>
      <div className="flex justify-between">
        {/* <PaystackButton className="w-[80%]" {...paystackProps} /> */}
        <Buttons
          // onClick={handleSub}
          className={
            " ml-4 mt-3 w-full bg-[#3eb489] btn-fill btn-fancy font-base font-sans "
          }
          themeColor="#3eb489"
          color="#fff"
          title={`Manage Subscription `}
          onClick={handleManage}
          size={"lg"}
        />
        <Modal
          title="Manage PDI Subscription"
          open={isModalOpen}
          onCancel={handleCancel}
          onOk={null}
          footer={null}
          bodyStyle={{ height: "800px", padding: 0 }}
          width={800} // Adjust the modal width as per your requirement
          style={{ top: 20 }} // Optional: Adjust modal positioning
        >
          <iframe
            title="Manage Subscription"
            src={generatedLink} // Replace with your web page URL
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </Modal>
      </div>
    </Card>
  );
};

export default ManageSub;
