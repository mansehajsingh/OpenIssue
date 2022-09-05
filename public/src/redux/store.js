import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import projectsReducer from "./slices/projectsSlice";
import projectReducer from "./slices/projectSlice";
import issueReducer from "./slices/issueSlice";
import replyReducer from "./slices/replySlice";

const reducer = {
    user: userReducer,
    projects: projectsReducer,
    project: projectReducer,
    issue: issueReducer,
    reply: replyReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;