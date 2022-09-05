import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ReplyService from "../../services/ReplyService";

const initialState = {
    replyDeletionSuccess: null,
};

export const deleteReply = createAsyncThunk(
    "DELETE Reply",
    async({ project_id, issue_id, reply_id }) => {
        try {
            const response = await ReplyService.deleteReply(project_id, issue_id, reply_id);
            return response.data;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const replySlice = createSlice({
    name: "reply",
    initialState,
    extraReducers: {
        [deleteReply.pending]: (state, action) => {
            state.replyDeletionSuccess = null;
        },
        [deleteReply.rejected]: (state, action) => {
            state.replyDeletionSuccess = false;
        },
        [deleteReply.fulfilled]: (state, action) => {
            state.replyDeletionSuccess = true;
        }
    }
});

const { reducer } = replySlice;
export default reducer;