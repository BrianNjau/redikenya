import React, { useContext, useEffect, useState } from "react";
import { CompassOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider, Image, Layout, Menu, Spin, theme } from "antd";
import LogoWhite from "../Assets/img/lightL.png";
import { GlobalContext, useSupabaseAuth } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import { Supabase } from "../Functions/SupabaseClient";
const { Header, Content, Footer, Sider } = Layout;

const UserDashLayout = ({ children }) => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  const { setHeaderHeight } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!session) {
      navigate("/");
    }
    setHeaderHeight(0);
  }, []);

  let userMeta;
  if (session) {
    const { user_metadata } = session.user;
    userMeta = user_metadata;
  }

  const items = [
    {
      key: "1",
      icon: React.createElement(CompassOutlined),
      label: <Link to="/user-dashboard">Dashboard</Link>,
    },
    {
      key: "billing1",
      label: "Billing",
      icon: <i className="feather-credit-card mr-1"></i>,
      children: [
        {
          key: "billingSub1",
          label: "Manage Plan",
        },
        {
          key: "billingSub2",
          label: "Buy Tokens",
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
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
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
            defaultSelectedKeys={["1"]}
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
            <div className="float-right mr-4 ">
              <button>
                <Avatar
                  style={{
                    backgroundColor: "#08415c",
                    color: "#3EB489",
                  }}
                  className="mr-2"
                >
                  {userMeta.fullName.split(" ")[0][0]}
                </Avatar>
                {userMeta.fullName}
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
