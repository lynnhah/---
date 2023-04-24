import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./views/Login/Login";
import LA from "./views/Layout/Layout-admin";
import LU from "./views/Layout/Layout-user";
import Role from "./views/Admin/Role";
import User from "./views/Admin/User";
import Order from "./views/User/Order/Order";
import OrderTogo from "./views/User/Order/OrderTogo";
import OrderList from "./views/User/Order/OrderList";
import OrderTopay from "./views/User/Order/OrderTopay";
import OrderTocomment from "./views/User/Order/OrderTocomment";
import Mine from "./views/User/Mine";
import Update from "./views/User/Update";
import Register from "./views/Login/Register";
import Regist from "./views/Admin/Regist";
import OrderAdmin from "./views/Admin/Order";
import Layout_Buy from "./views/Layout_Buy/Layout_Buy";
import Layout_hotel from "./views/Layout_hotel/Layout_hotel";
import HotelDetail from "./views/HotelDetail/HotelDetail";

import "../src/mock";

import { useDispatch } from "react-redux";
import { userSlice } from "./redux";
import { $selectById } from "./api/userApi";

function App() {
  //定义redux派发器
  const dispatch = useDispatch();
  //获取更新user全局数据的action
  let { setUser } = userSlice.actions;
  useEffect(() => {
    if (sessionStorage.getItem("uid")) {
      let uid = sessionStorage.getItem("uid");
      $selectById(uid).then((user) => {
        console.log(user);
        user = user.newfileList[0];
        dispatch(setUser(user));
      });
      //将当前登录账户信息存储到redux
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/layout-admin" element={<LA />}>
          <Route path="role" element={<Role />}></Route>
          <Route path="user" element={<User />}></Route>
          <Route path="regist" element={<Regist />}></Route>
          <Route path="order" element={<OrderAdmin />}></Route>
        </Route>
        <Route path="/layout-user" element={<LU />}>
          <Route path="mine" element={<Mine />}></Route>
          <Route path="update" element={<Update />}></Route>
          <Route path="order" element={<Order />}>
            <Route path="orderlist" element={<OrderList />}></Route>
            <Route path="togo" element={<OrderTogo />}></Route>
            <Route path="topay" element={<OrderTopay />}></Route>
            <Route path="tocomment" element={<OrderTocomment />}></Route>
          </Route>
          <Route path="buy" element={<Layout_hotel />}>
            <Route path="buyhotel" element={<Layout_Buy />}></Route>
            <Route path="hoteldetail" element={<HotelDetail />}></Route>
          </Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
