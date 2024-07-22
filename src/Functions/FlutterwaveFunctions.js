const Flutterwave = require("flutterwave-node-v3");
// import Rave from "flutterwave-node-v3";
const flw = new Flutterwave(
  "FLWPUBK-c755e2d572bedc782be23c737a6d24e5-X",
  "FLWSECK-75553c5aa90a98c440c55111fdd6667d-190b5af428cvt-X"
);
const axios = require("axios");
const CreatePaymentPlan = async () => {
  //
  //   const res = await flw.PaymentPlan.create(details)
  //     .then(console.log)
  //     .catch(console.log);

  const { data } = await axios.post(
    `https://api.flutterwave.com/v3/payment-plans`,
    {
      amount: 150,
      name: "PDI Subscription",
      interval: "monthly",
      currency: "KSH",
    },
    {
      headers: {
        Authorization: `Bearer FLWSECK-75553c5aa90a98c440c55111fdd6667d-190b5af428cvt-X`,
        "Content-Type": "application/json", // Adjust the Content-Type if necessary
      },
    }
  );

  console.log(data);

  //   return res;
};

CreatePaymentPlan();
