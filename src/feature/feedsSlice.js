import { createSlice } from "@reduxjs/toolkit";
import { react } from "react";

const feedsSlice=createSlice({
    name:"feed",
    initialState:{
        feedchallenges:[],
    },
    reducers:{
        addToFeed:(state,action)=>{
            state.feedchallenges.push(action.payload);
        },
        clearFeed:(state)=>{
            state.feedchallenges=[];
        },
    },
});

export const{addToFeed,clearFeed} = feedsSlice.actions;
export default feedsSlice.reducer;