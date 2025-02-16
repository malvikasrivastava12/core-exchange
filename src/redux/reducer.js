import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  wallet: {},
  userExist: false,
  userInfo: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setUserExist: (state, action) => {
      state.userExist = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setWallet, setUserExist, setUserInfo } = loginSlice.actions;
export default loginSlice.reducer;
