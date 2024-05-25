export interface Workout {
    name: string;
    repeatation: number;
    expect: number;
    set: number;
    weight?: number | null;
    time?: number | null;
    completionTime?: number;
    isCompleted?: boolean;
}

export interface PlanInfo {
    workouts?: Workout[];
    name?: string;
    type?: string;
    time?: number;
    cleared?: boolean;
    createdAt?: Date;
    total?: number;
}

export const emptyPlanInfo: PlanInfo = {
    workouts: [],
    name: "",
    type: "",
    cleared: false,
    createdAt: new Date(),
    time: 0,
    total: 0,
};

export const dummyPlanInfo: PlanInfo = {
    workouts: [
        {
            name: "벤치프레스",
            set: 7,
            repeatation: 12,
            expect: 113,
            weight: 60,
            completionTime: 180,
            isCompleted: true,
        },
        {
            name: "데드리프트",
            set: 7,
            repeatation: 12,
            expect: 113,
            weight: 60,
            isCompleted: false,
        },
        {
            name: "레터럴레이즈",
            set: 5,
            repeatation: 12,
            expect: 113,
            weight: 60,
            isCompleted: false,
        },
        {
            name: "풀업",
            set: 2,
            repeatation: 12,
            expect: 113,
            isCompleted: false,
        },
        {
            name: "숄더프레스",
            set: 5,
            repeatation: 12,
            expect: 113,
            weight: 60,
            isCompleted: false,
        },
    ],
    name: "헬스",
    type: "헬스",
    total: 565,
    time: 0,
    cleared: false,
    createdAt: new Date("2024-04-13T19:56:39.214108"),
};
