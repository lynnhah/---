import axios from "../utils/request";
import "../mock/index";
import "../mock/order";

export const $orderlist = async (params) => {
  let { data } = await axios.post("/Order", params);
  return data;
};
export const $orderlist1 = async (params) => {
  let { data } = await axios.post("/Order/user", params);
  return data;
};

export const $del = async (params) => {
  let { data } = await axios.post("/Order/del", params);
  return data;
};
//通过用户查询id
export const $selectByUid = async (params) => {
  let { data } = await axios.post("/Order/selectByUid", params);
  return data;
};

export const $selectByOid = async (params) => {
  let { data } = await axios.post("/Order/selectByOid", params);
  return data;
};

export const $addorder = async (params) => {
  let data = await axios.post("/Order/add", params);
  return data;
};

export const $neworder=async(params)=>{
  let orderData=JSON.stringify(params)
  let data=await axios.post("Order/newHotelOrder",orderData)
  return data
}
