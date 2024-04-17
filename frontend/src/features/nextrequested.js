import { createSlice } from "@reduxjs/toolkit";


export const nextimgslice = createSlice({
    name: "nextimgreq",
    initialState: { value: null },
    reducers: {
        nextrequested: (state, action) => {
            state.value = action.payload;
        },
        clearnextreq: (state, action) => {


            if (action.payload == true) {
                state.value = null;
            }
        },
    }
});

export const { nextrequested } = nextimgslice.actions;
export const { clearnextreq } = nextimgslice.actions;


export default nextimgslice.reducer;