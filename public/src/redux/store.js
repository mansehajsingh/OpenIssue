import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import projectsReducer from "./slices/projectsSlice";
import projectReducer from "./slices/projectSlice";
import issueReducer from "./slices/issueSlice";

const reducer = {
    user: userReducer,
    projects: projectsReducer,
    project: projectReducer,
    issue: issueReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;