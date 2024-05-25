"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import Button from "@/_components/Button";
import { useAppDispatch, useAppSelector } from "@/../lib/hooks";
import {
    initPlanInfoState,
    selectPlanInfo,
    selectSelectedWorkout,
    setSelectedWorkout,
} from "@/../lib/slices/planInfoSlice";
import CheckMark from "@/_images/CheckMark";
import { formatTimeInKor } from "@/plan/_utils/time";
import { Noto_Sans_KR, Dosis } from "next/font/google";
import Muscle from "@/_images/Muscle";
import { backendUrl } from "@/_utils/urls";
import { PlanInfo } from "@/_types/Plan";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});
const dosis = Dosis({
    subsets: ["latin"],
    weight: "400",
});

function InfoPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const planInfo = useAppSelector(selectPlanInfo);
    const selectedWorkout = useAppSelector(selectSelectedWorkout);
    const params = useParams();
    const planId = params.planId as string;

    useEffect(() => {
        if (!planInfo.id || planInfo.id !== Number(planId)) {
            console.log("다르다");
            fetch(`${backendUrl}/api/plans/${planId}`, {
                credentials: "include",
                method: "GET",
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("Failed to fetch plan info");
                    }
                })
                .then((plan: PlanInfo) => {
                    if (!plan) {
                        console.error("Failed to receive plan info");
                        throw new Error("Failed to receive plan info");
                    }
                    console.log(plan);

                    dispatch(
                        initPlanInfoState({
                            ...plan,
                            selectedWorkout: 0,
                        })
                    );
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        return () => {};
    }, []);

    function GetWorkoutBoxStyle(index: number) {
        if (index === selectedWorkout) {
            return "bg-app-blue-2 scale-[105%]";
        }
        if (planInfo.workouts && planInfo.workouts[index].cleared) {
            return "bg-gray-700 text-app-inverted-font-4 scale-[105%]";
        }
        return "bg-gray-400 text-app-inverted-font-4";
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
                            <p className="text-app-font-2 text-lg font-semibold">
                                {planInfo.name}
                            </p>
                            <div className={`text-app-font-2 flex`}>
                                <p className={`${dosis.className}`}>
                                    {planInfo.total}
                                </p>
                                &nbsp;kcal
                            </div>
                            {/* {!planInfo.isCompleted && (
                            <p>
                                {planInfo.completedAt &&
                                    `완료일: ${planInfo.completedAt}`}
                            </p>
                        )} */}
                        </div>
                    </div>

                    <div className="space-y-3 mt-6 group px-4">
                        {planInfo.tasks &&
                            planInfo.tasks.map((task, index) => (
                                <div
                                    key={index}
                                    className={`shadow-xl flex justify-between items-center p-3 rounded-lg 
                                transition-all duration-500 ease-in-out text-app-inverted-font
                                ${GetWorkoutBoxStyle(index)} ${
                                        !task.cleared && "cursor-pointer"
                                    }`}
                                    onClick={() => {
                                        if (!task.cleared) {
                                            dispatch(setSelectedWorkout(index));
                                        }
                                    }}
                                >
                                    <div className="w-fit text-nowrap">
                                        <p className="">{task.name}</p>
                                        <div className="flex">
                                            <p className="">
                                                {task.set}sets
                                            </p>
                                            &nbsp;
                                            <p className="">
                                                {task.repeatation}reps
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full text-right pr-4">
                                        <p className="">
                                            {task.expect}&nbsp;kcal
                                        </p>
                                        <p
                                            className={` text-sm ${
                                                !task.cleared && "invisible"
                                            }`}
                                        >
                                            {task.cleared &&
                                                task.doneSecond &&
                                                `${formatTimeInKor(
                                                    task.doneSecond
                                                )} 소요`}
                                        </p>
                                    </div>
                                    <div>
                                        <CheckMark
                                            width={28}
                                            height={28}
                                            className={`fill-app-blue-4 ${
                                                !task.cleared && "invisible"
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
                    <Button className={`bg-app-blue-2`}>운동 시작</Button>
                </Link>
            </div>
        </>
    );
}

export default InfoPage;
