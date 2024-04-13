import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface FoodList {
    id: number;
    foodname: string;
    manufacturer: string;
    predict_key: string;
}

export interface PredictList {
    foodlist: FoodList[];
    keyname: string;
    possibility: number;
}

// Define a type for the slice state
export interface PredictState {
    fileUrl: string;
    predictlist?: PredictList[];
}

// Define the initial state using that type
const initialState: PredictState = {
    fileUrl: "",
    predictlist: [],
};

export const predictSlice = createSlice({
    name: "predict",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setPredict: (state, action: PayloadAction<PredictState>) => {
            state.fileUrl = action.payload.fileUrl;
            state.predictlist = action.payload.predictlist;
        },
    },
});

export const { setPredict } = predictSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPredict = (state: RootState) => state.predict;

export default predictSlice.reducer;
