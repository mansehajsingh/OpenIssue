import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import projectsReducer from "./slices/projectsSlice";

const reducer = {
    user: userReducer,
    projects: projectsReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;