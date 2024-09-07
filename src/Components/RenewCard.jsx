import { Button, Card } from "antd";
import React from "react";
import Buttons from "./Buttons";
import { useUserWallet } from "../Context/Context";

const RenewCard = () => {
  const { subscriptionWallet } = useUserWallet();

  return (
    <Card className="bg-slate-800" bordered={true}>
      <span className="font-medium mb-8 text-slate-200 ml-4">
        You cancelled your subscription
      </span>
      <div className="mt-12 mb-12 text-center ">
        {" "}
        <span className="text-[32px] text-white ml-2">
          {/* {loadingTokens ? "" : tokenCount} */}Ksh. 1,500
        </span>
        <span className="text-[11px] text-slate-300 ml-2">/ month</span>
      </div>
      <div className="flex justify-between  ">
        <span className="text-[12px] text-slate-300 ml-2">Monthly rolling</span>
        <span className="text-[14px] text-white ml-2"> 15 Tokens </span>
      </div>
      <div className="flex justify-between">
        {/* <PaystackButton className="w-[80%]" {...paystackProps} /> */}
        <Button
          // onClick={handleSub}
          className={
            " ml-4 mt-3 w-full font-base font-sans text-slate-300 border-[1px] border-solid border-white hover:text-slate-900 "
          }
          type="default"
        >
          Resubscribe
        </Button>
      </div>
    </Card>
  );
};

export default RenewCard;
