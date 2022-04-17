import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectService from "../../services/ProjectService";

const initialState = {
    identity: null,
    members: [],
    issueCreationSuccess: null,
    issueCreationMessage: null,
};

export const getProject = createAsyncThunk(
    "/projects/:project_id",
    async ({ project_id }, thunkAPI) => {
        try {
            const response = await ProjectService.getProject(project_id);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const getMembers = createAsyncThunk(
    "projects/:project_id/members",
    async ({ project_id }, thunkAPI) => {
        try {
            const response = await ProjectService.getMembers(project_id);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const createIssue = createAsyncThunk(
    "projects/:project_id/issues",
    async ({ project_id, title, content, flairs }, thunkAPI) => {
        try {
            const response = await ProjectService.createIssue(project_id, title, content, flairs);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response);
        }
    }
)

const projectSlice = createSlice({
    name: "project",
    initialState,
    extraReducers: {
        [getProject.fulfilled]: (state, action) => {
            state.identity = action.payload;
        },
        [getProject.pending]: (state, action) => {
            state.identity = null;
        },
        [getMembers.fulfilled]: (state, action) => {
            state.members = action.payload.members;
        },
        [getMembers.pending]: (state, action) => {
            state.members = [];
        },
        [createIssue.fulfilled]: (state, action) => {
            state.issueCreationMessage = action.payload.message;
            state.issueCreationSuccess = true;
        },
        [createIssue.pending]: (state, action) => {
            state.issueCreationMessage = null;
            state.issueCreationSuccess = null;
        },
        [createIssue.rejected]: (state, action) => {
            state.issueCreationMessage = action.payload.data.message;
            state.issueCreationSuccess = false;
        }
    }
});

const { reducer } = projectSlice;
export default reducer;