"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Button from "@/_components/Button";
import { useAppDispatch, useAppSelector } from "@/../lib/hooks";
import {
    selectPlanInfo,
    selectSelectedWorkout,
    setSelectedWorkout,
} from "@/../lib/slices/planInfoSlice";
import CheckMark from "@/_images/CheckMark";
import { formatTimeInKor } from "@/plan/_utils/time";
import { Noto_Sans_KR, Dosis } from "next/font/google";
import Muscle from "@/_images/Muscle";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});
const dosis = Dosis({
    subsets: ["latin"],
});

function PlanInfo() {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const planInfo = useAppSelector(selectPlanInfo);
    const selectedWorkout = useAppSelector(selectSelectedWorkout);

    useEffect(() => {
        return () => {};
    }, []);

    function GetWorkoutBoxStyle(index: number) {
        if (planInfo.workouts[index].isCompleted) {
            return "bg-[#9b93af]";
        }
        if (index === selectedWorkout) {
            return "bg-[#666de8] scale-[101.5%]";
        }
        return "bg-[#8f95f9]";
    }

    return (
        <>
            <div
                className={`flex flex-col px-3 pb-[65px] animate-page-enter min-h-[100dvh] ${notoSansKr.className}`}
            >
                {/* 엑스 버튼 */}
                <div
                    className="cursor-pointer mt-7"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    <div className="space-y-[5px]">
                        <div className="h-[3px] w-[30px] bg-app-font-2 rotate-45 rounded-full" />
                        <div className="relative bottom-[8px] h-[3px] w-[30px] bg-app-font-2 -rotate-45 rounded-full" />
                    </div>
                </div>

                <div className="flex flex-col mt-6">
                    <div className="flex items-center gap-3">
                        {/* 운동 아이콘 */}
                        <Muscle className="bg-app-bg-2 rounded-full p-4" />
                        <div>
                            <p className="text-app-font-2 text-lg">
                                {planInfo.type}
                            </p>
                            <p className={`text-app-font-2 ${dosis.className}`}>
                                {planInfo.kcal} kcal
                            </p>
                            {/* {!planInfo.isCompleted && (
                            <p>
                                {planInfo.completedAt &&
                                    `완료일: ${planInfo.completedAt}`}
                            </p>
                        )} */}
                        </div>
                    </div>

                    <div className="space-y-3 mt-6 group px-2">
                        {planInfo.workouts.map((workout, index) => (
                            <div
                                key={index}
                                className={`shadow-xl flex justify-between items-center p-3 rounded-lg transition-all duration-500 ease-in-out
                            ${GetWorkoutBoxStyle(index)} ${
                                    !workout.isCompleted && "cursor-pointer"
                                }`}
                                onClick={() => {
                                    if (!workout.isCompleted) {
                                        dispatch(setSelectedWorkout(index));
                                    }
                                }}
                            >
                                <div className="w-fit text-nowrap">
                                    <p className="text-app-inverted-font">
                                        {workout.name}
                                    </p>
                                    <div className="flex">
                                        <p className="text-app-inverted-font">
                                            {workout.set}sets
                                        </p>
                                        &nbsp;
                                        <p className="text-app-inverted-font">
                                            {workout.repeatation}reps
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full text-right pr-4">
                                    <p className="text-app-inverted-font">
                                        {workout.kcal}kcal
                                    </p>
                                    <p
                                        className={`text-app-inverted-font text-sm ${
                                            !workout.isCompleted && "invisible"
                                        }`}
                                    >
                                        {workout.isCompleted &&
                                            workout.completionTime &&
                                            `${formatTimeInKor(
                                                workout.completionTime
                                            )} 소요`}
                                    </p>
                                </div>
                                <div>
                                    <CheckMark
                                        className={`text-app-inverted-font/70 fill-[#dfff32] ${
                                            !workout.isCompleted && "invisible"
                                        }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="fixed bottom-0 w-full mt-auto bg-app-bg px-3 pb-3 py-2
                shadow-[-1px_0px_6px_1px_rgba(0,0,0,0.1)]"
            >
                <Link href="/plan">
                    <Button
                        className={`bg-blue-800 ${
                            !(
                                selectedWorkout &&
                                !planInfo.workouts[selectedWorkout].isCompleted
                            ) && "bg-app-blue/20 text-app-inverted-font"
                        }`}
                    >
                        운동 시작
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default PlanInfo;
