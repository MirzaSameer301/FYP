import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import patientsReducer from "./patientsSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer, 
  },
});

export default store;
