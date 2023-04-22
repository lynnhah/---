import axios from "../utils/request";
import "../mock/index";
import "../mock/user";
import "../mock/hotelInfo";

//登录
export const $login = async (params) => {
  //params是前端得到的数据
  //获取mock数据进行比对 data.data
  let data = await axios.get("/Login");
  let userList = data.data.data.fileList;
  const username = params.loginId,
        password = params.loginPwd;
  for (let i = 0; i < userList.length; i++) {
    //判断userList中是否存在该用户并且用户密码是否正确
    if (username === userList[i].name) {
      if (password === userList[i].password) {
        //登录成功，在浏览器缓存中国存储token
        sessionStorage.setItem("token", userList[i].token);
        return {
          meta: {
            msg: "success",
            status: 200,
          },
        };
      }
      return {
        meta: {
          msg: "密码错误",
          status: 201,
        },
      };
    }
  }
  return {
    meta: {
      msg: "用户不存在",
      status: 202,
    },
  };
};


//功能：获取酒店列表
export const $hotel = async () => {
  //params是前端得到的数据
  //获取mock数据进行比对 data.data
  let hotelInfo=await axios.get("/hotel");
 
  return {
    meta: {
      msg: "拿到了",
      status: 202,
      data:hotelInfo
    },
  };
};

//功能：通过id获取酒店信息
export const $hotelInfo = async (params) => {
  // console.log(JSON.stringify({id:params}))
  let hotelInfo=await axios.get("/hotelInfo",{data:JSON.stringify({id:params})});
  // console.log('1111',hotelInfo.data.data)

  return {
    meta: {
      msg: "成功拿到酒店具体信息",
      status: 202,
      data:hotelInfo.data.data
    },
  };
};

//功能：通过id获取酒店信息
export const $inventory = async (hotelId,roomName) => {
  let hotelInfo=await axios.get("/inventory",{data:JSON.stringify({id:hotelId,room:roomName})});

  return {
    meta: {
      msg: "成功拿到库存具体信息",
      status: 202,
      data:hotelInfo.data.data
    },
  };
};
