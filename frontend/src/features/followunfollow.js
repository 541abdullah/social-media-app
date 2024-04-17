import { createSlice } from "@reduxjs/toolkit";

export const followunfollowslice = createSlice({
    name: "iconcolorresetter",
    initialState: { value: { isrequested: {}, cancelreq: {} } },
    reducers: {
        followunfollowobj: (state, action) => {
            console.log(action.payload);
            state.value = action.payload;
        },
        clearfollowunfollow: (state, action) => {

            if (action.payload == true) {
                state.value = { isrequested: {}, cancelreq: {} };
            }
        },
    }
});

export const { followunfollowobj } = followunfollowslice.actions;
export const { clearfollowunfollow } = followunfollowslice.actions;

export default followunfollowslice.reducer;