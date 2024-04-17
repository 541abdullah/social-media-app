import { createSlice } from "@reduxjs/toolkit";


export const newpostslice = createSlice({
    name: "newpost",
    initialState: { value: false },
    reducers: {
        newpostadded: (state, action) => {
            state.value = action.payload;
        },
        clearnewpost: (state, action) => {

            console.log(action.payload);
            if (action.payload == true) {
                state.value = false
            }
        },
    }
});

export const { newpostadded } = newpostslice.actions;
export const { clearnewpost } = newpostslice.actions;


export default newpostslice.reducer;