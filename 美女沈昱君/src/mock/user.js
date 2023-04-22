import Mock from "mockjs"; //导入mockjs
import { baseURL } from "../config/index";
const Random = Mock.Random;


export default [
  {
    url: baseURL + "Login",
    type: "get",
    response: () => {
      let fileList = [];
      fileList.push(
        {
          uid: 1,
          name: "admin",
          password: "123321",
          token: "admin",
        },
        {
          uid: 2,
          name: "root",
          password: "root",
          token: "root",
        }
      );
      for (let i = 2; i < 6; i++) {
        let file = {};
        file.uid = Random.id();
        file.name = Random.title(3, 5);
        file.password = "123";
        file.token = "others";
        fileList.push(file);
      }
      return {
        code: 200,
        data: {
          fileList,
        },
      };
    },
  },
];
