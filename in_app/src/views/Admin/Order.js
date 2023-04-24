import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Drawer,
  Form,
  Input,
  Pagination,
} from "antd";
import { $orderlist, $del, $selectByOid } from "../../api/OrderApi";
import MyNotification from "../../components/MyNotification/MyNotification";

export default function Order() {
  let [orderList, setOrderList] = useState([]);
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  let [orderId, setOid] = useState(0);
  let [selectorderId, setselectOid] = useState(0);

  //分页  页码
  let [count, setCount] = useState(1);
  let [pageIndex, setPageIndex] = useState(1);
  let [curcount, setCurCount] = useState(0);
  //定义表单实例
  let [form] = Form.useForm();
  //加载列表数据
  const loadList = () => {
    if (selectorderId != 0) {
      $selectByOid(selectorderId).then((data) => {
        setCount(data.count);
        data = data.newfileList.map((r) => {
          return {
            ...r,
            key: r.oid,
          };
        });
        setOrderList(data);
      });
    } else {
      $orderlist(JSON.stringify({ pageSize: 4, pageIndex })).then((data) => {
        //数据总数量
        setCount(data.count);
        setCurCount(data.curcount);
        data = data.data.newfileList.map((r) => {
          return {
            ...r,
            key: r.oid,
          };
        });
        setOrderList(data);
      });
    }
  };
  useEffect(() => {
    loadList();
    if (orderId != 0) {
      $selectByOid(orderId).then((data) => {
        data = data.newfileList[0];
        form.setFieldsValue({
          oid: data.oid,
          uid: data.uid,
          oname: data.oname,
          location: data.location,
          starttime: data.starttime,
          endtime: data.endtime,
          price: data.price,
          statemsg: data.statemsg,
        });
      }); //查询id;
    }
  }, [orderId, pageIndex, selectorderId]);

  //删除
  const del = (oid) => {
    $del(JSON.stringify(oid)).then(({ code }) => {
      if (code == 200) {
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
  //清空表单
  const clear = () => {
    form.setFieldsValue({
      oid: "",
      uid: "",
      oname: "",
      location: "",
      starttime: "",
      endtime: "",
      price: "",
      statemsg: "",
    });
  };
  let [open, setOpen] = useState(false);

  //是否打开抽屉
  const onClose = () => {
    clear();
    setOid(0); //取消查看状态
    setOpen(false);
  };
  const search = (oid) => {
    setOpen(true); //打开抽屉
    setOid(oid); //设置为查看状态
  };

  const columns = [
    {
      title: "订单编号",
      dataIndex: "oid",
    },
    {
      title: "用户编号",
      dataIndex: "uid",
    },
    {
      title: "订单名称",
      dataIndex: "oname",
    },
    {
      title: "订单价格",
      dataIndex: "price",
    },
    {
      title: "订单状态",
      dataIndex: "statemsg",
    },
    {
      title: "操作",
      key: "action",
      render: (ret) => (
        <>
          <Button
            size="small"
            style={{ marginRight: 15, borderColor: "orange", color: "orange" }}
            onClick={() => {
              search(ret.oid);
            }}
          >
            查看
          </Button>
          <Popconfirm
            title="系统确认"
            description="确定删除订单?"
            onConfirm={() => {
              del(ret.oid);
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
      <Drawer
        title="查看订单详情"
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
          autoComplete="off"
        >
          <Form.Item label="订单编号" name="oid">
            <Input placeholder="Borderless" bordered={false} readOnly={true} />
          </Form.Item>
          <Form.Item label="用户编号" name="uid">
            <Input placeholder="Borderless" bordered={false} readOnly={true} />
          </Form.Item>
          <Form.Item label="订单名称" name="oname">
            <Input placeholder="Borderless" bordered={false} readOnly={true} />
          </Form.Item>
          <Form.Item label="详细地址" name="location">
            <Input placeholder="Borderless" bordered={false} readOnly={true} />
          </Form.Item>
          <Form.Item label="时间">
            <Form.Item label="自" name="starttime">
              <Input
                placeholder="Borderless"
                bordered={false}
                readOnly={true}
              />
            </Form.Item>
            <Form.Item label="至" name="endtime">
              <Input
                placeholder="Borderless"
                bordered={false}
                readOnly={true}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="价格" name="price">
            <Input placeholder="Borderless" bordered={false} readOnly={true} />
          </Form.Item>
          <Form.Item label="订单状态" name="statemsg">
            <Input placeholder="Borderless" bordered={false} readOnly={true} />
          </Form.Item>
        </Form>
      </Drawer>
      <div
        style={{ display: "flex", width: 500, paddingTop: 20, paddingLeft: 10 }}
      >
        <Input
          style={{ width: 200 }}
          placeholder="请输入订单编号"
          onChange={(value) => {
            setselectOid(value.target.value);
          }}
        />
        <Button
          style={{ marginLeft: 10 }}
          type="primary"
          htmlType="submit"
          onClick={() => {
            loadList();
          }}
        >
          查询
        </Button>
      </div>
      <Table dataSource={orderList} columns={columns} pagination={false} />
      <Pagination
        defaultCurrent={pageIndex}
        total={count}
        pageSize={4}
        onChange={(page) => {
          setPageIndex(page);
        }}
      />
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}
