import { createSlice } from "@reduxjs/toolkit";

const logSlice=createSlice({
    name:"log",
    initialState:{
        logData:[],
    },
    reducers:{
        addToLog:(state,action)=>{
            state.logData.push(action.payload);
        },
    },
});

export const {addToLog}=logSlice.actions;
export default logSlice.reducer;