import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import "./Layout.scss";
import {useNavigate,Outlet } from "react-router-dom";
const { Header, Sider} = Layout;
import { Content } from "antd/es/layout/layout";
export default function () {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("order");
  const onClickMenu = (e) => {
    // console.log(e);//得到key
    setCurrent(e.key);
    switch (e.key) {
      case "1-3": //退出
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
        break;
      case "buy": //购买平台
        navigate("/layout/buy/buyhotel")
        break;
      case "1-1"://个人中心
        navigate("/layout/personcenter")
    }
  };
  //左侧栏item
  const [cur, setCur] = useState("1-1");
  const items3 = [
    {
      label: "个人中心",
      key: "1",
      icon: <UserOutlined />,
      children: [
        {
          key: "1-1",
          icon: <UserOutlined />,
          label: "个人信息",
        },
        {
          key: "1-2",
          icon: <FormOutlined />,
          label: "修改密码",
        },
        {
          key: "1-3",
          icon: <LogoutOutlined />,
          label: "退出",
        },
      ],
    },
    {
      key: "buy",
      icon: <UserOutlined />,
      label: "购买",
      name:'/',
    },
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: "订单",
    },

    {
      key: "4",
      icon: <UploadOutlined />,
      label: "账户管理",
      children: [
        {
          key: "4-1",
          label: "角色管理",
        },
        {
          key: "4-2",
          label: "用户管理",
        },
      ],
    },
    {
      key: "5",
      icon: <UploadOutlined />,
      label: "订单管理",
    },
  ];

  //侧边栏折叠状态
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="layout">
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? "In" : "内购平台"}</div>
        <Menu
          onClick={onClickMenu}
          theme="light"
          mode="inline"
          defaultSelectedKeys={[cur]}
          defaultOpenKeys={["1"]}
          items={items3}
        />
      </Sider>
      <Layout>

        <Header theme="light" className="header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content>
          <Outlet></Outlet>
        </Content>

       
      </Layout>
    </Layout>
  );
}
