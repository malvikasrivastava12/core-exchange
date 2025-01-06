import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducer";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
