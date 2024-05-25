export interface Workout {
    name: string;
    repeatation: number;
    
    expect?: number; // same as kcal
    kcal?: number;

    set?: number; // same as sets
    sets?: number;

    weight?: number | null;
    time?: number | null;
    doneSecond?: number;
    cleared?: boolean;
}

export interface PlanInfo {
    id?: number;
    
    workouts?: Workout[]; // same as tasks
    tasks?: Workout[];
    
    name?: string;
    type?: string;
    time?: number;
    cleared?: boolean;
    createdAt?: Date;
    total?: number;
}

export type PlanInfoState = {
    selectedWorkout: number;
} & PlanInfo;

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
            doneSecond: 180,
            cleared: true,
        },
        {
            name: "데드리프트",
            set: 7,
            repeatation: 12,
            expect: 113,
            weight: 60,
            cleared: false,
        },
        {
            name: "레터럴레이즈",
            set: 5,
            repeatation: 12,
            expect: 113,
            weight: 60,
            cleared: false,
        },
        {
            name: "풀업",
            set: 2,
            repeatation: 12,
            expect: 113,
            cleared: false,
        },
        {
            name: "숄더프레스",
            set: 5,
            repeatation: 12,
            expect: 113,
            weight: 60,
            cleared: false,
        },
    ],
    name: "헬스",
    type: "헬스",
    total: 565,
    time: 0,
    cleared: false,
    createdAt: new Date("2024-04-13T19:56:39.214108"),
};
