import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
export default function Mine() {
  //获取登录信息子模块
  const userSlice = useSelector((state) => state.userSlice);
  const user = userSlice.user;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        title="个人信息"
        bordered={false}
        style={{
          width: 400,
          fontSize: 20,
        }}
      >
        <div style={{ marginLeft: 20 }}>
          头像：
          <img
            src={user.img}
            alt="无法加载图片"
            style={{ width: 150, height: 130 }}
          />
          <p>账号：{user.uid}</p>
          <p>姓名：{user.uname}</p>
          <p>电话：{user.tel}</p>
          <p>邮箱：{user.email}</p>
          <p>角色：{user.role}</p>
          <p>钱包:￥10000</p>
        </div>
      </Card>
    </div>
  );
}
