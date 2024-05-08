"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/../lib/hooks";
import { setLevel } from "@/../lib/slices/initialInfoSlice";

const levels = [
    {
        title: "입문자",
        description: "경험 없음",
    },
    {
        title: "초보자",
        description: "루틴이 필요한 단계",
    },
    {
        title: "중급자",
        description: "자신의 루틴을 알고 있는 단계",
    },
    {
        title: "전문가",
        description: "전문가 수준의 루틴을 가지고 있는 단계",
    },
];

function Page() {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <div className="text-white/90 flex flex-col h-full mt-auto animate-page-enter">
            <p className="mt-5 text-xl">운동을 얼마나 잘하시나요?</p>
            <p className="mt-2 text-xs">
                운동 플랜 구성을 위한 질문이며 공유되지 않습니다
            </p>

            <div className="mt-auto space-y-3">
                {levels.map((level, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-7 p-4 backdrop-blur-lg rounded-xl font-bold 
                        transition-all duration-500
                        ${
                            selectedLevel === idx
                                ? "bg-fluorescent text-black"
                                : "bg-white/15"
                        }`}
                        onClick={() => {
                            setSelectedLevel(idx);
                            dispatch(setLevel(level.title));
                            setTimeout(() => {
                                router.push("/initial-setup/4");
                            }, 500);
                        }}
                    >
                        <p>{level.title}</p>
                        <p className="text-xs">{level.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
