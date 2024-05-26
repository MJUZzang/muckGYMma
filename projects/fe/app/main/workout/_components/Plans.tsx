"use client";

import React, { useEffect, useState } from "react";
import Plan from "@/main/workout/_components/Plan";
import Link from "next/link";
import { PlanInfo } from "@/_types/Plan";
import { Noto_Sans_KR } from "next/font/google";
import UploadMeal from "@/_components/UploadMeal";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

interface PlansProps {
    plans: PlanInfo[];
}

function filterPlans(plans: PlanInfo[]) {
    return plans.filter((plan) => {
        const createdAt = new Date(plan.createdAt!);
        const dateNow = new Date();
        const dateAfter7Days = new Date(
            createdAt.setDate(createdAt.getDate() + 7)
        );

        return dateAfter7Days > dateNow;
    });
}

const Plans = ({ plans }: PlansProps) => {
    const [plansFiltered, setPlansFiltered] = useState<PlanInfo[]>(
        filterPlans(plans)
    );

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-show-plan");
                }
            });
        });

        const taskElements = document.querySelectorAll(".task");
        taskElements.forEach((element) => {
            observer.observe(element);
        });

        setInterval(() => {
            setPlansFiltered(filterPlans(plans));
        }, 1000);
    }, []);

    return (
        <div className={`space-y-3 mt-3 mb-6 h-full ${notoSansKr.className}`}>
            {plansFiltered.length > 0 &&
                plansFiltered.map((plan, index) => {
                    return (
                        <Link
                            key={index}
                            className="block"
                            href={`/plan/info/${plan.id}`}
                        >
                            <Plan
                                className={`task py-6 translate-x-[100%]`}
                                plan={plan}
                            />
                        </Link>
                    );
                })}
            {plansFiltered.length === 0 && (
                <>
                    <div className="text-center">
                        <p className="text-app-font-3 text-2xl font-semibold">
                            운동플랜이 없습니다.
                        </p>
                        <p className="mt-1 text-app-font-2 text-base">
                            식단 사진을 업로드 하고 운동플랜을 추가해보세요!
                        </p>
                    </div>

                    {/* 운동플랜 추가 버튼 */}
                    <div className="flex justify-center">
                        <UploadMeal
                            className="bg-app-bg-4 px-4 py-2 rounded-full text-app-font-2 hover:bg-app-bg-3"
                            buttonContent="식단 이미지 업로드"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Plans;
