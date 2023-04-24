import { baseURL } from "../config/index";

import md5 from "md5";

let fileList = [
  {
    rid: 1,
    uname: "admin",
    password: "123321", //123321
    email: "admin@163.com",
    tel: "admin",
    role: "管理员",
    token: "admin",
  },
  {
    rid: 2,
    uname: "root",
    password: "root", //root
    email: "root@163.com",
    tel: "root",
    role: "普通管理员",
    token: "root",
  },
  {
    rid: 3,
    uname: "user",
    password: "user", //user
    email: "user@163.com",
    tel: "user",
    role: "用户",
    token: "user",
  },
  {
    rid: 4,
    uname: "user2",
    password: "user2", //user2
    email: "user2@163.com",
    tel: "123",
    role: "用户",
    token: "user2",
  },
];
export default [
  {
    url: baseURL + "regist",
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
    url: baseURL + "regist/add",
    type: "post",
    response: (params) => {
      let newdata = JSON.parse(params.body);

      fileList.push({
        rid: fileList.length + 1,
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
    url: baseURL + "regist/del",
    type: "post",
    response: (params) => {
      let id = JSON.parse(params.body);
      fileList = fileList.filter((item) => item.rid != id);
      return {
        code: 200,
      };
    },
  },
];
