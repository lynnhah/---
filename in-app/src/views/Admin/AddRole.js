import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { $addrole, $selectById, $update } from "../../api/RoleApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function AddRole({
  open,
  setOpen,
  loadList,
  roleId,
  setRoleId,
}) {
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  //定义表单实例
  let [form] = Form.useForm();

  useEffect(() => {
    if (roleId != 0) {
      $selectById(roleId).then((data) => {
        form.setFieldsValue({ rid: data.roleId, rname: data.roleName });
      }); //查询id
    }
  }, [roleId]);

  //清空表单
  const clear = () => {
    form.setFieldsValue({ rname: " " });
  };

  //是否打开抽屉
  const onClose = () => {
    clear();
    setRoleId(0); //取消编辑状态
    setOpen(false);
  };

  const onFinish = (values) => {
    if (roleId) {
      $update(JSON.stringify(values)).then((data) => {
        if (data.code == 200) {
          setNotiMsg({ type: "success", description: "修改成功" });
          loadList();
        } else {
          setNotiMsg({ type: "error", description: "修改失败" });
        }
      });
    } else {
      //添加角色
      $addrole(JSON.stringify(values)).then(({ code }) => {
        if (code == 200) {
          setNotiMsg({ type: "success", description: "添加成功" });
          loadList();
        } else {
          setNotiMsg({ type: "error", description: "添加失败" });
        }
      });
    }
  };

  return (
    <>
      <div className="search">
        <Drawer
          title={roleId ? "修改角色" : "添加角色"}
          width={500}
          placement="right"
          onClose={onClose}
          open={open}
        >
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 8,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item label="角色编号" name="rid" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="角色名称"
              name="rname"
              rules={[
                {
                  required: true,
                  message: "输入角色名称!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                {roleId ? "修改" : "添加"}
              </Button>
              <Button onClick={onClose} style={{ marginLeft: "10px" }}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        <MyNotification notiMsg={notiMsg} />
      </div>
    </>
  );
}
