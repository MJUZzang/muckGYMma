"use client";

import ArrowBack from "@/_images/ArrowBack";
import Pause from "@/_images/Pause";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CheckMark from "@/_images/CheckMark";
import Button from "@/_components/Button";
import RestTimer from "@/plan/_components/RestTimer";
import Play from "@/_images/Play";
import { useAppDispatch, useAppSelector } from "@/../lib/hooks";
import {
    selectPlanInfo,
    selectSelectedWorkout,
} from "@/../lib/slices/planInfoSlice";
import { formatTimeHour, formatTimeInKor } from "@/plan/_utils/time";
import { Noto_Sans_KR } from "next/font/google";
import { backendUrl } from "@/_utils/urls";
import { Workout } from "@/_types/Plan";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

function PlanPage() {
    const router = useRouter();

    const [timerTime, setTimerTime] = useState(0);
    const [timerIntervalId, setTimerIntervalId] =
        useState<NodeJS.Timeout | null>(null);
    const dispatch = useAppDispatch();
    const planInfo = useAppSelector(selectPlanInfo);
    const selectedWorkout = useAppSelector(selectSelectedWorkout);
    const [selectedSet, setSelectedSet] = useState(0);
    const restTimerButtonRef = React.createRef<HTMLDivElement>();
    const [restTime, setRestTime] = useState(0);

    const task: Workout = planInfo.tasks![selectedWorkout];

    useEffect(() => {
        const id = setInterval(() => {
            setTimerTime((prev) => prev + 1);
        }, 1000);
        setTimerIntervalId(id);

        return () => {
            if (timerIntervalId !== null) {
                clearInterval(timerIntervalId);
            }
        };
    }, []);

    function GetPlanStyle(order: number) {
        if (order === selectedSet) {
            return "bg-app-blue-2 scale-[105%]";
        }
        if (order < selectedSet) {
            return "bg-gray-700 text-app-inverted-font-4 scale-[105%]";
        } else {
            return "bg-gray-400 text-app-inverted-font-4";
        }
    }

    return (
        <>
            <div
                className={`pt-3 pb-[65px] mx-3 flex flex-col min-h-[100dvh] animate-page-enter ${notoSansKr.className}`}
            >
                <div className="grid grid-cols-3">
                    <ArrowBack
                        className="fill-app-font-3 cursor-pointer my-auto"
                        onClick={() => router.back()}
                    />

                    {/* Timer */}
                    <div
                        className="flex items-center justify-between gap-2 mx-auto w-[119px] h-[35px] my-auto
                        rounded-full border-app-blue border-[1.5px] px-2"
                        onClick={() => {
                            if (timerIntervalId === null) {
                                const intervalId = setInterval(() => {
                                    setTimerTime((prev) => prev + 1);
                                }, 1000);
                                setTimerIntervalId(intervalId);
                            } else {
                                setTimerIntervalId(null);
                                clearInterval(timerIntervalId);
                            }
                        }}
                    >
                        {/* Dot */}
                        <div className="rounded-full w-[5px] h-[5px] animate-custom-pulse bg-app-blue" />

                        {/* Timer */}
                        <p className="text-app-font-2 text-sm">
                            {formatTimeHour(timerTime)}
                        </p>

                        {/* Pause image */}
                        <Pause
                            className={`fill-app-blue-1 ${
                                timerIntervalId === null && "hidden"
                            }`}
                        />
                        <Play
                            className={`${
                                timerIntervalId !== null && "hidden"
                            }`}
                        />
                    </div>

                    {/* Avatar */}
                    <div className="w-full flex justify-end">
                        <div className="w-[48px] h-[48px] overflow-clip rounded-3xl ">
                            <Image
                                src={exampleImage}
                                alt="avatar"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Workout name */}
                <p className="text-app-font-2 font-semibold text-2xl mt-3 px-3">
                    {task.name} x {task.sets}세트
                </p>

                {/* Progress */}
                <p className="mt-2 px-3 text-app-font-3 text-sm">
                    {selectedSet + 1} / {task.sets}
                </p>

                <div className="flex flex-col gap-3 mt-3 px-4">
                    {Array.from({ length: task.sets! }).map((set, idx) => (
                        <div
                            key={idx}
                            className={`text-app-inverted-font shadow-xl grid grid-cols-3 py-2 px-4 rounded-xl transition-all duration-1000
                                ${GetPlanStyle(idx)}`}
                        >
                            <p className={`w-full text-left my-auto`}>
                                {idx + 1} 세트
                            </p>

                            <div>
                                <p className={`w-full text-right`}>
                                    {task.repeatation} 회
                                </p>
                                {task.weight && (
                                    <p className={`w-full text-right`}>
                                        {task.weight} kg
                                    </p>
                                )}
                                {task.time && (
                                    <p className={`w-full text-right`}>
                                        {formatTimeInKor(task.time)}
                                    </p>
                                )}
                            </div>

                            <div
                                className={`w-full my-auto transition-opacity duration-1000 ${
                                    idx >= selectedSet && "opacity-0"
                                }`}
                            >
                                <CheckMark
                                    width={28}
                                    height={28}
                                    className="ml-auto fill-app-blue-4"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-app-bg shadow-[-1px_0px_6px_1px_rgba(0,0,0,0.1)] fixed bottom-0 w-full pt-2 pb-3 px-3 flex gap-3 mt-auto">
                <RestTimer
                    key={task.name}
                    time={restTime}
                    setTime={setRestTime}
                    onClose={() => {
                        // 모든 세트 완료시 /plan-info 페이지로 이동
                        if (selectedSet === task.sets) {
                            fetch(
                                `${backendUrl}/api/task/done/${
                                    planInfo.tasks![selectedWorkout].id
                                }`,
                                {
                                    credentials: "include",
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        time: timerTime,
                                    }),
                                }
                            )
                                .then((res) => {
                                    console.log(res.status);
                                    if (res.ok) {
                                        router.back();
                                    }
                                })
                                .catch((err) => console.error(err));
                        }
                    }}
                >
                    <Button
                        ref={restTimerButtonRef}
                        className="px-3 bg-gray-600 text-white/90"
                        onClick={() => {
                            const savedRestTime =
                                localStorage.getItem("restTime");
                            if (savedRestTime) {
                                const parsedRestTime = parseInt(savedRestTime);
                                setRestTime(parsedRestTime);
                            } else {
                                setRestTime(30);
                            }
                        }}
                    >
                        휴식 타이머
                    </Button>
                </RestTimer>
                <Button
                    className="bg-app-blue-2"
                    onClick={() => {
                        if (task.sets! > selectedSet) {
                            setSelectedSet(selectedSet + 1);
                        }
                        restTimerButtonRef.current?.click();
                    }}
                >
                    세트 완료
                </Button>
            </div>
        </>
    );
}

export default PlanPage;
