import Mock from "mockjs";

import file from "./user";
import role from "./role";
import order from "./order";
import regist from "./regist";
import hotel from "./hotelInfo";

const mocks = [...file, ...role, ...order, ...regist, ...hotel];

//mock请求方法放在这里统一处理,1是简便写法,2是如果请求路径需要加统一前缀或域名,可以在这里处理
for (const i of mocks) {
  Mock.mock(i.url, i.type, i.response);
}
