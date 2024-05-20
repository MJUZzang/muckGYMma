import { cookies } from "next/headers";
import { backendUrl } from "./urls";
import { PlanInfo, emptyPlanInfo } from "@/_types/Plan";

export async function fetchTodoWorkoutPlans() {
    const cookieStore = cookies();

    const plans = await fetch(`${backendUrl}/api/plans/remain`, {
        method: "GET",
        credentials: "include",
        headers: {
            Cookie: cookieStore
                .getAll()
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join("; "),
        },
    })
        .then((res) => {
            if (res.ok) return res.json();
            return null;
        })
        .then((data: PlanInfo[]) => {
            if (data) return data;
            else return [emptyPlanInfo];
        })
        .catch((err) => {
            console.error(err);
            return [emptyPlanInfo];
        });

    return plans;
}
