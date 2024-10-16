import { Card, ConfigProvider } from "antd";
import React from "react";

const NotRenewingCard = () => {
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
