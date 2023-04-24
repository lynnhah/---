import axios from "../utils/request";
import "../mock/index";
import "../mock/role";

//角色列表
export const $rolelist = async () => {
  //获取mock数据 data.data
  let data = await axios.get("/Role");
  return data;
};

//添加角色
export const $addrole = async (params) => {
  let { data } = await axios.post("/Role/add", params);
  return data;
};

//删除角色
export const $del = async (params) => {
  let { data } = await axios.post("/Role/delete", params);
  return data;
};

//根据id获取角色
export const $selectById = async (params) => {
  let { data } = await axios.post("/Role/select", params);
  return data;
};

//修改角色名称
export const $update = async (params) => {
  let { data } = await axios.post("/Role/update", params);
  return data;
};
