import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Actions/authActions/signupAction"
import loginReducer from "./Actions/authActions/loginAction"
const store = configureStore({
  reducer: {
    auth: authReducer,
    login : loginReducer
  },
});

export default store;
