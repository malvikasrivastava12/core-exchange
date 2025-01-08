import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  wallet: {},
  userExist: false,
  userInfo: {},
  securityPin: "",
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
    setSecurityPin: (state, action) => {
      state.securityPin = action.payload;
    },
  },
});

export const { setWallet, setUserExist, setUserInfo, setSecurityPin } =
  loginSlice.actions;
export default loginSlice.reducer;
