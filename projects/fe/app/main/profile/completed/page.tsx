import Link from "next/link";
import React, { useState } from "react";
import { Dosis, Jua, Noto_Sans_KR } from "next/font/google";
import { formatTimeInKor } from "@/plan/_utils/time";
import CheckMark from "@/_images/CheckMark";
import { fetchPlans, sortPlansByDate } from "@/_utils/plan";
import Swimming from "@/_images/Swimming";
import Football from "@/_images/Football";
import Muscle from "@/_images/Muscle";
import NoData from "@/main/profile/_components/NoData";

const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});
const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});
const dosis = Dosis({
    subsets: ["latin"],
    weight: "400",
});

function getIcon(name: string) {
    switch (name) {
        case "수영":
            return <Swimming />;
        case "축구":
            return <Football />;
        default:
            return <Muscle />;
    }
}

async function CompletedPage() {
    const plans = await fetchPlans();
    const completedPlans = plans.filter((plan) => plan.cleared);
    const sortedPlans = sortPlansByDate(completedPlans);

    return (
        <>
            {sortedPlans.length === 0 && (
                <NoData text="완료된 운동 플랜이 없습니다." />
            )}

            {sortedPlans.length > 0 && (
                <div className="h-fit">
                    <p className="flex items-center mx-3 gap-1 px-3 rounded-lg py-2 bg-app-blue bg-opacity-20 backdrop-blur-lg text-black/80 font-semibold text-[14px] mt-3 mb-3">
                        <CheckMark className="fill-app-font-4 relative bottom-[2.5px]" />
                        완료된 운동 플랜
                    </p>

                    <div className="px-5 space-y-3">
                        {sortedPlans.map((plan, i) => (
                            <Link
                                key={i}
                                href={`/plan/info/${plan.id}`}
                                className="pl-2 pr-5 py-2 mx-2 rounded-2xl flex items-center gap-3
                                bg-app-bg-1 hover:bg-app-bg-3 hover:shadow-sm transition duration-500 ease-in-out"
                            >
                                {getIcon(plan.name!)}
                                <div>
                                    <p
                                        className={`text-app-font-2 font-semibold ${notoSansKr.className}`}
                                    >
                                        {plan.name}
                                    </p>

                                    <p
                                        className={`mt-2 text-xs text-app-font-2 ${notoSansKr.className}`}
                                    >
                                        {formatTimeInKor(plan.time!)} 소요
                                    </p>
                                    <p
                                        className={`text-xs text-app-font-2 ${notoSansKr.className}`}
                                    >
                                        완료일: {null}
                                    </p>
                                </div>
                                <div className="ml-auto flex flex-col items-center relative top-1">
                                    <p
                                        className={`text-app-font-2 ${dosis.className}`}
                                    >
                                        {plan.total}
                                    </p>
                                    <p
                                        className={`relative bottom-2 text-app-font-4 ${jua.className}`}
                                    >
                                        kcal
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default CompletedPage;
