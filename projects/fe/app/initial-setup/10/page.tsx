"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ForwardButton from "@/initial-setup/_components/ForwardButton";
import { useAppDispatch } from "@/../lib/hooks";
import { setExercises } from "@/../lib/slices/initialInfoSlice";
import ConfirmModal from "@/initial-setup/_components/ConfirmModal";

const workouts = [
    "벤치프레스",
    "스쿼트",
    "데드리프트",
    "풀업",
    "푸시업",
    "플랭크",
    "암컬",
    "덤벨프레스",
    "바벨로우",
    "사이드레터럴레이즈",
    "프론트레이즈",
    "레그익스텐션",
    "레그컬",
    "힙레이즈",
];

function Page() {
    const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isModelOpen, setIsModalOpen] = useState(false);

    return (
        <div className="text-white/90 h-full flex flex-col">
            <p className="mt-5 text-xl text-pretty">자주하는 운동이 있나요?</p>
            <p className="mt-2 text-xs">
                운동 플랜 생성에 사용되며 공유되지 않습니다
            </p>

            <div className="flex flex-wrap gap-3 mt-auto">
                {workouts.map((sport, idx) => (
                    <div
                        key={sport}
                        onClick={() => {
                            if (selectedWorkouts.includes(sport)) {
                                setSelectedWorkouts(
                                    selectedWorkouts.filter((s) => s !== sport)
                                );
                            } else {
                                setSelectedWorkouts([
                                    ...selectedWorkouts,
                                    sport,
                                ]);
                            }
                        }}
                        className={`px-2 py-1 rounded-full font-bold 
                        transition-all cursor-pointer
                        ${
                            selectedWorkouts.includes(sport)
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
                    if (selectedWorkouts.length === 0) {
                        alert("하나 이상 선택해주세요");
                    } else {
                        dispatch(setExercises(selectedWorkouts));
                        setTimeout(() => {
                            router.push("/initial-setup/11");
                        }, 500);
                    }
                }}
                title="다음"
                className={`mt-10 ${
                    selectedWorkouts.length === 0 &&
                    "bg-fluorescent/75 text-black/80 hover:bg-fluorescent/90"
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
