import { baseURL } from "../config/index";

import md5 from "md5";

let fileList = [
  {
    uid: 1,
    uname: "admin",
    password: "510358e78bf6a7bcd1363880d1dd9c4a", //123321
    email: "admin@163.com",
    tel: "admin",
    img: require("../asstes/userImg/1.jpg"),
    role: "系统管理员",
    token: "admin",
  },
  {
    uid: 2,
    uname: "root",
    password: "500e5e6b1f589977cd09c189de7dacb8", //root
    email: "root@163.com",
    tel: "root",
    img: require("../asstes/userImg/1.jpg"),
    role: "普通管理员",
    token: "root",
  },
  {
    uid: 3,
    uname: "user",
    password: "24d0a12aa6cfca1e8e4e1e7d07ddeed5", //user
    email: "user@163.com",
    tel: "user",
    img: require("../asstes/userImg/1.jpg"),
    role: "用户",
    token: "user",
    moneybag:1500,
  },
  {
    uid: 4,
    uname: "user2",
    password: "0aba7fcca53283ab2232d95c627f9928", //user2
    email: "user2@163.com",
    tel: "123",
    img: require("../asstes/userImg/2.jpg"),
    role: "用户",
    token: "user2",
    moneybag:8888,
  },
];
export default [
  {
    url: baseURL + "User",
    type: "get",
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
    url: baseURL + "User/add",
    type: "post",
    response: (params) => {
      let newdata = JSON.parse(params.body);
      newdata.password = md5(
        md5(md5(newdata.password).split("").reverse().join(""))
      );
      fileList.push({
        uid: newdata.uid,
        uname: newdata.uname,
        password: newdata.password,
        tel: newdata.tel,
        role: newdata.role,
        email: newdata.email,
        token: "user2",
      });
      return {
        code: 200,
        data: {
          fileList,
        },
      };
    },
  },
  {
    url: baseURL + "User/del",
    type: "post",
    response: (params) => {
      let id = JSON.parse(params.body);
      fileList = fileList.filter((item) => item.uid != id);
      return {
        code: 200,
      };
    },
  },
  {
    url: baseURL + "User/select",
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
    url: baseURL + "User/update",
    type: "post",
    response: (params) => {
      let data = JSON.parse(params.body);
      data.password = md5(md5(md5(data.password).split("").reverse().join("")));
      fileList.map((item) => {
        if (item.uid == data.uid) {
          item.uname = data.uname;
          item.password = data.password;
          item.tel = data.tel;
          item.role = data.role;
          item.img = data.img;
          item.email = data.email;
        }
      });
      return {
        code: 200,
      };
    },
  },
  {
    url: baseURL + "User/moneyReduce",
    type: "get",
    response: (params) => {
      console.log('123',JSON.parse(params.body)) //{userId:3,reduceMoney:1316}
      const info=JSON.parse(params.body)
      for(let i=0;i<fileList.length;i++){
        if(fileList[i].uid==info.userId){
          if(fileList[i].moneybag<info.reduceMoney){
            return {
              code: 200,
              message:'对不起，您的钱包余额不足'
            };
          }else{
            fileList[i].moneybag-=info.reduceMoney
            return {
              code: 200,
              message:'成功支付'
            }
          }
        }
      }
    }
  },
  {
    url: baseURL + "User/getPocket",
    type: "get",
    response: (params) => {
      console.log(JSON.parse(params.body))
      let uid=JSON.parse(params.body).userId
      for(let i=0;i<fileList.length;i++){
        if(fileList[i].uid==uid){
          return {
            code: 200,
            data:fileList[i].moneybag
          }
        }
      }
    }
  }
];
