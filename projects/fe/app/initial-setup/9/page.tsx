"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ForwardButton from "@/initial-setup/_components/ForwardButton";
import { useAppDispatch, useAppSelector } from "@/../lib/hooks";
import {
    selectInitialInfo,
    setSports,
} from "../../../lib/slices/initialInfoSlice";
import ConfirmModal from "@/initial-setup/_components/ConfirmModal";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

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
    const dispatch = useAppDispatch();
    const initialInfo = useAppSelector(selectInitialInfo);
    const [isModelOpen, setIsModalOpen] = useState(false);

    return (
        <div className={`text-app-font-2 h-full flex flex-col animate-page-enter ${notoSansKr.className}`}>
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
                        className={`px-3 py-2 rounded-full font-semibold text-sm
                        transition-all cursor-pointer
                        ${
                            selectedSports.includes(sport)
                                ? "bg-app-blue text-app-inverted-font"
                                : "bg-app-bg-1 hover:bg-app-bg-3 hover:shadow-sm transition duration-500 ease-in-out"
                        }`}
                    >
                        {sport}
                    </div>
                ))}
            </div>

            <ForwardButton
                onClick={() => {
                    if (selectedSports.length === 0) {
                        alert("하나 이상의 스포츠를 선택해주세요");
                    } else {
                        dispatch(setSports(selectedSports));
                        setTimeout(() => {
                            router.push("/initial-setup/10");
                        }, 500);
                    }
                }}
                title="다음"
                className={`mt-10 ${
                    selectedSports.length === 0 &&
                    "bg-app-blue/75 text-app-inverted-font hover:bg-app-blue/90"
                }`}
            />

            <ConfirmModal
                isVisible={isModelOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default Page;
