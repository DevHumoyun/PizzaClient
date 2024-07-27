import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    korzinka: []
}

const korzinkaSlice = createSlice({
    name: "korzinkaSlice",
    initialState,
    reducers: {
        pushKorzinka: (state, {payload}) => {
             state.korzinka.push(payload)
        }
    }

})

export const {pushKorzinka} = korzinkaSlice.actions;
export default korzinkaSlice.reducer;