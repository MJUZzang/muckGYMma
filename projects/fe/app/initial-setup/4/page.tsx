"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const selection = [
    {
        title: "주 1회",
        value: 1,
    },
    {
        title: "주 2회",
        value: 2,
    },
    {
        title: "주 3회",
        value: 3,
    },
    {
        title: "주 4회",
        value: 4,
    },
    {
        title: "주 5회",
        value: 5,
    },
    {
        title: "매일",
        value: 7,
    },
];

function Page() {
    const [selectedFrequency, setSelectedFrequency] = useState<number | null>(null);
    const router = useRouter();

    return (
        <div className="text-white/90 h-full flex flex-col">
            <p className="mt-5 text-xl">운동을 매주 얼마나 자주 하시나요?</p>
            <p className="mt-2 text-xs">이후에도 변경하실 수 있습니다</p>

            <div className="grid grid-cols-2 gap-2 mt-auto">
                {selection.map((item, idx) => (
                    <div
                        key={idx}
                        className={`pl-4 text-left py-2 backdrop-blur-lg rounded-xl font-bold 
                        transition-all text-sm duration-500
                         ${
                             selectedFrequency === idx
                                 ? "bg-fluorescent text-black"
                                 : "bg-white/15"
                         }`}
                        onClick={() => {
                            setSelectedFrequency(idx);
                            setTimeout(() => {
                                router.push("/initial-setup/5");
                            }, 700);
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
