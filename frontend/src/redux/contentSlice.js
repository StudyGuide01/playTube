import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
    name:"content",
    initialState:{
        allVideos:null,
        allShorts:null
    },
    reducers:{
        setAllVideos:(state,action)=>{
            state.allVideos = action.payload
        },
        setAllShorts:(state,action)=>{
            state.allShorts = action.payload
        },
    }

});

export const {setAllVideos, setAllShorts} = contentSlice.actions;
export default contentSlice.reducer;