import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { $rolelist, $del } from "../../api/RoleApi";
import AddRole from "./AddRole";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function Role() {
  let [roleList, setRoleList] = useState([]);
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  //是否打开抽屉
  let [open, setOpen] = useState(false);
  //加载列表数据
  const loadList = () => {
    $rolelist().then((data) => {
      data = data.data.data.fileList.map((r) => {
        return {
          ...r,
          key: r.rid,
        };
      });
      setRoleList(data);
    });
  };
  useEffect(() => {
    loadList();
  }, []);

  //删除
  const del = (rid) => {
    if (rid == 1) {
      setNotiMsg({ type: "error", description: "系统管理员不可删除" });
    } else {
      $del(JSON.stringify(rid)).then(({ code }) => {
        if (code == 200) {
          setNotiMsg({ type: "success", description: "删除成功" });
          loadList();
        } else {
          setNotiMsg({ type: "error", description: "删除失败" });
        }
      });
    }
  };
  //编辑状态ID
  let [roleId, setRoleId] = useState(0);
  //编辑
  const edit = (rid) => {
    if (rid == 1) {
      setNotiMsg({ type: "error", description: "系统管理员不可编辑" });
    } else {
      setOpen(true); //打开抽屉
      setRoleId(rid); //设置为编辑状态
    }
  };

  const columns = [
    {
      title: "角色编号",
      dataIndex: "rid",
    },
    {
      title: "角色名称",
      dataIndex: "rname",
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
              edit(ret.rid);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="系统确认"
            description="确定删除该权限角色?"
            onConfirm={() => {
              del(ret.rid);
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
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          添加
        </Button>
      </div>

      <Table dataSource={roleList} columns={columns} />
      <AddRole
        open={open}
        setOpen={setOpen}
        loadList={loadList}
        roleId={roleId}
        setRoleId={setRoleId}
      />
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}
