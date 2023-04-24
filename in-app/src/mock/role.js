import { baseURL } from "../config/index";

let fileList = [
  {
    rid: 1,
    rname: "系统管理员",
  },
  {
    rid: 2,
    rname: "普通管理员",
  },
  {
    rid: 3,
    rname: "用户",
  },
];
export default [
  {
    url: baseURL + "Role",
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
    url: baseURL + "Role/add",
    type: "post",
    response: (params) => {
      let newdata = JSON.parse(params.body);
      fileList.push({
        rid: fileList.length + 1,
        rname: newdata.rname,
      });
      return {
        code: 200,
      };
    },
  },
  {
    url: baseURL + "Role/delete",
    type: "post",
    response: (params) => {
      let id = JSON.parse(params.body);
      fileList = fileList.filter((item) => item.rid != id);
      return {
        code: 200,
      };
    },
  },
  {
    url: baseURL + "Role/select",
    type: "post",
    response: (params) => {
      let id = JSON.parse(params.body);
      let name;
      fileList.map((item) => {
        if (item.rid == id) {
          name = item.rname;
        }
      });
      return {
        code: 20,
        roleId: id,
        roleName: name,
      };
    },
  },
  {
    url: baseURL + "Role/update",
    type: "post",
    response: (params) => {
      let data = JSON.parse(params.body);
      fileList.map((item) => {
        if (item.rid == data.rid) {
          item.rname = data.rname;
        }
      });
      return {
        code: 200,
      };
    },
  },
];
