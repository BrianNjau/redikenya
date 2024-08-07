import React, { useContext, useEffect, useState } from "react";
import { CompassOutlined, WalletOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  ConfigProvider,
  Image,
  Layout,
  Menu,
  Popover,
  Skeleton,
  Spin,
  theme,
} from "antd";
import LogoWhite from "../Assets/img/lightL.png";
import { GlobalContext, useSupabaseAuth } from "../Context/Context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Supabase } from "../Functions/SupabaseClient";
const { Header, Content, Footer, Sider } = Layout;

const UserDashLayout = ({ children }) => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  const { setHeaderHeight } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const location = useLocation();
  const [tokenCount, setTokenCount] = useState();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }

    setHeaderHeight(0);
    getTokenCount(session.user.id);
  }, [tokenCount, session]);

  const getTokenCount = async (userId) => {
    try {
      setLoadingTokens(true);
      const { data, error } = await Supabase.from("tokens")
        .select("token_count")
        .eq("user_id", userId)
        .single();
      if (error) console.error("Error fetching token count:", error.message);

      if (data) {
        setTokenCount(data.token_count);
      }
      setLoadingTokens(false);
    } catch (err) {
      console.log(err);
      setLoadingTokens(false);
    }
  };

  const items = [
    {
      key: "user-dashboard",
      icon: React.createElement(CompassOutlined),
      label: <Link to="/user-dashboard">Dashboard</Link>,
    },
    {
      key: "billing1",
      label: "Billing",
      icon: <i className="feather-credit-card mr-1"></i>,
      children: [
        {
          key: "manage-plan",
          label: <Link to="/manage-plan">Manage Plan</Link>,
        },
        {
          key: "purchase-token",
          label: <Link to="/purchase-token">Purchase Tokens</Link>,
        },
        {
          key: "billingSub3",
          label: "Billing History",
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "account1",
      label: "Account",
      icon: <i className="feather-settings mr-1"></i>,
      children: [
        {
          key: "accountSub1",
          label: "Edit Profile",
        },
        {
          key: "accountSub2",
          label: "Account Status",
        },
        {
          key: "accountSub3",
          label: <button onClick={Logout}>Sign Out</button>,
        },
      ],
    },
  ];
  async function Logout() {
    try {
      //
      setLoading(true);
      const { error } = await Supabase.auth.signOut();

      if (error) console.log(error);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorPrimary: "#3eb489",
          },
        },
      }}
    >
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical mt-2 mb-16">
            <Link to="/">
              {" "}
              <Image
                preview={false}
                className="default-logo p-1"
                loading="lazy"
                src={LogoWhite}
                width={180}
                alt="logo"
              />
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname.split("/")[1]]}
            defaultOpenKeys={["billing1", "account1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Spin spinning={loading} fullscreen />
            <div className="float-right mr-8">
              <button>
                <Popover
                  placement="bottom"
                  title={
                    <>
                      <span className="font-serif ml-12">Recent activity</span>
                      <hr className=" w-[80%] h-0.5 mx-auto my-2 bg-gray-400 border-0 rounded md:my-10 dark:bg-gray-700" />
                    </>
                  }
                  trigger="click"
                >
                  <Badge dot>
                    <Avatar
                      style={{
                        backgroundColor: "#08415c",
                        color: "#3EB489",
                      }}
                      className=""
                      shape="square"
                    >
                      <i className="feather-bell"></i>
                      {/*  {userMeta.fullName.split(" ")[0][0]} */}
                    </Avatar>
                  </Badge>
                </Popover>

                {/* {userMeta.fullName} */}
                <span className="ml-4">
                  {" "}
                  <i className="line-icon-Wallet-2 mr-2"></i> {tokenCount}{" "}
                  {/* <Avatar
                    style={{
                      backgroundColor: "#08415c",
                      color: "#3EB489",
                    }}
                    className="ml-1"
                    shape="square"
                  ></Avatar> */}
                </span>

                {/* Tokens: */}
              </button>
            </div>
          </Header>
          <Content
            style={{
              margin: "36px 24px 0",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: "82.2vh",
                height: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            PDI Marketplace Kenya ©{new Date().getFullYear()} All rights
            reserved
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default UserDashLayout;
