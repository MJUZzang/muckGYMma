import { configureStore } from "@reduxjs/toolkit";
import predictReducer from "@/../lib/slices/predictSlice";
import initialInfoReducer from "@/../lib/slices/initialInfoSlice";
import planInfoReducer from "@/../lib/slices/planInfoSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            predict: predictReducer,
            initialInfo: initialInfoReducer,
            planInfo: planInfoReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
