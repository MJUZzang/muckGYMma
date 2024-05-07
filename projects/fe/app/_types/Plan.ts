export interface Exercise {
    name: string;
    set: number;
    rep: number;
    kcal: number;
    completedAt: string;
    isCompleted: boolean;
    order: number;
}

export interface PlanInfo {
    plans: Exercise[];
    name: string;
    isCompleted: boolean;
    completedAt: string;
    kcal: number;
}

export const emptyPlanInfo: PlanInfo = {
    plans: [],
    name: "",
    isCompleted: false,
    completedAt: "",
    kcal: 0,

};

export const dummyPlanInfo: PlanInfo = {
    plans: [
        {
            name: "벤치프레스",
            set: 5,
            rep: 12,
            kcal: 113,
            completedAt: "2021-06-01",
            order: 1,
            isCompleted: false,
        },
        {
            name: "데드리프트",
            set: 5,
            rep: 12,
            kcal: 113,
            completedAt: "2021-06-01",
            order: 2,
            isCompleted: false,
        },
        {
            name: "레터럴레이즈",
            set: 5,
            rep: 12,
            kcal: 113,
            completedAt: "2021-06-01",
            order: 3,
            isCompleted: false,
        },
        {
            name: "풀업",
            set: 5,
            rep: 12,
            kcal: 113,
            completedAt: "2021-06-01",
            order: 4,
            isCompleted: false,
        },
        {
            name: "숄더프레스",
            set: 5,
            rep: 12,
            kcal: 113,
            completedAt: "2021-06-01",
            order: 5,
            isCompleted: false,
        },
    ],
    isCompleted: false,
    name: "헬스",
    kcal: 565,
    completedAt: "2021-06-01",
};
