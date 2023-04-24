import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Pagination } from "antd";
import { $registlist, $del } from "../../api/RegistApi";
import { $userlist, $adduser } from "../../api/userApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function Register() {
  let [registList, setRegistList] = useState([]);
  let [userList, setUserList] = useState([]);
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });

  //分页  页码
  let [count, setCount] = useState(1);
  let [pageIndex, setPageIndex] = useState(1);
  let [curcount, setCurCount] = useState(0);

  const loadList = () => {
    $userlist().then((data) => {
      data = data.data.data.fileList.map((r) => {
        return {
          ...r,
          key: r.uid,
        };
      });
      setUserList(data);
    });
    $registlist(JSON.stringify({ pageSize: 3, pageIndex })).then((data) => {
      setCount(data.data.count);
      setCurCount(data.data.curcount);
      data = data.data.data.newfileList.map((r) => {
        return {
          ...r,
          key: r.rid,
        };
      });
      setRegistList(data);
    });
  };

  useEffect(() => {
    loadList();
  }, [pageIndex, count]);

  //删除
  const del = (rid) => {
    $del(JSON.stringify(rid)).then((data) => {
      if (data.status == 200) {
        setNotiMsg({ type: "success", description: "删除成功" });
        loadList();
        curcount--;
        setCurCount(curcount);
        if (curcount == 0) {
          pageIndex--;
          setPageIndex(pageIndex);
        }
      } else {
        setNotiMsg({ type: "error", description: "删除失败" });
      }
    });
  };
  const pass = (r) => {
    r.uid = userList.length + 1;
    $adduser(JSON.stringify(r)).then((data) => {
      if (data.status == 200) {
        $del(JSON.stringify(r.rid)).then((data) => {
          if (data.status == 200) {
            loadList();
            setNotiMsg({ type: "success", description: "审核通过" });
            curcount--;
            setCurCount(curcount);
            if (curcount == 0) {
              pageIndex--;
              setPageIndex(pageIndex);
            }
          }
        });
      } else {
        setNotiMsg({ type: "error", description: "审核失败" });
      }
    });
  };

  const columns = [
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
              pass(ret);
            }}
          >
            审核通过
          </Button>
          <Popconfirm
            title="系统确认"
            description="确定不通过该用户?"
            onConfirm={() => {
              del(ret.rid);
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" danger>
              审核不通过
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="search">
        <MyNotification notiMsg={notiMsg} />
      </div>
      <Table dataSource={registList} columns={columns} pagination={false} />
      <Pagination
        defaultCurrent={pageIndex}
        total={count}
        pageSize={3}
        onChange={(page) => {
          setPageIndex(page);
        }}
      />
    </>
  );
}
