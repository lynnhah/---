import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  FormOutlined,
  LogoutOutlined,
  ExclamationCircleFilled,
  ShoppingOutlined,
  HomeOutlined,
  ShopOutlined,
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

  const { confirm } = Modal;
  const onClickMenu = (e) => {
    //console.log(e);//得到key
    setCur(e.key);
    switch (e.key) {
      case "order":
        navigate("/layout-user/order/orderlist");
        break;
      case "info":
        navigate("/layout-user/mine");
        break;
      case "update":
        navigate("/layout-user/update");
        break;
      case "buy": //购买平台
        navigate("/layout-user/buy/buyhotel");
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
  //左侧栏item
  const [cur, setCur] = useState("info");
  const items3 = [
    {
      label: "个人中心",
      key: "1",
      icon: <HomeOutlined />,
      children: [
        {
          key: "info",
          icon: <UserOutlined />,
          label: "个人信息",
        },
        {
          key: "update",
          icon: <FormOutlined />,
          label: "修改信息",
        },
        {
          key: "exit",
          icon: <LogoutOutlined />,
          label: "退出",
        },
      ],
    },
    {
      key: "buy",
      icon: <ShopOutlined />,
      label: "购买",
    },
    {
      key: "order",
      icon: <ShoppingOutlined />,
      label: "订单",
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
        <Content className="content">
          <div className="menu-content">
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
