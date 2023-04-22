import Mock from "mockjs";

import file from "./user";
import file1 from "./hotelInfo"

const mocks = [...file,...file1];

//mock请求方法放在这里统一处理,1是简便写法,2是如果请求路径需要加统一前缀或域名,可以在这里处理
for (const i of mocks) {
  // console.log(i)
  Mock.mock(i.url, i.type, i.response);
}



