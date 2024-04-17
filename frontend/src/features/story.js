import { createSlice } from "@reduxjs/toolkit";


export const storyslice = createSlice({
    name: "storyarr",
    initialState: { value: { pfp: "", idx: null, content: [], bodar: [], loger: "", func: null } },
    reducers: {
        storysets: (state, action) => {
            state.value = action.payload;
        },
        clearstory: (state, action) => {


            if (action.payload == true) {
                state.value = { pfp: "", idx: null, content: [], bodar: [], loger: "", func: null }
            }
        },
    }
});

export const { storysets } = storyslice.actions;
export const { clearstory } = storyslice.actions;


export default storyslice.reducer;