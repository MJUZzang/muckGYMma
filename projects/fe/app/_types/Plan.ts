export interface Workout {
    id?: number;
    
    name: string;
    repeatation?: number;

    expect?: number; // same as kcal
    kcal?: number;

    set?: number; // same as sets
    sets?: number;

    weight?: number | null;
    time?: number | null;
    doneSecond?: number;
    cleared?: boolean;
    clearedAt?: Date | null;
}

export interface PlanInfo {
    id?: number;

    workouts?: Workout[]; // same as tasks
    tasks?: Workout[];

    name?: string;
    type?: string;
    time?: number;
    cleared?: boolean;
    createdAt?: Date | null;
    clearedAt?: Date | null;
    total?: number;
}

export type PlanInfoState = {
    selectedWorkout: number;
} & PlanInfo;

export const emptyPlanInfo: PlanInfo = {
    workouts: [{ name: "" }],
    tasks: [{ name: "" }],
};

export const dummyData: PlanInfo = {
    name: "헬스",
    time: 1804,
    cleared: false,
    createdAt: new Date("2024-04-13T19:56:39.214108"),
    total: 290,
    type: "헬스",
    tasks: [
        {
            name: "벤치프레스",
            set: 7,
            sets: 1,
            repeatation: 12,
            expect: 113,
            weight: 60,
            kcal: 113,
            doneSecond: 180,
            cleared: true,
        },
        {
            name: "데드리프트",
            set: 7,
            sets: 1,
            repeatation: 12,
            expect: 113,
            kcal: 113,
            weight: 60,
            cleared: false,
        },
        {
            name: "레터럴레이즈",
            set: 5,
            sets: 1,
            repeatation: 12,
            expect: 113,
            kcal: 113,
            weight: 60,
            cleared: false,
        },
        {
            name: "풀업",
            set: 2,
            sets: 1,
            repeatation: 12,
            kcal: 113,
            expect: 113,
            cleared: false,
        },
        {
            name: "숄더프레스",
            set: 5,
            sets: 1,
            repeatation: 12,
            expect: 113,
            kcal: 113,
            weight: 60,
            cleared: false,
        },
    ],
};
