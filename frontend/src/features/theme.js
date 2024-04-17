import { createSlice } from "@reduxjs/toolkit";


export const themeslice = createSlice({
    name: "themer",
    initialState: { value: true },
    reducers: {
        themeselector: (state, action) => {
            state.value = action.payload;
        },
        cleartheme: (state, action) => {

            //console.log(action.payload);
            if (action.payload == true) {
                state.value = true;
            }
        },
    }
});

export const { themeselector } = themeslice.actions;
export const { cleartheme } = themeslice.actions;


export default themeslice.reducer;