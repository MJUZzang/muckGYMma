"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/../lib/hooks";
import { setFrequency } from "@/../lib/slices/userInfoSlice";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

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
    const [selectedFrequency, setSelectedFrequency] = useState<number | null>(
        null
    );
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <div
            className={`text-app-font-2 h-full flex flex-col animate-page-enter ${notoSansKr.className}`}
        >
            <p className="mt-5 text-xl">운동을 매주 얼마나 자주 하시나요?</p>
            <p className="mt-2 text-xs">이후에도 변경하실 수 있습니다</p>

            <div className="grid grid-cols-2 gap-2 mt-auto">
                {selection.map((item, idx) => (
                    <div
                        key={idx}
                        className={`pl-4 text-left py-2 backdrop-blur-lg rounded-xl font-semibold cursor-pointer
                        transition-all text-base duration-500
                         ${
                             selectedFrequency === idx
                                 ? "bg-app-blue text-app-inverted-font"
                                 : "bg-app-bg-1"
                         }`}
                        onClick={() => {
                            setSelectedFrequency(idx);
                            dispatch(setFrequency(item.title));
                            setTimeout(() => {
                                router.push("/initial-setup/5");
                            }, 500);
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
