import { createSlice } from "@reduxjs/toolkit";


export const storydataslice = createSlice({
    name: "storydat",
    initialState: { value: {} },
    reducers: {
        totstories: (state, action) => {
            state.value = action.payload;
        },
        clearstorydat: (state, action) => {

            if (action.payload == true) {
                state.value = {}
            }
        },
    }
});

export const { totstories } = storydataslice.actions;
export const { clearstorydat } = storydataslice.actions;


export default storydataslice.reducer;