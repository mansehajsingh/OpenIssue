import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IssueService from "../../services/IssueService";

const initialState = {
    identity: null,
    replies: null,
    replyCreationSuccess: null,
    issueStatusChangeFlag: false,
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

export const createReply = createAsyncThunk(
    "CREATE Reply",
    async({ issue_id, project_id, content }, thunkAPI) => {
        try {
            const response = await IssueService.createReply(issue_id, project_id, content);
            return response.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const getReplies = createAsyncThunk(
    "GET Replies",
    async({ issue_id, project_id }, thunkAPI) => {
        try {
            const response = await IssueService.getReplies(issue_id, project_id);
            return response.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const changeIssueStatus = createAsyncThunk(
    "UPDATE Status",
    async({ issue_id, project_id, newStatus }, thunkAPI) => {
        try {
            const response = await IssueService.changeIssueStatus(issue_id, project_id, newStatus);
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
        },
        [getReplies.pending]: (state, action) => {
            state.replies = null;
        },
        [getReplies.fulfilled]: (state, action) => {
            state.replies = action.payload.replies;
        },
        [createReply.pending]: (state, action) => {
            state.replyCreationSuccess = null;
        },
        [createReply.fulfilled]: (state, action) => {
            state.replyCreationSuccess = true;
        },
        [changeIssueStatus.fulfilled]: (state, action) => {
            state.issueStatusChangeFlag = !state.issueStatusChangeFlag;
        }
    }
});

const { reducer } = issueSlice;
export default reducer;