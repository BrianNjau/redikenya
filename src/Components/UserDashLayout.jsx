import React, { useContext, useEffect, useState } from "react";
import { CompassOutlined } from "@ant-design/icons";
import { ConfigProvider, Image, Layout, Menu, Spin, theme } from "antd";
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

  const location = useLocation();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }

    setHeaderHeight(0);
  }, [session]);

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
          key: "billing",
          label: <Link to="/billing">Billing History</Link>,
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
          key: "profile",
          label: <Link to="/profile">User Profile</Link>,
        },
        {
          key: "account",
          label: <Link to="/account">Account Status</Link>,
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
