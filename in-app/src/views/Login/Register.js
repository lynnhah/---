import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Button, Form, Input, Select } from "antd";
import { $rolelist } from "../../api/RoleApi";
import { useNavigate } from "react-router-dom";
import MyNotification from "../../components/MyNotification/MyNotification";
import { $add } from "../../api/RegistApi";
import Background from '../../asstes/bg.jpg';


export default function Register() {
  var sectionStyle = {
    width: "100%",
    backgroundImage: `url(${Background})` 
  };
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  //定义表单实例
  let [form] = Form.useForm();
  //导航
  let navigate = useNavigate();
  let [roleList, setRoleList] = useState([]);
  const loadList = () => {
    $rolelist().then((data) => {
      data = data.data.data.fileList.map((r) => {
        if (r.rname == "系统管理员") {
          return;
        } else {
          return {
            value: r.rname,
            label: r.rname,
          };
        }
      });
      setRoleList(data.filter(Boolean));
    });
  };
  useEffect(() => {
    loadList();
  }, []);

  //清空表单
  const clear = () => {
    form.setFieldsValue({
      uname: "",
      tel: "",
      role: "",
      password: "",
      email: "",
    });
  };
  const onFinish = (values) => {
    $add(JSON.stringify(values)).then((data) => {
      if (data.status == 200) {
        setNotiMsg({
          type: "success",
          description: "注册成功，请等待管理员审核",
        });
        clear();
      } else {
        setNotiMsg({ type: "error", description: "注册失败" });
      }
    });
  };
  const [emailpack, setEmailpack] = useState("@163.com");
  const selectAfter = (
    <Select
      style={{ width: 120 }}
      value={emailpack}
      onChange={(e) => {
        setEmailpack(e);
      }}
    >
      <Select.Option value="@163.com">@163.com</Select.Option>
      <Select.Option value="@qq.com">@qq.com</Select.Option>
      <Select.Option value="@gmail.com">@gmail.com</Select.Option>
      <Select.Option value="@189.com">@189.com</Select.Option>
    </Select>
  );

  //取消返回登录界面
  const cancel = () => {
    navigate("/");
  };
  return (
    <>
      <div className="login" style={sectionStyle}>
        <div className="content" style={{ height: 400 }}>
          <div className="content-title">用户注册</div>
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="uname"
              rules={[
                {
                  required: true,
                  message: "输入用户名称!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
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
              label="手机"
              name="tel"
              rules={[
                {
                  required: true,
                  message: "输入电话!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="邮  箱"
              name="email"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 15,
              }}
            >
              <Input addonAfter={selectAfter} />
            </Form.Item>
            <Form.Item
              label="角色"
              name="role"
              rules={[
                {
                  required: true,
                  message: "输入用户名称!",
                },
              ]}
            >
              <Select
                style={{
                  width: 120,
                }}
                options={roleList}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 18,
              }}
            >
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Button style={{ marginLeft: "10px" }} onClick={cancel}>
                取消
              </Button>
            </Form.Item>
          </Form>
          <MyNotification notiMsg={notiMsg}></MyNotification>
        </div>
      </div>
    </>
  );
}
