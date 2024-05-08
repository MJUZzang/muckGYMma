"use client";

import ArrowBack from "@/_images/ArrowBack";
import Pause from "@/_images/Pause";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";
import {
    PlanInfo as PlanInfoType,
    dummyPlanInfo,
    emptyPlanInfo,
} from "@/_types/Plan";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hrs, mins, secs].map((v) => (v < 10 ? "0" + v : v)).join(":");
}

function Page() {
    const router = useRouter();
    const [timer, setTimer] = useState(0);
    const [planInfo, setPlanInfo] = useState<PlanInfoType>(emptyPlanInfo);
    const [nowSelected, setNowSelected] = useState(2);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setPlanInfo(dummyPlanInfo);
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    });

    function GetPlanStyle(order: number) {
        if (order === nowSelected) {
            return "bg-stone-800 border-2 border-fluorescent text-white";
        }
        if (order < nowSelected) {
            return "bg-fluorescent/20 text-fluorescent/50";
        } else {
            return "bg-slate-800 text-white/50";
        }
    }

    return (
        <div className="my-3 mx-2">
            <div className="grid grid-cols-3">
                <ArrowBack
                    className="fill-white/80 cursor-pointer my-auto"
                    onClick={() => router.back()}
                />

                {/* Timer */}
                <div
                    className="flex items-center justify-between gap-2 mx-auto w-[119px] h-[35px] my-auto
                            rounded-full border-fluorescent border-[1.5px] px-2"
                >
                    {/* Dot */}
                    <div className="rounded-full w-[5px] h-[5px] animate-custom-pulse bg-fluorescent" />

                    {/* Timer */}
                    <p className="text-white/90 text-sm">{formatTime(timer)}</p>

                    {/* Pause image */}
                    <Pause />
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
            <p className="text-white/90 text-xl mt-3">데드리프트</p>

            <div className="flex flex-col gap-2">
                {dummyPlanInfo.plans.map((plan, index) => (
                    <div
                        key={plan.order}
                        className={`grid grid-cols-3 py-4 px-3 rounded-xl
                        ${GetPlanStyle(plan.order)}`}
                    >
                        <p className={`w-full text-left`}>{plan.order} 세트</p>
                        <p className={`w-full text-center`}>{plan.rep} 회</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
