import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../reducers/taskReducers";
import { thunk } from "redux-thunk";
import useReducer from "../utils/appSlice";

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        user: useReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;