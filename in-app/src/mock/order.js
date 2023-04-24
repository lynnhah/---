import { baseURL } from "../config/index";

let fileList = [
  {
    oid: 1,
    uid: 3,
    img: require("../asstes/orderImg/hotel.png"),
    oname: "上海嘉定禧玥酒店",
    location: "伯乐路100号",
    starttime: "2023-04-01",
    endtime: "2023-04-06",
    price: "626",
    state: "togo",
    statemsg: "未出行",
  },
  {
    oid: 2,
    uid: 3,
    img: require("../asstes/orderImg/flight.png"),
    oname: "上海虹桥机场",
    location: "伯乐路101号",
    starttime: "2023-04-01",
    endtime: "2023-04-02",
    price: "618",
    state: "topay",
    statemsg: "待付款",
  },
  {
    oid: 3,
    uid: 3,
    img: require("../asstes/orderImg/hotel.png"),
    oname: "上海嘉定禧玥酒店",
    location: "伯乐路102号",
    starttime: "2023-04-01",
    endtime: "2023-04-06",
    price: "626",
    state: "done",
    statemsg: "待评价",
  },
  {
    oid: 4,
    uid: 3,
    img: require("../asstes/orderImg/hotel.png"),
    oname: "上海嘉定禧玥酒店",
    location: "伯乐路102号",
    starttime: "2023-04-01",
    endtime: "2023-04-06",
    price: "626",
    state: "done",
    statemsg: "已完成",
  },
  {
    oid: 5,
    uid: 4,
    img: require("../asstes/orderImg/hotel.png"),
    oname: "上海嘉定禧玥酒店",
    location: "伯乐路100号",
    starttime: "2023-04-01",
    endtime: "2023-04-06",
    price: "626",
    state: "togo",
    statemsg: "未出行",
  },
  {
    oid: 6,
    uid: 4,
    img: require("../asstes/orderImg/flight.png"),
    oname: "上海虹桥机场",
    location: "伯乐路101号",
    starttime: "2023-04-01",
    endtime: "2023-04-02",
    price: "618",
    state: "topay",
    statemsg: "待付款",
  },
  {
    oid: 7,
    uid: 4,
    img: require("../asstes/orderImg/hotel.png"),
    oname: "上海嘉定禧玥酒店",
    location: "伯乐路102号",
    starttime: "2023-04-01",
    endtime: "2023-04-06",
    price: "626",
    state: "done",
    statemsg: "待评价",
  },
];
fileList = fileList.reverse();
export default [
  {
    url: baseURL + "Order",
    type: "post",
    response: (params) => {
      let data = JSON.parse(params.body);
      let pageSize = data.pageSize;
      let pageIndex = data.pageIndex;
      let newfileList = fileList.slice(
        (pageIndex - 1) * pageSize,
        pageIndex * pageSize
      );
      return {
        code: 200,
        data: {
          newfileList,
        },
        count: fileList.length,
        curcount: newfileList.length,
      };
    },
  },
  {
    url: baseURL + "Order/user",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: {
          fileList,
        },
      };
    },
  },

  {
    url: baseURL + "Order/del",
    type: "post",
    response: (params) => {
      let id = JSON.parse(params.body);
      fileList = fileList.filter((item) => item.oid != id);
      return {
        code: 200,
      };
    },
  },
  {
    url: baseURL + "Order/selectByUid",
    type: "post",
    response: (params) => {
      let id = JSON.parse(params.body);
      let newfileList = fileList.filter((item) => item.uid == id);
      return {
        code: 200,
        newfileList,
      };
    },
  },
  {
    url: baseURL + "Order/selectByOid",
    type: "post",
    response: (params) => {
      let id = JSON.parse(params.body);
      let newfileList = fileList.filter((item) => item.oid == id);
      return {
        code: 200,
        newfileList,
        count: newfileList.length,
      };
    },
  },
  {
    url: baseURL + "Order/newHotelOrder",
    type: "post",
    response:(params)=>{
      let orderInfo = JSON.parse(params.body);
      orderInfo.oid=fileList.length+1
      orderInfo.img=require("../asstes/orderImg/hotel.png")
      fileList.unshift(orderInfo) //加到开头，因为是最新订单
      return {
        code: 200,
        data:'successfully add new order'
      };
     }
  }
];
