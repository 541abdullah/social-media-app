import { createSlice } from "@reduxjs/toolkit";


export const profileslice = createSlice({
    name: "profdat",
    initialState: { value: null },
    reducers: {
        currview: (state, action) => {
            state.value = action.payload;
        },
        clearprof: (state, action) => {


            if (action.payload == true) {
                state.value = null;
            }
        },
    }
});

export const { currview } = profileslice.actions;
export const { clearprof } = profileslice.actions;


export default profileslice.reducer;