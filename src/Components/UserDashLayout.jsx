import React, { useContext, useEffect } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import { Avatar, Image, Layout, Menu, theme } from "antd";
import LogoWhite from "../Assets/img/lightL.png";
import { GlobalContext, useSupabaseAuth } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const UserDashLayout = ({ children }) => {
  const session = useSupabaseAuth();
  const navigate = useNavigate();
  const { setHeaderHeight } = useContext(GlobalContext);
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

  //   const items = [
  //     UserOutlined,
  //     VideoCameraOutlined,
  //     UploadOutlined,
  //     UserOutlined,
  //   ].map((icon, index) => ({
  //     key: String(index + 1),
  //     icon: React.createElement(icon),
  //     label: `nav ${index + 1}`,
  //   }));

  const items = [
    {
      key: "1",
      icon: React.createElement(CompassOutlined),
      label: <Link to="/user-dashboard">Dashboard</Link>,
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
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
          PDI Marketplace Kenya ©{new Date().getFullYear()} All rights reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserDashLayout;
