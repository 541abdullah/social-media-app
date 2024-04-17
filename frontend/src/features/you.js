import { createSlice } from "@reduxjs/toolkit";


export const yourslice = createSlice({
    name: "yourarr",
    initialState: { value: { pfp: "", usrn: "", email: "", fullname: "", userid: "", following: [], blocked: [], story: "", acctype: "" } },
    reducers: {
        yoursets: (state, action) => {
            state.value = action.payload;
        },
        clearyourdets: (state, action) => {

            console.log(action.payload);
            if (action.payload == true) {
                state.value = { pfp: "", usrn: "", email: "", fullname: "", userid: "", following: [], blocked: [], story: "", acctype: "" }
            }
        },
    }
});

export const { yoursets } = yourslice.actions;
export const { clearyourdets } = yourslice.actions;


export default yourslice.reducer;