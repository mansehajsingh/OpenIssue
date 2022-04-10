import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";

const reducer = {
    user: userReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
});

export default store;