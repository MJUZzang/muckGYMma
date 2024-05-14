"use client";

import React, { use, useEffect, useState } from "react";
import Muscle from "@/_images/Muscle";
import NavigateNext from "@/_images/NavigateNext";
import Swimming from "@/_images/Swimming";
import Football from "@/_images/Football";
import { CaclLeftTime } from "@/workout/_utils/LeftTime";

import { Dosis, Jua, Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });
const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});

function GetIcon(type: string) {
    switch (type) {
        case "health":
            return <Muscle />;
        case "swimming":
            return <Swimming />;
        case "football":
            return <Football />;
    }
}

interface TaskProps {
    className?: string;
    type: string;
    level: string;
    duration: number;
    workoutCnt: number;
    dueDate: Date;
    designType: number;
}

const Task: React.FC<TaskProps> = ({
    className,
    type,
    level,
    duration,
    workoutCnt,
    dueDate,
    designType,
}) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(CaclLeftTime(dueDate));
        }, 1000);
        return () => clearInterval(interval);
    }, [dueDate]);

    return (
        <div
            className={`py-2 pl-5 pr-5 rounded-[2rem] backdrop-blur-xl cursor-pointer 
            bg-app-bg-1 hover:bg-app-bg-3
            flex justify-between items-center gap-5 ${className}`}
        >
            <div>{GetIcon(type)}</div>

            <div className="basis-full flex justify-between items-center">
                <div className={`${jua.className} text-app-font-2`}>
                    <p className={`text-xl text-nowrap`}>
                        {type === "health" && `헬스`}
                        {type === "swimming" && `수영`}
                        {type === "football" && `축구`}
                    </p>

                    <p className="mt-3 text-sm">소멸되기 까지 {timeLeft} 남음</p>

                    <div
                        className={`w-fit mt-1 px-3 py-2 rounded-full bg-app-blue 
                            text-sm text-app-inverted-font`}
                    >
                        {duration}분 소요
                    </div>
                </div>
            </div>

            <div className="text-center font-semibold">
                <p className={`text-app-font-2 ${dosis.className}`}>950</p>
                <p className={`text-app-font-2 ${notoSans.className}`}>kcal</p>
            </div>
        </div>
    );
};

export default Task;
