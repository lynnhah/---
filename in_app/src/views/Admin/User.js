import React, { useEffect, useState } from "react";
import { Table, Button, Form, Drawer, Input, Select, Popconfirm } from "antd";
import {
  $userlist,
  $adduser,
  $del,
  $selectById,
  $update,
} from "../../api/userApi";
import { $rolelist } from "../../api/RoleApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function User() {
  let [userList, setUserList] = useState([]);
  let [roleList, setRoleList] = useState([]);
  let [open, setOpen] = useState(false);
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  let [selectuserId, setSelectuserId] = useState(0);

  const loadList = () => {
    if (selectuserId != 0) {
      $selectById(selectuserId).then((data) => {
        data = data.newfileList.map((r) => {
          return {
            ...r,
            key: r.uid,
          };
        });
        setUserList(data);
      });
    } else {
      $userlist().then((data) => {
        data = data.data.data.fileList.map((r) => {
          return {
            ...r,
            key: r.uid,
          };
        });
        setUserList(data);
      });
    }

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
  //编辑
  //编辑状态ID
  let [uid, setUId] = useState(0);
  //编辑
  const edit = (uid) => {
    if (uid != 1) {
      setOpen(true); //打开抽屉
    }
    setUId(uid); //设置为编辑状态
  };
  useEffect(() => {
    loadList();
    if (uid != 0) {
      if (uid == 1) {
        setNotiMsg({ type: "error", description: "系统管理员不可编辑" });
      } else {
        $selectById(uid).then((data) => {
          data = data.newfileList[0];
          form.setFieldsValue({
            uid: data.uid,
            uname: data.uname,
            tel: data.tel,
            email: data.email.split("@")[0],
            role: data.role,
          });
        }); //查询id
      }
    }
  }, [uid, selectuserId]);
  //定义表单实例
  let [form] = Form.useForm();
  //清空表单
  const clear = () => {
    form.setFieldsValue({
      uid: "",
      uname: "",
      tel: "",
      role: "",
      password: "",
      email: "",
    });
  };

  //是否打开抽屉
  const onClose = () => {
    clear();
    setUId(0); //取消编辑状态
    setOpen(false);
  };
  //提交表单，添加用户
  const onFinish = (values) => {
    values.email = values.email + emailpack;
    if (uid) {
      $update(JSON.stringify(values)).then((data) => {
        if (data.code == 200) {
          setNotiMsg({ type: "success", description: "修改成功" });
          loadList();
        } else {
          setNotiMsg({ type: "error", description: "修改失败" });
        }
      });
    } else {
      //添加用户
      $adduser(JSON.stringify(values)).then((data) => {
        if (data.status == 200) {
          setNotiMsg({ type: "success", description: "修改成功" });
          loadList();
          clear();
          let fileList = data.data.data.fileList;
          form.setFieldsValue({ uid: fileList.pop().uid + 1 });
        } else {
          setNotiMsg({ type: "error", description: "修改失败" });
        }
      });
    }
  };
  //删除
  const del = (uid) => {
    if (uid == 1) {
      setNotiMsg({ type: "error", description: "系统管理员不可删除" });
    } else {
      $del(JSON.stringify(uid)).then((data) => {
        if (data.status == 200) {
          setNotiMsg({ type: "success", description: "删除成功" });
          loadList();
        } else {
          setNotiMsg({ type: "error", description: "删除失败" });
        }
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

  const columns = [
    {
      title: "用户编号",
      dataIndex: "uid",
    },
    {
      title: "用户名称",
      dataIndex: "uname",
    },
    {
      title: "用户角色",
      dataIndex: "role",
    },
    {
      title: "用户电话",
      dataIndex: "tel",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "操作",
      key: "action",
      render: (ret) => (
        <>
          <Button
            size="small"
            style={{ marginRight: 5, borderColor: "orange", color: "orange" }}
            onClick={() => {
              edit(ret.uid);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="系统确认"
            description="确定删除该用户?"
            onConfirm={() => {
              del(ret.uid);
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="search">
        <div
          style={{
            display: "flex",
            width: 500,
            paddingTop: 20,
            paddingLeft: 10,
          }}
        >
          <Input
            style={{ width: 200 }}
            placeholder="请输入用户编号进行查询"
            onChange={(value) => {
              value.target.value
                ? setSelectuserId(value.target.value)
                : setSelectuserId(0);
            }}
          />

          <Button
            style={{ marginLeft: 10 }}
            onClick={() => {
              $userlist().then((data) => {
                let fileList = data.data.data.fileList;
                form.setFieldsValue({ uid: fileList.pop().uid + 1 });
                setOpen(true);
              });
            }}
          >
            添加
          </Button>
        </div>

        <Drawer
          title={uid ? "修改用户信息" : "添加用户信息"}
          width={500}
          placement="right"
          onClose={onClose}
          open={open}
        >
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 6,
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
            <Form.Item label="用户编号" name="uid">
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
              label="用户密码"
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
              label="用户角色"
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

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 18,
              }}
            >
              <Button type="primary" htmlType="submit">
                {uid ? "修改" : "添加"}
              </Button>
              <Button onClick={onClose} style={{ marginLeft: "10px" }}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        <MyNotification notiMsg={notiMsg} />
      </div>

      <Table dataSource={userList} columns={columns} pagination={false} />
    </>
  );
}
