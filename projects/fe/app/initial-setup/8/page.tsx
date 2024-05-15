"use client";

import React, { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/../lib/hooks";
import { setExperience } from "../../../lib/slices/initialInfoSlice";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

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
    const dispatch = useAppDispatch();
    return (
        <div className={`text-app-font-2 h-full flex flex-col animate-page-enter ${notoSansKr.className}`}>
            <p className="mt-5 text-xl">운동 경험이 얼마나 되시나요?</p>
            <p className="mt-2 text-xs">
                운동 플랜 생성에 사용되며 공유되지 않습니다
            </p>

            <div className="mt-auto space-y-3">
                {selection.map((exp, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-7 p-4 rounded-xl font-semibold 
                        transition-all duration-500 text-base md:text-lg
                        ${
                            selectedExp === idx
                                ? "bg-app-blue text-app-inverted-font"
                                : "bg-app-bg-1"
                        }`}
                        onClick={() => {
                            setSelectedExp(idx);
                            dispatch(setExperience(exp.title));
                            setTimeout(() => {
                                router.push("/initial-setup/9");
                            }, 500);
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
