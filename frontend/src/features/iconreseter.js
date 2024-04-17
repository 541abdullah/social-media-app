import { createSlice } from "@reduxjs/toolkit";


export const iconslice = createSlice({
    name: "iconcolorresetter",
    initialState: { value: null },
    reducers: {
        iconresets: (state, action) => {
            state.value = action.payload;
        },
        cleariconreset: (state, action) => {


            if (action.payload == true) {
                state.value = null;
            }
        },
    }
});

export const { iconresets } = iconslice.actions;
export const { cleariconreset } = iconslice.actions;


export default iconslice.reducer;