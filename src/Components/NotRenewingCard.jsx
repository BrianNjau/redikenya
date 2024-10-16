import { Button, Card, ConfigProvider } from "antd";
import React from "react";
import Buttons from "./Buttons";
import { useSupabaseAuth, useUserWallet } from "../Context/Context";
import { PaystackButton } from "react-paystack";

const NotRenewingCard = () => {
  const { subscriptionWallet } = useUserWallet();
  const session = useSupabaseAuth();
  const tokenPrice = 1500;
  const std_plan = process.env.REACT_APP_PAYSTACK_STANDARD_SUBSCRIPTION_PLAN;
  const test_key = "pk_test_73cc2a30972587c0712d51cc7ea5aace2704aff2";

  // you can call this function anything
  const handlePaystackSuccessAction = async () => {
    // Implementation for whatever you want to do with reference and after success call.
    // wait for 1.5 seconds to allow for webhook response
    // setTimeout(function () {
    //   // refresh the page
    //   window.location.reload(false);
    // }, 1500);
  };

  // you can call this function anything
  const handleOnClose = (ref) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    // console.log("closed", ref);
  };

  // const paystackProps = {
  //   email: session.user.email,
  //   amount: tokenPrice * 100,
  //   firstname: session.user.user_metadata.fullName.split(" ")[0] || "",
  //   lastname: session.user.user_metadata.fullName.split(" ")[1] || "",
  //   currency: "KES",
  //   metadata: {
  //     customer: [
  //       {
  //         display_name: "Customer Name",
  //         variable_name: "customerName",
  //         value: session.user.user_metadata.fullName,
  //       },
  //       {
  //         display_name: "Customer Phone",
  //         variable_name: "customerPhone",
  //         value: session.user.phone,
  //       },
  //       {
  //         display_name: "User ID",
  //         variable_name: "userID",
  //         value: session.user.id,
  //       },
  //       {
  //         display_name: "Token Amount",
  //         variable_name: "tokenAmount",
  //         value: 15,
  //       },
  //     ],
  //   },
  //   plan: std_plan,
  //   publicKey: test_key,
  //   text: (
  //     <Button
  //       block
  //       disabled={subscriptionWallet.status === "expired" ? false : true}
  //       className={
  //         "w-[100%] mt-3 bg-[#3EB489] text-[#3EB489] hover:text-[#000] btn-fill btn-fancy font-medium font-sans"
  //       }
  //       themeColor="#3EB489"
  //       color="#fff"
  //       // title={"Resubscribe"}
  //       size={"md"}
  //     >
  //       Resubscribe
  //     </Button>
  //   ),
  //   label: "Renew Standard Plan",
  //   onSuccess: (reference) => handlePaystackSuccessAction(reference),

  //   onClose: () => handleOnClose(),
  // };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#3eb489",
          },
        },
      }}
    >
      <Card className="bg-lightgray" bordered={true}>
        <span className="font-medium mb-8 text-slate-600 ml-4">
          Your subscription is active
        </span>
        <div className="mt-12 mb-12 text-center ">
          {" "}
          <span className="text-[32px] text-slate-800 ml-2">
            {/* {loadingTokens ? "" : tokenCount} */}Not renewing
          </span>
          {/* <span className="text-[11px] text-slate-300 ml-2">/ month</span> */}
        </div>
        <div className="flex justify-between  ">
          <span className="text-[9px] text-slate-600 ml-2">
            You will lose access to your tokens after expiry. We will send
            reminders to you before your plan ends.
          </span>
          {/* <span className="text-[11px] text-slate-900 ml-2">
            Manual resubscription required after expiry
          </span> */}
        </div>
        <div className="flex justify-between">
          {/* <PaystackButton className="w-[100%]" {...paystackProps} /> */}
          {/* <Button
            block
            disabled={subscriptionWallet.status === "expired" ? false : true}
          >
            Resubscribe
          </Button> */}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default NotRenewingCard;
