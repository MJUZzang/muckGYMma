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

function PlanInfo() {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const planInfo = useAppSelector(selectPlanInfo);
    const selectedWorkout = useAppSelector(selectSelectedWorkout);

    useEffect(() => {
        return () => {};
    }, []);

    function GetWorkoutStyle(index: number) {
        if (planInfo.workouts[index].isCompleted) {
            return "bg-fluorescent/10";
        }
        if (index === selectedWorkout) {
            return "bg-fluorescent/20 ring-2 ring-fluorescent/50";
        }
        return "bg-white/10";
    }

    return (
        <div className={`flex flex-col mx-3 animate-page-enter min-h-[100dvh]`}>
            {/* 엑스 버튼 */}
            <div
                className="cursor-pointer mt-5"
                onClick={() => {
                    router.push("/");
                }}
            >
                <div className="space-y-[5px]">
                    <div className="h-[3px] w-[30px] bg-white rotate-45 rounded-full" />
                    <div className="relative bottom-[8px] h-[3px] w-[30px] bg-white -rotate-45 rounded-full" />
                </div>
            </div>

            <div className="flex flex-col mt-4">
                <div className="flex items-center gap-3">
                    {/* 운동 아이콘 */}
                    <div className="w-[80px] h-[80px] bg-white rounded-full" />
                    <div>
                        <p className="text-white/90">{planInfo.type}</p>
                        <p className="text-white/90">{planInfo.kcal} kcal</p>
                        <p
                            className={`text-white/90 ${
                                !planInfo.isCompleted && "invisible"
                            }`}
                        >
                            {planInfo.completedAt &&
                                `완료일: ${planInfo.completedAt}`}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 mt-4 group">
                    {planInfo.workouts.map((workout, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center p-3 rounded-lg 
                            ${GetWorkoutStyle(index)} ${!workout.isCompleted && "cursor-pointer"}`}
                            onClick={() => {
                                if (!workout.isCompleted) {
                                    dispatch(setSelectedWorkout(index));
                                }
                            }}
                        >
                            <div className="w-fit text-nowrap">
                                <p className="text-white">{workout.name}</p>
                                <p className="text-white/70">
                                    {workout.set}set {workout.repeatation}rep
                                </p>
                            </div>
                            <div className="w-full text-right pr-4">
                                <p className="text-white">{workout.kcal}kcal</p>
                                <p
                                    className={`text-white text-sm ${
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
                                    className={`text-white/70 ${
                                        !workout.isCompleted && "invisible"
                                    }`}
                                    color="#dfff32"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Link href="/plan" className="mt-auto mb-3">
                <Button
                    className={`${
                        !(
                            selectedWorkout &&
                            !planInfo.workouts[selectedWorkout].isCompleted
                        ) && "bg-fluorescent/20 text-white/30"
                    }`}
                >
                    운동 시작
                </Button>
            </Link>
        </div>
    );
}

export default PlanInfo;
