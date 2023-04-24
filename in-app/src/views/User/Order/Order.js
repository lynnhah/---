import React, { useState, useEffect } from "react";
import {
  MailOutlined,
  TransactionOutlined,
  ShoppingOutlined,
  CarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { $orderlist1 } from "../../../api/OrderApi";
import { $getPocket } from "../../../api/userApi";
import { useNavigate, Outlet } from "react-router-dom";

export default function Order() {
  //获取登录信息子模块
  const userSlice = useSelector((state) => state.userSlice);
  const user = userSlice.user;
  //中间
  const [current, setCurrent] = useState("order");
  const items2 = [
    {
      label: "全部订单",
      key: "order",
      icon: <ShoppingOutlined />,
    },
    {
      label: "未出行",
      key: "togo",
      icon: <CarOutlined />,
    },
    {
      label: "待付款",
      key: "topay",
      icon: <TransactionOutlined />,
    },
    {
      label: "待评价",
      key: "tocomment",
      icon: <MessageOutlined />,
    },
  ];
  const navigate = useNavigate();
  const onClickMenu = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "order":
        navigate("/layout-user/order/orderlist");
        break;
      case "togo":
        navigate("/layout-user/order/togo");
        break;
      case "topay":
        navigate("/layout-user/order/topay");
        break;
      case "tocomment":
        navigate("/layout-user/order/tocomment");
        break;
    }
  };
  //订单数据
  const [orderList, setOrderList] = useState([]);
  const loadList = () => {
    $orderlist1().then((data) => {
      data = data.data.fileList.map((r) => {
        return {
          ...r,
          key: r.oid,
        };
      });
      setOrderList(data);
    });
  };
  useEffect(() => {
    loadList();
  }, [orderList]);

  const [moneyBag,setMoneyBag]=useState(10000)
  useEffect(()=>{//钱包余额
    async function getPocketMoney(){
      const data=await $getPocket(user.uid)
      console.log(data.meta.data)
      setMoneyBag(data.meta.data)

    }
    getPocketMoney()
  },[])

  return (
    <>
      <div
        style={{
          height: 160,
          marginBottom: 5,
          backgroundColor: "#a4cdf9",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src={user.img}
            alt="无法加载图片"
            style={{ width: 140, marginTop: "30px" }}
          />
          <div
            style={{
              marginLeft: "30px",
              marginTop: "55px",
              fontSize: "30px",
              width: 200,
            }}
          >
            <p style={{ color: "white" }}>{user.uname}</p>
          </div>
        </div>
      </div>
      <div style={{ fontSize: "15px" }}>
        <span style={{ marginLeft: "10px", marginRight: "30px" }}>
          钱包余额:￥{moneyBag}
        </span>
        <span>优惠券:2</span>
      </div>
      <Menu
        onClick={onClickMenu}
        className="menu"
        selectedKeys={[current]}
        mode="horizontal"
        items={items2}
        style={{ marginTop: "20px" }}
      />
      <Outlet></Outlet>
    </>
  );
}
