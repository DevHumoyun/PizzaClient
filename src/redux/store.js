import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reduxStore/authSlice"
import loaderSlice from "./reduxStore/loaderSLice";


export const store = configureStore({
    reducer: {
        authSlice,
        loaderSlice
    }
})