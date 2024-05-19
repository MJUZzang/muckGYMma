"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/../lib/hooks";
import { setGender } from "../../../lib/slices/userInfoSlice";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

const genders = [
    {
        title: "남성",
        value: "male",
    },
    {
        title: "여성",
        value: "female",
    },
    {
        title: "이 외",
        value: "others",
    },
];

function Page() {
    const [selectedGender, setSelectedGender] = useState<number | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    return (
        <div
            className={`text-app-font-2 h-full flex flex-col animate-page-enter ${notoSansKr.className}`}
        >
            <p className="mt-5 text-xl">성별은 무엇인가요?</p>
            <p className="mt-2 text-xs">
                운동 플랜 생성에 사용되며 공유되지 않습니다
            </p>

            <div className="mt-auto space-y-3">
                {genders.map((gender, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-7 p-4 backdrop-blur-lg rounded-xl font-semibold cursor-pointer 
                        transition-all duration-500
                        ${
                            selectedGender === idx
                                ? "bg-app-blue text-app-inverted-font"
                                : "bg-app-bg-1"
                        }`}
                        onClick={() => {
                            setSelectedGender(idx);
                            dispatch(setGender(gender.title));
                            setTimeout(() => {
                                router.push("/initial-setup/7");
                            }, 500);
                        }}
                    >
                        <p className="">{gender.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
