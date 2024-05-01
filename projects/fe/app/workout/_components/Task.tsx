"use client";

import React, { use, useEffect, useState } from "react";
import Muscle from "@/_images/Muscle";
import NavigateNext from "@/_images/NavigateNext";
import Swimming from "@/_images/Swimming";
import Football from "@/_images/Football";
import { CaclLeftTime } from "@/workout/_utils/LeftTime";

import { Dosis, Jua } from "next/font/google";

const dosis = Dosis({ subsets: ["latin"] });
const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});

interface TaskProps {
    className?: string;
    type: string;
    level: string;
    duration: number;
    workoutCnt: number;
    dueDate: Date;
}

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

const Task: React.FC<TaskProps> = ({
    className,
    type,
    level,
    duration,
    workoutCnt,
    dueDate,
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
            className={`py-2 pl-2 pr-5 rounded-[2rem] backdrop-blur-xl cursor-pointer
            hover:bg-white/20
            flex justify-between items-center gap-2 ${className}`}
        >
            <div>{GetIcon(type)}</div>

            <div className="basis-full flex justify-between items-center">
                <div className="flex flex-col justify-center">
                    <p className="text-fluorescent text-nowrap">
                        {type === "health" && `Gym Workout`}
                        {type === "swimming" && `Swimming`}
                        {type === "football" && `Football`}
                    </p>

                    <p className="text-white">{timeLeft} left</p>
                </div>
            </div>

            <div className="">
                <p className={`text-white/90 ${dosis.className}`}>950</p>
                <p className={`text-white/90 ${jua.className}`}>kcal</p>
            </div>
            
            {/* <NavigateNext
                width={35}
                hight={35}
                className="fill-fluorescent my-auto"
            /> */}
        </div>
    );
};

export default Task;
