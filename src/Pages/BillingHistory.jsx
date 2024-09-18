import React, { useEffect, useState } from "react";
import UserDashLayout from "../Components/UserDashLayout";
import { useSupabaseAuth } from "../Context/Context";
import { Table } from "antd";
import { Supabase } from "../Functions/SupabaseClient";
import { title } from "process";

const BillingHistory = () => {
  const session = useSupabaseAuth();
  const [billingData, setBillingData] = useState();
  const [loading, setLoading] = useState(false);
  //   const [tableParams, setTableParams] = useState({
  //     pagination: {
  //       current: 0,
  //       pageSize: 5,
  //     },
  //   });

  useEffect(() => {
    if (!billingData) {
      fetchBillingInfo(session.user.id);
    }
  }, [
    session.user.id,
    billingData,
    // tableParams.pagination?.current,
    // tableParams.pagination?.pageSize,
    // tableParams?.sortOrder,
    // tableParams?.sortField,
    // JSON.stringify(tableParams.filters),
  ]);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
    },
    {
      title: "Billing Date",
      dataIndex: "created_at",
      defaultSortOrder: "descend",
      render: (val) => val.split("T")[0],
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      //   filters: [
      //     {
      //       text: "Pay as You Go",
      //       value: "paygo",
      //     },
      //     {
      //       text: "Subscription",
      //       value: "subscription",
      //     },
      //   ],
    },
    {
      title: "Token Amount",
      dataIndex: "amount",
      //   sorter: true,
    },
  ];

  const fetchBillingInfo = async (userId) => {
    try {
      setLoading(true);

      const { data, error } = await Supabase.from("transactions")
        .select("*")
        // .range(tableParams.pagination.current, tableParams.pagination.pageSize)
        .eq("user_id", userId);

      if (data) {
        setBillingData(data);
        // console.log("Billing data =>", data);
      }
      if (error) {
        console.log("error on billing data", error.message);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <UserDashLayout>
      <div className=" text-left">
        <span className="text-[18px] ml-8  -tracking-[0.1px] text-gradient bg-gradient-to-tr from-[#3EB489] to-[#08415c] font-semibold">
          Billing History
        </span>{" "}
        <br />
        <hr className="mt-16 h-0.5 mx-auto my-4 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
        <span className="text-[11px] ml-8   text-gray-700">
          Keep track of transactions done on your account here. The invoice of
          all transactions completed or failed will be sent to your email.
        </span>{" "}
        <Table
          className="mt-8"
          columns={columns}
          dataSource={billingData}
          loading={loading}
        />
      </div>
    </UserDashLayout>
  );
};

export default BillingHistory;
