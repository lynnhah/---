import React, { useState, useEffect } from "react";
import "./Login.scss";

import { Button, Checkbox, Form, Input, notification } from "antd";
import { $login } from "../../api/userApi";
import "../../mock/index.js";
import MyNotification from "../../components/MyNotification/MyNotification";
("../../components/MyNotification");

import { useNavigate } from "react-router-dom";
export default function Login() {
  //消息提示框
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

  //导航
  let navigate = useNavigate();
  //判断是否已登录  未完成
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/layout");
    }
  }, []);

  //表单成功提交
  const onFinish = async (values) => {
    //登录验证 如果成功则跳转
    let data = await $login(values);
    let status = data.meta.status;
    let msg = data.meta.msg;
    if (status == 200) {
      //成功
      setNotiMsg({ type: "success", description: msg });
      navigate("/layout");
    } else {
      //失败
      setNotiMsg({ type: "error", description: msg });
    }
    //登录成功
    //
  };
  return (
    <div className="login">
      <div className="content">
        <div className="content-title">用户登录</div>
        <Form
          name="basic"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
            loginId: "",
            loginPwd: "",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: "80px" }}
              htmlType="submit"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
      <MyNotification notiMsg={notiMsg} maxCount={3} />
    </div>
  );
}
