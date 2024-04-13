"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const selection = [
    {
        title: "처음",
        value: "0",
    },
    {
        title: "3개월 미만",
        value: "1",
    },
    {
        title: "6개월 미만",
        value: "2",
    },
    {
        title: "1년 미만",
        value: "3",
    },
    {
        title: "1년 이상",
        value: "4",
    },
];

function Page() {
    const [selectedExp, setSelectedExp] = useState<number | null>(null);
    const router = useRouter();

    return (
        <div className="text-white/90 h-full flex flex-col">
            <p className="mt-5 text-xl">운동 경험이 얼마나 되시나요?</p>
            <p className="mt-2 text-xs">
                운동 플랜 생성에 사용되며 공유되지 않습니다
            </p>

            <div className="mt-auto space-y-3">
                {selection.map((exp, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-7 p-4 backdrop-blur-lg rounded-xl font-bold 
                        transition-all duration-500
                        ${
                            selectedExp === idx
                                ? "bg-fluorescent text-black"
                                : "bg-white/15"
                        }`}
                        onClick={() => {
                            setSelectedExp(idx);
                            setTimeout(() => {
                                router.push("/initial-setup/9");
                            }, 700);
                        }}
                    >
                        <p className="">{exp.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
