export interface Workout {
    name: string;
    set: number;
    repeatation: number;
    kcal: number;
    weight?: number;
    time?: number;
    completionTime?: number;
    isCompleted?: boolean;
}

export interface PlanInfo {
    workouts: Workout[];
    type: string;
    isCompleted?: boolean;
    completedAt?: string;
    kcal: number;
}

export const emptyPlanInfo: PlanInfo = {
    workouts: [],
    type: "",
    isCompleted: false,
    completedAt: "",
    kcal: 0,
};

export const dummyPlanInfo: PlanInfo = {
    workouts: [
        {
            name: "벤치프레스",
            set: 7,
            repeatation: 12,
            kcal: 113,
            weight: 60,
            completionTime: 180,
            isCompleted: true,
        },
        {
            name: "데드리프트",
            set: 7,
            repeatation: 12,
            kcal: 113,
            weight: 60,
            isCompleted: false,
        },
        {
            name: "레터럴레이즈",
            set: 5,
            repeatation: 12,
            kcal: 113,
            weight: 60,
            isCompleted: false,
        },
        {
            name: "풀업",
            set: 2,
            repeatation: 12,
            kcal: 113,
            isCompleted: false,
        },
        {
            name: "숄더프레스",
            set: 5,
            repeatation: 12,
            kcal: 113,
            weight: 60,
            isCompleted: false,
        },
    ],
    type: "헬스",
    kcal: 565,
    isCompleted: false,
    completedAt: "2021-06-01",
};
