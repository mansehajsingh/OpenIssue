import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IssueService from "../../services/IssueService";

const initialState = {
    identity: null,
};

export const getIssue = createAsyncThunk(
    "GET Issue",
    async({ project_id, issue_id }, thunkAPI) => {
        try {
            const response = await IssueService.getIssue(project_id, issue_id);
            return response.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const issueSlice = createSlice({
    name: "issue",
    initialState,
    extraReducers: {
        [getIssue.pending]: (state, action) => {
            state.identity = null;
        },
        [getIssue.fulfilled]: (state,action) => {
            state.identity = action.payload;
        }
    }
});

const { reducer } = issueSlice;
export default reducer;