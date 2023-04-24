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
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "./Layout.scss";
import { useNavigate, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
export default function () {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  //左侧栏item
  const [cur, setCur] = useState("1");
  const items = [
    {
      label: "个人中心",
      key: "1",
      icon: <UserOutlined />,
      children: [
        {
          key: "exit",
          icon: <LogoutOutlined />,
          label: "退出",
        },
      ],
    },
    {
      key: "account",
      icon: <UploadOutlined />,
      label: "账户管理",
      children: [
        {
          key: "role",
          label: "角色管理",
        },
        {
          key: "user",
          label: "用户管理",
        },
        {
          key: "regist",
          label: "用户注册管理",
        },
      ],
    },
    {
      key: "order",
      icon: <UploadOutlined />,
      label: "订单管理",
    },
  ];
  const { confirm } = Modal;
  const onClickMenu = (e) => {
    //console.log(e);//得到key
    setCur(e.key);
    switch (e.key) {
      //角色管理
      case "role":
        navigate("/layout-admin/role");
        break;
      case "user":
        navigate("/layout-admin/user");
        break;
      case "regist":
        navigate("/layout-admin/regist");
        break;
      case "order":
        navigate("/layout-admin/order");
        break;

      case "exit": //退出
        confirm({
          title: "系统提示",
          icon: <ExclamationCircleFilled />,
          content: "确定退出系统?",
          okText: "确定",
          cancelText: "取消",
          onOk() {
            sessionStorage.clear();
            localStorage.clear();
            navigate("/");
          },
          onCancel() {},
        });
        break;
    }
  };

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
          items={items}
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
        <Content className="content">
          <div className="menu-content">
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
