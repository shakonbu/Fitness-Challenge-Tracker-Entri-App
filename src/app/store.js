import { configureStore } from "@reduxjs/toolkit"
import feedreducer from "../feature/feedsSlice"
import authreducer from "../feature/authSlice"
import logreducer from "../feature/logSlice"
import userreducer from "../feature/userSlice"

export const store=configureStore({
    reducer:{
        feed: feedreducer,
        auth: authreducer,
        log: logreducer,
        user:userreducer,
    }
});