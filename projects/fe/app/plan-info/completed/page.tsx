"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface PlanInfoProps {
    className?: string;
    
}

function PlanInfo() {
    const router = useRouter();

    return (
        <div className={`h-[100dvh] flex flex-col`}>
            {/* 엑스 버튼 */}
            <div
                className="cursor-pointer ml-3 mt-5"
                onClick={() => {
                    router.back();
                }}
            >
                <div className="space-y-[5px]">
                    <div className="h-[3px] w-[30px] bg-white rotate-45 rounded-full" />
                    <div className="relative bottom-[8px] h-[3px] w-[30px] bg-white -rotate-45 rounded-full" />
                </div>
            </div>

            <div className="flex flex-col mx-3 mt-4">
                <div className="flex items-center gap-3">
                    {/* 운동 아이콘 */}
                    <div className="w-[80px] h-[80px] bg-white rounded-full" />
                    <div>
                        <p className="text-white/90">Gym workout</p>
                        <p className="text-white/90">320kcal</p>
                        <p className="text-white/90">완료일: 2022-01-01</p>
                    </div>
                </div>

                <div className="space-y-3 mx-1 mt-4">
                    <div className="">
                        <p className="text-white/90">1. 벤치프레스</p>
                        <div className="ml-4">
                            <p className="text-white/90">5세트, 12 회</p>
                            <p className="text-white/90">113kcal 소모</p>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-white/90">2. 데드리프트</p>
                        <div className="ml-4">
                            <p className="text-white/90">5세트, 12 회</p>
                            <p className="text-white/90">113kcal 소모</p>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-white/90">3. 데드리프트</p>
                        <div className="ml-4">
                            <p className="text-white/90">5세트, 12 회</p>
                            <p className="text-white/90">113kcal 소모</p>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-white/90">4. 데드리프트</p>
                        <div className="ml-4">
                            <p className="text-white/90">5세트, 12 회</p>
                            <p className="text-white/90">113kcal 소모</p>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-white/90">2. 데드리프트</p>
                        <div className="ml-4">
                            <p className="text-white/90">5세트, 12 회</p>
                            <p className="text-white/90">113kcal 소모</p>
                        </div>
                    </div>

                    <div className="">
                        <p className="text-white/90">2. 데드리프트</p>
                        <div className="ml-4">
                            <p className="text-white/90">5세트, 12 회</p>
                            <p className="text-white/90">113kcal 소모</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanInfo;
