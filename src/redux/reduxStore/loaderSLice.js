import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false
}

const loaderSlice = createSlice({
    name: "loaderSlice",
    initialState,
    reducers: {
        startLoader: (state) => {
            state.isLoading = true;
        },
        successLoader: (state) => {
            state.isLoading = false;
        },
        failureLoader: (state) => {
            state.isLoading = false;
        }
    }

})

export const {startLoader , successLoader , failureLoader} = loaderSlice.actions;
export default loaderSlice.reducer;