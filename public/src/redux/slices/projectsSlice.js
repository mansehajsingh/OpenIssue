import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRoutesFromChildren } from "react-router-dom";
import ProjectService from "../../services/ProjectService";

const initialState = {
    all: null,
    fetchAllMessage: null,
    projectCreationMessage: null,
    projectCreationSuccess: null,
};

export const getProjectsByUser = createAsyncThunk(
    "GET Projects by User",
    async ({ user_id }, thunkAPI) => {
        try {
            const response = await ProjectService.getAllByUser(user_id);
            return response.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const createProject = createAsyncThunk(
    "CREATE Project",
    async({ name, description }, thunkAPI) => {
        try {
            const response = await ProjectService.createProject(name, description);
            return response.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    extraReducers: {
        [getProjectsByUser.fulfilled]: (state, action) => {
            state.all = action.payload.projects;
        },
        [getProjectsByUser.rejected]: (state, action) => {
            state.getAllMessage = action.payload.data.message;
        },
        [createProject.fulfilled]: (state, action) => {
            state.projectCreationMessage = action.payload.message;
            state.projectCreationSuccess = true;
        },
        [createProject.pending]: (state, action) => {
            state.projectCreationMessage = null;
            state.projectCreationSuccess = null;
        },
        [createProject.rejected]: (state, action) => {
            state.projectCreationMessage = action.payload.data.message;
            state.projectCreationSuccess = false;
        },
    }
});

const { reducer } = projectsSlice;
export default reducer;