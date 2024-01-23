import { configureStore } from "@reduxjs/toolkit";
import markersReducer from "./markersSlice/markersSlice";

const store = configureStore({
    reducer: {
        markersReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export default store;