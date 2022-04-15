import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import projectsReducer from "./slices/projectsSlice";
import projectReducer from "./slices/projectSlice";

const reducer = {
    user: userReducer,
    projects: projectsReducer,
    project: projectReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;