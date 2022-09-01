import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectService from "../../services/ProjectService";

const initialState = {
    identity: null,
    members: [],
    issues: [],
    issueCreationSuccess: null,
    issueCreationMessage: null,
};

export const getProject = createAsyncThunk(
    "GET Project",
    async ({ project_id }, thunkAPI) => {
        try {
            const response = await ProjectService.getProject(project_id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const getMembers = createAsyncThunk(
    "GET Project Members",
    async ({ project_id }, thunkAPI) => {
        try {
            const response = await ProjectService.getMembers(project_id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const getIssues = createAsyncThunk(
    "GET Project Issues",
    async ({ project_id }, thunkAPI) => {
        try {
            const response = ProjectService.getIssues(project_id);
            return (await response).data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)

export const createIssue = createAsyncThunk(
    "CREATE Project Issue",
    async ({ project_id, title, content, flairs, priority }, thunkAPI) => {
        try {
            const response = await ProjectService.createIssue(project_id, title, content, flairs, priority);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

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
        },
        [getIssues.pending]: (state, action) => {
            state.issues = [];
        },
        [getIssues.fulfilled]: (state, action) => {
            state.issues = action.payload.issues;
        }
    }
});

const { reducer } = projectSlice;
export default reducer;