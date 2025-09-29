import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';
const store = configureStore({
    reducer:{
        auth:userReducer,
    }
});

export default store;