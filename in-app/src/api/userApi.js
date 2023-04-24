import axios from "../utils/request";
import "../mock/index";
import "../mock/user";
import md5 from "md5";

//密码加密：md5(md5(md5("user2").split("").reverse().join("")))

//登录
export const $login = async (params) => {
  //params是前端得到的数据
  //获取mock数据进行比对 data.data
  let data = await axios.get("/User");
  let userList = data.data.data.fileList;
  const username = params.loginId,
    password = md5(md5(md5(params.loginPwd).split("").reverse().join("")));
  for (let i = 0; i < userList.length; i++) {
    //判断userList中是否存在该用户并且用户密码是否正确
    if (username === userList[i].uname) {
      if (password === userList[i].password) {
        //登录成功，在浏览器缓存中存储token
        sessionStorage.setItem("token", userList[i].token);
        return {
          meta: {
            msg: "success",
            status: 200,
            uid: userList[i].uid,
            uname: username,
            email: userList[i].email,
            pwd: userList[i].password,
            img: userList[i].img,
            tel: userList[i].tel,
            role: userList[i].role,
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

export const $userlist = async () => {
  let data = await axios.get("/User");
  return data;
};
export const $adduser = async (params) => {
  let data = await axios.post("/User/add", params);
  return data;
};
export const $del = async (params) => {
  let data = await axios.post("/User/del", params);
  return data;
};
//根据id获取用户
export const $selectById = async (params) => {
  let { data } = await axios.post("/User/select", params);
  return data;
};

//修改用户信息
export const $update = async (params) => {
  let { data } = await axios.post("/User/update", params);
  return data;
};

//功能：获取酒店列表
export const $hotel = async () => {
  //params是前端得到的数据
  //获取mock数据进行比对 data.data
  let hotelInfo = await axios.get("/hotel");

  return {
    meta: {
      msg: "拿到了",
      status: 202,
      data: hotelInfo,
    },
  };
};

//功能：通过id获取酒店信息
export const $hotelInfo = async (params) => {
  // console.log(JSON.stringify({id:params}))
  let hotelInfo = await axios.get("/hotelInfo", {
    data: JSON.stringify({ id: params }),
  });

  return {
    meta: {
      msg: "成功拿到酒店具体信息",
      status: 202,
      data: hotelInfo.data.data,
    },
  };
};

//功能：更新酒店房间库存
export const $inventory = async (hotelId, roomName) => {
  let hotelInfo = await axios.get("/inventory", {
    data: JSON.stringify({ id: hotelId, room: roomName }),
  });

  return {
    meta: {
      msg: "成功拿到库存具体信息",
      status: 202,
      data: hotelInfo.data.data,
    },
  };
};

// 功能：增加一个新订单后，用户的钱包扣钱
export const $moneyReduce=async(userId,reduceMoney)=>{
  let msg = await axios.get("/User/moneyReduce", {
    data: JSON.stringify({userId,reduceMoney}),
  });
  return {
    meta: {
      msg: msg.data.message,
      status: msg.data.code,
    },
  };

}

//功能：通过用户id获取用户信息（钱包信息）
export const $getPocket=async(userId)=>{
  console.log(userId)
  let info= await axios.get("/User/getPocket", {
    data: JSON.stringify({userId}),
  });
  return {
    meta: {
      data: info.data.data,
    },
  }
}



