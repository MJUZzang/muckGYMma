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
    workouts?: Workout[];
    name: string;
    time: number;
    cleared?: boolean;
    createdAt?: string;
    total: number;
}

export const emptyPlanInfo: PlanInfo = {
    workouts: [],
    name: "",
    cleared: false,
    createdAt: "",
    time: 0,
    total: 0,
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
    name: "헬스",
    total: 565,
    time: 0,
    cleared: false,
    createdAt: "2021-06-01",
};
