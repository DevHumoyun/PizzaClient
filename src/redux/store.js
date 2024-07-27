import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reduxStore/authSlice"
import loaderSlice from "./reduxStore/loaderSLice";
import storageSlice from "./reduxStore/storageSlice";
import korzinkaSlice from "./reduxStore/korzinkaSlice";


export const store = configureStore({
    reducer: {
        authSlice,
        loaderSlice,
        storageSlice,
        korzinkaSlice
    }
})