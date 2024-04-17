import { createSlice } from "@reduxjs/toolkit";


export const notifprofslice = createSlice({
    name: "notiprofile",
    initialState: { value: false },
    reducers: {
        notifvisit: (state, action) => {
            state.value = action.payload;
        },
        clearnotif: (state, action) => {

            if (action.payload == true) {
                state.value = false;
            }
        },
    }
});

export const { notifvisit } = notifprofslice.actions;
export const { clearnotif } = notifprofslice.actions;


export default notifprofslice.reducer;