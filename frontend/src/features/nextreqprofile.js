import { createSlice } from "@reduxjs/toolkit";


export const nextprofimgslice = createSlice({
    name: "nextprofimgreq",
    initialState: { value: null },
    reducers: {
        nextprofimgrequested: (state, action) => {
            state.value = action.payload;
        },
        clearnextreqprof: (state, action) => {
            if (action.payload == true) {
                state.value = null;
            }
        },
    }
});

export const { nextprofimgrequested } = nextprofimgslice.actions;
export const { clearnextreqprof } = nextprofimgslice.actions;

export default nextprofimgslice.reducer;