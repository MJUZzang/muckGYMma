import { configureStore } from "@reduxjs/toolkit";
import predictReducer from "@/../lib/slices/predictSlice";
import userInfoReducer from "@/../lib/slices/userInfoSlice";
import planInfoReducer from "@/../lib/slices/planInfoSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            predict: predictReducer,
            userInfo: userInfoReducer,
            planInfo: planInfoReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
