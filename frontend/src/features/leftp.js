import { createSlice } from "@reduxjs/toolkit";


export const leftslice = createSlice({
    name: "leftpsetter",
    initialState: { value: null },
    reducers: {
        leftpsets: (state, action) => {
            state.value = action.payload;
        },
        clearleftp: (state, action) => {


            if (action.payload == true) {
                state.value = null;
            }
        },
    }
});

export const { leftpsets } = leftslice.actions;
export const { clearleftp } = leftslice.actions;


export default leftslice.reducer;