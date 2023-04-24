import axios from "../utils/request";
import "../mock/index";
import "../mock/regist";

//密码加密：md5(md5(md5("user2").split("").reverse().join("")))

export const $registlist = async (params) => {
  let data = await axios.post("/regist", params);
  return data;
};
export const $add = async (params) => {
  let data = await axios.post("/regist/add", params);
  return data;
};
export const $del = async (params) => {
  let data = await axios.post("/regist/del", params);
  return data;
};
