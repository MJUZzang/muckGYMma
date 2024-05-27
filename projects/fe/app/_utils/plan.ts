import { PlanInfo } from "@/_types/Plan";
import { backendUrl } from "@/_utils/urls";
import { cookies } from "next/headers";

export const dummyList: PlanInfo[] = [
    {
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
    },
    {
        name: "수영",
        time: 1804,
        cleared: false,
        createdAt: new Date("2024-04-13T19:56:39.214108"),
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: new Date("2024-04-13T19:56:39.214108"),
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: new Date("2024-04-13T19:56:39.214108"),
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: new Date("2024-04-13T19:56:39.214108"),
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: new Date("2024-05-11T19:56:39.214108"),
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: new Date("2024-04-13T19:56:39.214108"),
        total: 290,
    },
];

export async function fetchTodoPlans() {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/plans/remain`, {
        method: "GET",
        cache: "no-store",
        headers: {
            Cookie: cookieStore
                .getAll()
                .map((cookie) => {
                    return `${cookie.name}=${cookie.value}`;
                })
                .join("; "),
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    `${res.status}: Failed to fetch ramaining plans`
                );
            }
        })
        .then((plans: PlanInfo[]) => {
            if (plans) {
                return plans.map((plan) => {
                    return {
                        ...plan,
                        createdAt: new Date(plan.createdAt!),
                    };
                });
            } else {
                throw new Error("data is null");
            }
        })
        .catch((err) => {
            console.error(err);
            if (process.env.NODE_ENV === "development") {
                return dummyList;
            } else {
                return [];
            }
        });
}

export async function fetchPlans() {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/plans`, {
        method: "GET",
        headers: {
            Cookie: cookieStore
                .getAll()
                .map((cookie) => {
                    return `${cookie.name}=${cookie.value}`;
                })
                .join("; "),
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`${res.status}: Failed to fetch plans`);
            }
        })
        .then((plans: PlanInfo[]) => {
            if (plans) {
                return plans.map<PlanInfo>((plan) => {
                    return {
                        ...plan,
                        createdAt: new Date(plan.createdAt!),
                    };
                });
            } else {
                throw new Error("data is null");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyList;
        });
}

export function sortPlansByDate(plans: PlanInfo[]) {
    return plans.sort((a, b) => {
        return (
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
    });
}
