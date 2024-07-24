import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    menuId: null
}

const storageSlice = createSlice({
    name: "storageSlice",
    initialState,
    reducers: {
        setMenuStorage: (state , {payload} ) => {
            state.menuId = payload;
            
        }
    }

})

export const {setMenuStorage} = storageSlice.actions;
export default storageSlice.reducer;