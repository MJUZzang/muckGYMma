"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/../lib/hooks";
import { setGender } from "@/../lib/slices/initialInfoSlice";

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
        <div className="text-white/90 h-full flex flex-col animate-page-enter">
            <p className="mt-5 text-xl">성별은 무엇인가요?</p>
            <p className="mt-2 text-xs">
                운동 플랜 생성에 사용되며 공유되지 않습니다
            </p>

            <div className="mt-auto space-y-3">
                {genders.map((gender, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-7 p-4 backdrop-blur-lg rounded-xl font-bold 
                        transition-all duration-500
                        ${
                            selectedGender === idx
                                ? "bg-fluorescent text-black"
                                : "bg-white/15"
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
