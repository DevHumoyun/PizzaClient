import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reduxStore/authSlice"


export const store = configureStore({
    reducer: {
        authSlice,
    }
})