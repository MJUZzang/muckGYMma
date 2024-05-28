"use client";

import React, { use, useEffect, useState } from "react";
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
import { backendUrl, frontUrl } from "@/_utils/urls";
import { PlanInfo, Workout, dummyData } from "@/_types/Plan";

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
    const [promise, setPromise] = useState<Promise<void> | null>(null);

    useEffect(() => {
        setPromise(fetchPlan());

        // setPromise(
        //     new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve();
        //         }, 10);
        //     })
        // );

        return () => {};
    }, []);

    if (promise) {
        use(promise);
    }

    function getSelectableWorkoutIndex() {
        let selectedWorkoutIdx = 0;
        for (let i = 0; i < planInfo.tasks!.length; i++) {
            if (!planInfo.tasks![i].cleared && i !== selectedWorkout) {
                selectedWorkoutIdx = i;
                break;
            }
        }
        return selectedWorkoutIdx;
    }

    function fetchPlan() {
        return fetch(`${backendUrl}/api/plans/${planId}`, {
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
                    throw new Error("Failed to receive plan info");
                }
                console.log(plan);
                const clearedAt = plan.clearedAt ? new Date(plan.clearedAt) : null;
                dispatch(
                    initPlanInfoState({
                        ...plan,
                        selectedWorkout: getSelectableWorkoutIndex(),
                        id: Number(planId),
                        clearedAt: clearedAt,
                    })
                );
            })
            .catch((err) => {
                console.error(err);
                if (process.env.NODE_ENV === "development") {
                    dispatch(
                        initPlanInfoState({
                            ...dummyData,
                            selectedWorkout: 1,
                            id: Number(planId),
                        })
                    );
                }
            });
    }

    function GetWorkoutBoxStyle(plan: Workout, index: number) {
        if (
            (plan.cleared && index === selectedWorkout) ||
            (planInfo.tasks && planInfo.tasks[index].cleared)
        ) {
            return "bg-gray-700 text-app-inverted-font-4 scale-[105%]";
        }
        if (index === selectedWorkout) {
            return "bg-app-blue-2 scale-[105%]";
        }
        return "bg-gray-400 text-app-inverted-font-4";
    }

    if (!promise) {
        return null;
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
                            <p className="text-app-font-2">
                                {planInfo.clearedAt &&
                                    `완료일: ${planInfo.clearedAt.toLocaleString()}`}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 mt-6 group px-4">
                        {planInfo.tasks &&
                            planInfo.tasks.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`shadow-xl flex justify-between items-center p-3 rounded-lg 
                                transition-all duration-500 ease-in-out text-app-inverted-font
                                ${GetWorkoutBoxStyle(plan, index)} ${
                                        !plan.cleared && "cursor-pointer"
                                    }`}
                                    onClick={() => {
                                        if (!plan.cleared) {
                                            dispatch(setSelectedWorkout(index));
                                        }
                                    }}
                                >
                                    <div className="w-fit text-nowrap">
                                        <p className="">{plan.name}</p>
                                        <div className="flex">
                                            <p className="">{plan.sets}sets</p>
                                            &nbsp;
                                            <p className="">
                                                {plan.repeatation}reps
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full text-right pr-4">
                                        <p className="">
                                            {plan.kcal}&nbsp;kcal
                                        </p>
                                        <p
                                            className={` text-sm ${
                                                !plan.cleared && "invisible"
                                            }`}
                                        >
                                            {plan.cleared &&
                                                plan.doneSecond &&
                                                `${formatTimeInKor(
                                                    plan.doneSecond
                                                )} 소요`}
                                        </p>
                                    </div>
                                    <div>
                                        <CheckMark
                                            width={28}
                                            height={28}
                                            className={`fill-app-blue-4 ${
                                                !plan.cleared && "opacity-0"
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
                {planInfo.tasks &&
                planInfo.tasks.every((task) => task.cleared) ? (
                    <Button
                        className={`bg-red-500`}
                        onClick={() => {
                            window.location.href = `${frontUrl}/main/workout`;
                        }}
                    >
                        플랜 완료됨
                    </Button>
                ) : (
                    <Link href="/plan">
                        <Button className={`bg-app-blue-2`}>운동 시작</Button>
                    </Link>
                )}
            </div>
        </>
    );
}

export default InfoPage;
