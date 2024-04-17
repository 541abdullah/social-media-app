import { createSlice } from "@reduxjs/toolkit";


export const loaderslice = createSlice({
    name: "loade",
    initialState: { value: false },
    reducers: {
        loadersets: (state, action) => {
            state.value = action.payload;
        },
        clearloader: (state, action) => {

            if (action.payload == true) {
                state.value = false;
            }
        },
    }
});

export const { loadersets } = loaderslice.actions;
export const { clearloader } = loaderslice.actions;

export default loaderslice.reducer;