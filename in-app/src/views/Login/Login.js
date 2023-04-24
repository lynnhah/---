import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { $login, $selectById } from "../../api/userApi";
import "../../mock/index.js";
import MyNotification from "../../components/MyNotification/MyNotification";
("../../components/MyNotification");

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux";
import Background from "../../asstes/bg.jpg";

export default function Login() {
  var sectionStyle = {
    width: "100%",
    backgroundImage: `url(${Background})`,
  };
  //定义redux派发器
  const dispatch = useDispatch();
  //获取更新user全局数据的action
  let { setUser } = userSlice.actions;

  //消息提示框
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

  //导航
  let navigate = useNavigate();

  //判断是否已登录
  useEffect(() => {
    if (!sessionStorage.getItem("uid")) {
      navigate("/");
    }
  }, []);

  //表单成功提交
  const onFinish = async (values) => {
    //登录验证 如果成功则跳转
    let data = await $login(values);
    let status = data.meta.status;
    let uid = data.meta.uid;
    let uname = data.meta.uname;
    let email = data.meta.email;
    let tel = data.meta.tel;
    let role = data.meta.role;
    let password = data.meta.pwd;
    let img = data.meta.img;
    let msg = data.meta.msg;

    if (status == 200) {
      let user = { uid, uname, email, tel, role, password, img };
      //将用户信息缓存到session
      sessionStorage.setItem("uid", uid);
      //将当前登录账户信息存储到redux
      dispatch(setUser(user));
      //成功
      setNotiMsg({ type: "success", description: msg });
      let regex = /.*管理员/;
      if (regex.test(role)) {
        navigate("/layout-admin");
      } else {
        navigate("/layout-user/mine");
      }
    } else {
      //失败
      setNotiMsg({ type: "error", description: msg });
    }
  };

  //跳转注册页面
  const ToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="login" style={sectionStyle}>
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
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button style={{ marginLeft: "80px" }} onClick={ToRegister}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
      <MyNotification notiMsg={notiMsg} maxCount={3} />
    </div>
  );
}
