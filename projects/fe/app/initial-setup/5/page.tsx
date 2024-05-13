"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/../lib/hooks";
import { setGoal } from "../../../lib/slices/initialInfoSlice";

const goals = [
    {
        title: "근비대",
        value: "?",
    },
    {
        title: "유지",
        value: "?",
    },
    {
        title: "체중 감량",
        value: "?",
    },
];

function Page() {
    const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <div className="text-app-font-2 h-full flex flex-col animate-page-enter">
            <p className="mt-5 text-xl">운동 목적이 무엇인가요?</p>
            <p className="mt-2 text-xs">
                운동 플랜 생성에 사용되며 공유되지 않습니다
            </p>

            <div className="mt-auto space-y-3">
                {goals.map((goal, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-7 p-4 backdrop-blur-lg rounded-xl font-bold 
                        transition-all duration-500
                        ${
                            selectedGoal === idx
                                ? "bg-app-blue text-black"
                                : "bg-white/15"
                        }`}
                        onClick={() => {
                            setSelectedGoal(idx);
                            dispatch(setGoal(goal.title));
                            setTimeout(() => {
                                router.push("/initial-setup/6");
                            }, 500);
                        }}
                    >
                        <p className="">{goal.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
