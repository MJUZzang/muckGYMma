import { PlanInfo } from "@/_types/Plan";
import { backendUrl } from "@/_utils/urls";
import { cookies } from "next/headers";

const dummyList: PlanInfo[] = [
    {
        name: "헬스",
        time: 1804,
        cleared: false,
        createdAt: "2024-018-05T00:00:00Z",
        total: 290,
    },
    {
        name: "수영",
        time: 1804,
        cleared: false,
        createdAt: "2024-018-05T00:00:00Z",
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: "2024-018-05T00:00:00Z",
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: "2024-018-05T00:00:00Z",
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: "2024-018-05T00:00:00Z",
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: "2024-018-05T00:00:00Z",
        total: 290,
    },
    {
        name: "축구",
        time: 1804,
        cleared: false,
        createdAt: "2024-018-05T00:00:00Z",
        total: 290,
    },
];

export async function fetchTodoPlans() {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/plans/remain`, {
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
                throw new Error(
                    `${res.status}: Failed to fetch ramaining plans`
                );
            }
        })
        .then((data: PlanInfo[]) => {
            if (data) {
                return data;
            } else {
                throw new Error("data is null");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyList;
        });
}
