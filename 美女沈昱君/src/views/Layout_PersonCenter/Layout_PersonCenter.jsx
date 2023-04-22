import React from 'react'
import { Menu } from "antd";
import { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import "./Layout_PersonCenter.scss";
export default function Layout_PersonCenter() {
  const onClickMenu = (e) => {
    console.log(e)
  }
  const [current, setCurrent] = useState("order");
  const items2 = [
    {
      label: "全部订单",
      key: "order",
      icon: <MailOutlined />,
    },
    {
      label: "未出行",
      key: "togo",
      icon: <MailOutlined />,
    },
    {
      label: "待付款",
      key: "topay",
      icon: <MailOutlined />,
    },
    {
      label: "待评价",
      key: "tocomment",
      icon: <MailOutlined />,
    },
  ];
  return (
    <div>
      <div className="person">张三</div>
      <Menu
      onClick={onClickMenu}
      className="menu"
      selectedKeys={[current]}
      mode="horizontal"
      items={items2}
      />

      <div className="menu-content">Content</div>
  </div>
  )
}
