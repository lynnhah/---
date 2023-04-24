import { createSlice, configureStore } from "@reduxjs/toolkit";

//创建子模块
export const userSlice = createSlice({
  name: "userSlice",
  //初始状态
  initialState: {
    user: {
      uid: "",
      uname: "",
      email: "",
      tel: "",
      role: "",
      password: "",
      img: "",
    },
  },
  //整合器
  reducers: {
    setUser(state, action) {
      state.user = { ...action.payload };
    },
  },
});

//创建store，合并所有子模块
const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
  },
});

export default store;
