import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

const initialState = {
    identity: null,
    userCreated: null,
    tokenCreated: false,
    userCreationResponse: "",
    userLoginResponse: "",
    queriedUsers: [],
    logoutSuccess: null,
};

export const getSelfFromToken = createAsyncThunk(
    "GET Self from Token",
    async () => {
        const response = await AuthService.getSelf();
        return response.data;
    }
);

export const createUser = createAsyncThunk(
    "CREATE User",
    async ({username, firstName, lastName, password}, thunkAPI) => {
        try {
            const response = await UserService.create(
                username, 
                firstName, 
                lastName,
                password,
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response)
        }
    }
);

export const loginUser = createAsyncThunk(
    "Login User",
    async({username, password}, thunkAPI) => {
        try {
            const response = await AuthService.createToken(
                username,
                password,
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const queryUsers = createAsyncThunk(
    "Query Users",
    async({username, limit}, thunkAPI) => {
        try {
            const response = await UserService.getUsers(username, limit);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "LOGOUT User",
    async({}, thunkAPI) => {
        try {
            const response = await AuthService.invalidateToken();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [getSelfFromToken.fulfilled]: (state, action) => {
            state.identity = action.payload;
        },
        [createUser.fulfilled]: (state, action) => {
            state.userCreated = true;
        },
        [createUser.pending]: (state, action) => {
            state.userCreationResponse = "";
        },
        [createUser.rejected]: (state, action) => {
            state.userCreated = false;
            state.userCreationResponse = action.payload.data.message;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.tokenCreated = true;
        },
        [loginUser.pending]: (state, action) => {
            state.userLoginResponse = "";
        },
        [loginUser.rejected]: (state, action) => {
            state.userLoginResponse = action.payload.data.message;
        },
        [queryUsers.pending]: (state, action) => {
            state.queriedUsers = [];
        },
        [queryUsers.fulfilled]: (state, action) => {
            state.queriedUsers = action.payload.users;
        },
        [logoutUser.fulfilled]: (state, action) => {
            state.logoutSuccess = true;
        }
    }
});

const { reducer } = userSlice;
export default reducer;