"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ForwardButton from "@/initial-setup/_components/ForwardButton";

const sports = [
    "축구",
    "농구",
    "야구",
    "배구",
    "테니스",
    "탁구",
    "볼링",
    "수영",
    "등산",
    "자전거",
    "런닝",
    "요가",
    "필라테스",
    "크로스핏",
    "핸드볼",
    "댄스",
    "복싱",
    "격투기",
    "킥복싱",
    "수상스키",
    "스노보드",
    "스키",
    "서핑",
    "스케이트보드",
    "스케이팅",
];

function Page() {
    const [selectedSports, setSelectedSports] = useState<string[]>([]);
    const router = useRouter();

    return (
        <div className="text-white/90 h-full flex flex-col">
            <p className="mt-5 text-xl text-pretty">
                자주 즐기는 스포츠가 있나요?
            </p>
            <p className="mt-2 text-xs">
                운동 플랜 생성에 사용되며 공유되지 않습니다
            </p>

            <div className="flex flex-wrap gap-3 mt-auto">
                {sports.map((sport, idx) => (
                    <div
                        key={sport}
                        onClick={() => {
                            if (selectedSports.includes(sport)) {
                                setSelectedSports(
                                    selectedSports.filter((s) => s !== sport)
                                );
                            } else {
                                setSelectedSports([...selectedSports, sport]);
                            }
                        }}
                        className={`px-2 py-1 rounded-full font-bold 
                        transition-all 
                        ${
                            selectedSports.includes(sport)
                                ? "bg-fluorescent text-black"
                                : "bg-white/15"
                        }`}
                    >
                        {sport}
                    </div>
                ))}
            </div>

            <ForwardButton
                onClick={() => {
                    setTimeout(() => {
                        router.push("/initial-setup/10");
                    }, 500);
                }}
                title="다음"
                className="mt-10"
            />
        </div>
    );
}

export default Page;
