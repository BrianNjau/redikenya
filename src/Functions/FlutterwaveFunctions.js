const Flutterwave = require("flutterwave-node-v3");
// import Rave from "flutterwave-node-v3";
const flw = new Flutterwave(
  "FLWPUBK-c755e2d572bedc782be23c737a6d24e5-X",
  "FLWSECK-75553c5aa90a98c440c55111fdd6667d-190b5af428cvt-X"
);

export const CreatePaymentPlan = async (details) => {
  //
  const res = await flw.PaymentPlan.create(details)
    .then(console.log)
    .catch(console.log);

  return res;
};
