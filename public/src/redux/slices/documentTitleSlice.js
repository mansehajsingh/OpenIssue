import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "Devwire"
}

export const documentTitleSlice = createSlice({
    name: "documentTitle",
    initialState,
    reducers: {
        setTitle: (state, action) => state.documentTitle = action.payload,
    }
});