import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
  },
});
