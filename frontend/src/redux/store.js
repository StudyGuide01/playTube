import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js';
import channelReducer from './channelSlice.js';
import contentReducer from './contentSlice.js';

const store = configureStore({
    reducer:{
        auth:userReducer,
        channel:channelReducer,
        content:contentReducer
    }
});

export default store;