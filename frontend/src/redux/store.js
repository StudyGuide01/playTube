import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';
import channelReducer from './channelSlice.js';

const store = configureStore({
    reducer:{
        auth:userReducer,
        channel:channelReducer
    }
});

export default store;