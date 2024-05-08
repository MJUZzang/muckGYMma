"use client";

import { PlanInfo as PlanInfoType, emptyPlanInfo } from "@/_types/Plan";
import { useRouter } from "next/navigation";
import { dummyPlanInfo } from "@/_types/Plan";

import React, { useEffect, useState } from "react";
import Button from "@/_components/Button";

function PlanInfo() {
    const router = useRouter();
    const [planInfo, setPlanInfo] = useState<PlanInfoType>(emptyPlanInfo);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setPlanInfo(dummyPlanInfo);
        }
    }, []);

    return (
        <div className={`h-[100dvh] flex flex-col mx-3 animate-page-enter`}>
            {/* 엑스 버튼 */}
            <div
                className="cursor-pointer mt-5"
                onClick={() => {
                    router.back();
                }}
            >
                <div className="space-y-[5px]">
                    <div className="h-[3px] w-[30px] bg-white rotate-45 rounded-full" />
                    <div className="relative bottom-[8px] h-[3px] w-[30px] bg-white -rotate-45 rounded-full" />
                </div>
            </div>

            <div className="flex flex-col mt-4">
                <div className="flex items-center gap-3">
                    {/* 운동 아이콘 */}
                    <div className="w-[80px] h-[80px] bg-white rounded-full" />
                    <div>
                        <p className="text-white/90">{planInfo.name}</p>
                        <p className="text-white/90">{planInfo.kcal} kcal</p>
                        <p className="text-white/90">
                            완료일: {planInfo.completedAt}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 mt-4">
                    {dummyPlanInfo.plans.map((plan, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-white/10 p-3 rounded-lg"
                        >
                            <div>
                                <p className="text-white">{plan.name}</p>
                                <p className="text-white/70">
                                    {plan.set}set {plan.rep}rep
                                </p>
                            </div>
                            <div>
                                <p className="text-white">{plan.kcal}kcal</p>
                                <p className="text-white/70">
                                    {plan.completedAt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="mt-auto mb-3">플랜 시작하기</Button>
        </div>
    );
}

export default PlanInfo;
