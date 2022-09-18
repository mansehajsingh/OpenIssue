import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProjectService from "../../services/ProjectService";

const initialState = {
    identity: null,
    members: [],
    issues: [],
    issueCreationSuccess: null,
    issueCreationMessage: null,
    addMemberSuccess: null,
    deleteMemberSuccess: null,
    editProjectSuccess: null,
    deleteProjectSuccess: null,
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

export const addMember = createAsyncThunk(
    "ADD Member",
    async({ projectID, userID }, thunkAPI) => {
        try {
            const response = await ProjectService.addMember(projectID, userID);
            return response.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const deleteMember = createAsyncThunk(
    "DELETE Member",
    async({ project_id, user_id }, thunkAPI) => {
        try {
            const response = await ProjectService.deleteMember(project_id, user_id);
            return response.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const editProject = createAsyncThunk(
    "EDIT Project",
    async ({ project_id, name, description }, thunkAPI) => {
        try {
            const response = await ProjectService.editProject(project_id, name, description);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const deleteProject = createAsyncThunk(
    "DELETE Project",
    async ({ project_id }, thunkAPI) => {
        try {
            const response = await ProjectService.deleteProject(project_id);
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
        },
        [addMember.pending]: (state, action) => {
            state.addMemberSuccess = null;
        },
        [addMember.fulfilled]: (state, action) => {
            state.addMemberSuccess = true;
        },
        [deleteMember.pending]: (state, action) => {
            state.deleteMemberSuccess = null;
        },
        [deleteMember.rejected]: (state, action) => {
            state.deleteMemberSuccess = false;
        },
        [deleteMember.fulfilled]: (state, action) => {
            state.deleteMemberSuccess = true;
        },
        [editProject.pending]: (state, action) => {
            state.editProjectSuccess = null;
        },
        [editProject.fulfilled]: (state, action) => {
            state.editProjectSuccess = true;
        },
        [deleteProject.pending]: (state, action) => {
            state.deleteProjectSuccess = null;
        },
        [deleteProject.fulfilled]: (state, action) => {
            state.deleteProjectSuccess = true;
        }
    }
});

const { reducer } = projectSlice;
export default reducer;