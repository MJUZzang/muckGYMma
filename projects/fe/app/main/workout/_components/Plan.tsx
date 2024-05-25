"use client";

import React, { use, useEffect, useState } from "react";
import Muscle from "@/_images/Muscle";
import Swimming from "@/_images/Swimming";
import Football from "@/_images/Football";
import { timeUntilSevenDaysLater } from "@/main/workout/_utils/LeftTime";

import { Dosis, Jua, Noto_Sans } from "next/font/google";
import { PlanInfo } from "@/_types/Plan";

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: "400",
});

const dosis = Dosis({ subsets: ["latin"], weight: "400" });
const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});

function GetIcon(type: string) {
    switch (type) {
        case "수영":
            return <Swimming />;
        case "축구":
            return <Football />;
        default:
            return <Muscle />;
    }
}

interface PlanProps {
    className?: string;
    plan: PlanInfo;
}

const Plan: React.FC<PlanProps> = ({ className, plan }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeUntilSevenDaysLater(plan.createdAt!));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`py-2 pl-5 pr-5 rounded-[2rem] backdrop-blur-xl cursor-pointer 
            bg-app-bg-1 hover:bg-app-bg-3
            flex justify-between items-center gap-5 ${className}`}
        >
            <div>{GetIcon(plan.name!)}</div>

            <div className="basis-full flex justify-between items-center">
                <div className={`${jua.className} text-app-font-2`}>
                    <p className={`text-xl text-nowrap`}>{plan.name}</p>

                    <p className="mt-3 text-sm">
                        소멸되기 까지 {timeLeft} 남음
                    </p>

                    <div
                        className={`w-fit mt-1 px-3 py-2 rounded-full bg-app-blue 
                            text-sm text-app-inverted-font`}
                    >
                        {plan.time}분 소요
                    </div>
                </div>
            </div>

            <div className="text-center font-semibold">
                <p className={`text-app-font-2 ${dosis.className}`}>
                    {plan.time}
                </p>
                <p className={`text-app-font-2 ${notoSans.className}`}>kcal</p>
            </div>
        </div>
    );
};

export default Plan;
