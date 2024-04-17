import { createSlice } from "@reduxjs/toolkit";


export const settingsslice = createSlice({
    name: "settingsdef",
    initialState: { value: {} },
    reducers: {
        settingsdef: (state, action) => {
            state.value = action.payload;
        },
        clearsettings: (state, action) => {


            if (action.payload == true) {
                state.value = {};
            }
        },
    }
});

export const { settingsdef } = settingsslice.actions;
export const { clearsettings } = settingsslice.actions;

export default settingsslice.reducer;