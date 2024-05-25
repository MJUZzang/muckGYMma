import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/../lib/store";
import { dummyPlanInfo, PlanInfo } from "@/_types/Plan";

type PlanInfoState = {
    selectedWorkout: number;
} & PlanInfo;

// Define the initial state using that type
const initialState: PlanInfoState =
    process.env.NODE_ENV === "development"
        ? {
              ...dummyPlanInfo,
              selectedWorkout: 1,
          }
        : {
              ...dummyPlanInfo,
              selectedWorkout: 1,
          };
// : {
//       ...emptyPlanInfo,
//       selectedWorkout: 0,
//   };

export const planInfoSlice = createSlice({
    name: "planInfo",

    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setSelectedWorkout: (state, action: PayloadAction<number>) => {
            state.selectedWorkout = action.payload;
        },
        markWorkoutAsCompleted: (state, action: PayloadAction<number>) => {
            state.workouts![action.payload].isCompleted = true;
        },
        setCompletionTime: (
            state,
            action: PayloadAction<{
                workoutIndex: number;
                completionTime: number;
            }>
        ) => {
            state.workouts = state.workouts!.map((workout, index) =>
                index === action.payload.workoutIndex
                    ? {
                          ...workout,
                          completionTime: action.payload.completionTime,
                      }
                    : workout
            );
        },
    },
});

export const { setSelectedWorkout, markWorkoutAsCompleted, setCompletionTime } =
    planInfoSlice.actions;

export const selectPlanInfo = (state: RootState) => state.planInfo;
export const selectSelectedWorkout = (state: RootState) =>
    state.planInfo.selectedWorkout;

export default planInfoSlice.reducer;
