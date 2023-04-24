import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Card } from "antd";
import { $update, $selectById } from "../../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "../../redux";
import MyNotification from "../../components/MyNotification/MyNotification";
import md5 from "md5";

export default function Update() {
  //获取登录信息子模块
  const userslice = useSelector((state) => state.userSlice);
  const user = userslice.user;
  let [form] = Form.useForm();
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  //定义redux派发器
  const dispatch = useDispatch();
  //获取更新user全局数据的action
  let { setUser } = userSlice.actions;

  useEffect(() => {
    if (user.uid != 0) {
      form.setFieldsValue({
        uid: user.uid,
        uname: user.uname,
        tel: user.tel,
        email: user.email.split("@")[0],
        role: user.role,
      }); //查询id
    }
  }, []);
  const onFinish = (values) => {
    values.email = values.email + emailpack;
    values.oldpassword = md5(
      md5(md5(values.oldpassword).split("").reverse().join(""))
    );

    if (values.oldpassword == user.password) {
      $update(JSON.stringify(values)).then((data) => {
        if (data.code == 200) {
          $selectById(user.uid).then((newuser) => {
            newuser = newuser.newfileList[0];
            newuser.img = user.img;
            dispatch(setUser(newuser));
          });
          setNotiMsg({ type: "success", description: "修改成功" });
          clear();
        } else {
          setNotiMsg({ type: "error", description: "修改失败" });
        }
      });
    } else {
      setNotiMsg({
        type: "error",
        description: "原始密码输入错误，请重新输入",
      });
    }
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
  //清空表单
  const clear = () => {
    form.setFieldsValue({ oldpassword: "", password: "", newpassword2: "" });
  };

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
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="头像" name="photo">
            <img src={user.img} alt="无法加载图片" style={{ width: 250 }} />
          </Form.Item>
          <Form.Item label="用户编号" name="uid" disabled>
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="用户名称"
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
            label="原始密码"
            name="oldpassword"
            rules={[
              {
                required: true,
                message: "请输入原始密码",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入新密码",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="newpassword2"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "请确认新密码",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码输入不一致!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="用户电话"
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
              span: 5,
            }}
            wrapperCol={{
              span: 15,
              offset: 1,
            }}
          >
            <Input addonAfter={selectAfter} />
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Input disabled />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <MyNotification notiMsg={notiMsg} />
    </div>
  );
}
