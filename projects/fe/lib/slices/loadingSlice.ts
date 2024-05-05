// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "@/../lib/store";

// // Define a type for the slice state
// export interface loadingState {
//     isLoading: boolean;
// }

// // Define the initial state using that type
// const initialState: loadingState = {
//     isLoading: true,
// };

// export const loadingSlice = createSlice({
//     name: "loading",
//     // `createSlice` will infer the state type from the `initialState` argument
//     initialState,
//     reducers: {
//         setIsLoading: (state, action: PayloadAction<boolean>) => {
//             state.isLoading = action.payload;
//         },
//     },
// });

// export const { setIsLoading } =
//     loadingSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectIsLoading = (state: RootState) => state.loading.isLoading;

// export default loadingSlice.reducer;
