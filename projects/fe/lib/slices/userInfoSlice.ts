import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/../lib/store";

// Define a type for the slice state
export interface userInfoState {
    nickname: string;

    physicalSetting: {
        birth?: string; // year.month.day 형식
        gender?: string; // 남성, 여성, 그 외
        weight?: number; // kg
        height?: number; // cm
    };

    sports: string[];

    exercises: string[];

    exerciseSetting: {
        level?: string; // 입문자, 초보자, 중급자, 전문가
        goal?: string; // 근비대, 유지, 체중 감량
        experience?: string; // 처음, 3개월 미만, 6개월 미만, 1년 미만, 1년 이상
        frequency?: string; // 주 1회, 주 2회, 주 3회, 주 4회, 주 5회, 매일
    };
}

// Define the initial state using that type
const initialState: userInfoState = {
    nickname: "",
    physicalSetting: {},
    sports: [],
    exercises: [],
    exerciseSetting: {},
};

export const userInfoSlice = createSlice({
    name: "userInfo",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setLevel: (state, action: PayloadAction<string>) => {
            state.exerciseSetting.level = action.payload;
        },

        setFrequency: (state, action: PayloadAction<string>) => {
            state.exerciseSetting.frequency = action.payload;
        },

        setGoal: (state, action: PayloadAction<string>) => {
            state.exerciseSetting.goal = action.payload;
        },

        setGender: (state, action: PayloadAction<string>) => {
            state.physicalSetting.gender = action.payload;
        },

        setBirthDate: (state, action: PayloadAction<string>) => {
            state.physicalSetting.birth = action.payload;
        },

        setWeight: (state, action: PayloadAction<number>) => {
            state.physicalSetting.weight = action.payload;
        },

        setHeight: (state, action: PayloadAction<number>) => {
            state.physicalSetting.height = action.payload;
        },

        setExperience: (state, action: PayloadAction<string>) => {
            state.exerciseSetting.experience = action.payload;
        },

        setSports: (state, action: PayloadAction<string[]>) => {
            state.sports = action.payload;
        },

        setExercises: (state, action: PayloadAction<string[]>) => {
            state.exercises = action.payload;
        },

        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        },
    },
});

export const {
    setBirthDate,
    setExercises,
    setExperience,
    setFrequency,
    setGender,
    setGoal,
    setHeight,
    setLevel,
    setSports,
    setWeight,
    setNickname
} = userInfoSlice.actions;

export const selectUserInfo = (state: RootState) => state.userInfo;

export default userInfoSlice.reducer;
