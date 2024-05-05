import { configureStore } from "@reduxjs/toolkit";
import predictReducer from "./slices/predictSlice";
import loadingReducer from "./slices/loadingSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            predict: predictReducer,
            loading: loadingReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
