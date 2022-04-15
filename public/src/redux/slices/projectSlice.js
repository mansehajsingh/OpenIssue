import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectService from "../../services/ProjectService";

const initialState = {
    identity: null,
    members: [],
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
        }
    }
});

const { reducer } = projectSlice;
export default reducer;