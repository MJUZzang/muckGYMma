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
    markWorkoutAsCompleted,
    selectPlanInfo,
    selectSelectedWorkout,
    setCompletionTime,
    setSelectedWorkout,
} from "@/../lib/slices/planInfoSlice";

function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hrs, mins, secs].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

function Page() {
    const router = useRouter();

    const [timerTime, setTimerTime] = useState(0);
    const [timerIntervalId, setTimerIntervalId] =
        useState<NodeJS.Timeout | null>(null);

    const dispatch = useAppDispatch();
    const planInfo = useAppSelector(selectPlanInfo);
    const selectedWorkout = useAppSelector(selectSelectedWorkout);
    const workout = useAppSelector(selectPlanInfo).workouts[selectedWorkout];

    const [selectedSet, setSelectedSet] = useState(0);

    const restTimerButtonRef = React.createRef<HTMLDivElement>();
    const [restTime, setRestTime] = useState(0);

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
            return "bg-slate-700 border-2 border-fluorescent/50 text-white";
        }
        if (order < selectedSet) {
            return "bg-fluorescent/20 text-fluorescent/50";
        } else {
            return "bg-slate-700 text-white/50";
        }
    }

    return (
        <div className="py-3 mx-2 flex flex-col min-h-[100dvh] animate-page-enter">
            <div className="grid grid-cols-3">
                <ArrowBack
                    className="fill-white/80 cursor-pointer my-auto"
                    onClick={() => router.back()}
                />

                {/* Timer */}
                <div
                    className="flex items-center justify-between gap-2 mx-auto w-[119px] h-[35px] my-auto
                            rounded-full border-fluorescent border-[1.5px] px-2"
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
                    <div className="rounded-full w-[5px] h-[5px] animate-custom-pulse bg-fluorescent" />

                    {/* Timer */}
                    <p className="text-white/90 text-sm">
                        {formatTime(timerTime)}
                    </p>

                    {/* Pause image */}
                    <Pause
                        className={`${timerIntervalId === null && "hidden"}`}
                    />
                    <Play
                        className={`${timerIntervalId !== null && "hidden"}`}
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

            {/* Progress */}
            <p className="text-white/60 text-sm">1 / 6</p>

            {/* Workout name */}
            <p className="text-white/90 text-2xl mt-3">{workout.name}</p>

            <div className="flex flex-col gap-2 mt-3">
                {Array.from({ length: workout.set }).map((set, idx) => (
                    <div
                        key={idx}
                        className={`grid grid-cols-3 py-4 px-3 rounded-xl
                        ${GetPlanStyle(idx)}`}
                    >
                        <p className={`w-full text-left my-auto`}>
                            {idx + 1} 세트
                        </p>

                        <div>
                            <p className={`w-full text-right`}>
                                {workout.repeatation} 회
                            </p>
                            {workout.weight && (
                                <p className={`w-full text-right`}>
                                    {workout.weight} kg
                                </p>
                            )}
                        </div>

                        <div
                            className={`w-full ${
                                idx >= selectedSet && "invisible"
                            }`}
                        >
                            <CheckMark className="ml-auto " color="#dfff32" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3 mt-auto">
                <RestTimer
                    key={workout.name}
                    time={restTime}
                    setTime={setRestTime}
                    onClose={() => {
                        // 모든 세트 완료시 /plan-info 페이지로 이동
                        if (selectedSet === workout.set) {
                            dispatch(markWorkoutAsCompleted(selectedWorkout));
                            dispatch(setCompletionTime({ workoutIndex: selectedWorkout, completionTime: timerTime }));

                            // 다음으로 진행할 수 있는 workout 인덱스 계산 후 선택
                            for (let i = 0; i < planInfo.workouts.length; i++) {
                                if (
                                    !planInfo.workouts[i].isCompleted &&
                                    i !== selectedWorkout
                                ) {
                                    dispatch(setSelectedWorkout(i));
                                    break;
                                }
                            }

                            router.push("/plan-info");
                        }
                    }}
                >
                    <Button
                        ref={restTimerButtonRef}
                        className="px-3 bg-slate-500 text-fluorescent"
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
                    onClick={() => {
                        if (workout.set > selectedSet) {
                            setSelectedSet(selectedSet + 1);
                        }
                        restTimerButtonRef.current?.click();
                    }}
                >
                    세트 완료
                </Button>
            </div>
        </div>
    );
}

export default Page;
