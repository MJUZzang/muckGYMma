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

function GetTagDesign(type: number) {
    switch (type) {
        case 0:
            return "bg-fluorescent text-black";
        case 1:
            return "bg-black/60 text-white";
        case 2:
            return "bg-white text-black";
    }
}

function GetTextColor(designType: number) {
    switch (designType) {
        case 0:
            return "text-white/90";
        case 1:
            return "text-black/80";
        case 2:
            return "text-fluorescent";
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
            className={`py-2 pl-2 pr-5 rounded-[2rem] backdrop-blur-xl cursor-pointer 
            hover:bg-white/20
            flex justify-between items-center gap-3 ${className}`}
        >
            <div>{GetIcon(type)}</div>

            <div className="basis-full flex justify-between items-center">
                <div
                    className={`flex flex-col justify-center ${
                        jua.className
                    } ${GetTextColor(designType)}`}
                >
                    <p className={`${jua.className} text-xl text-nowrap`}>
                        {type === "health" && `Gym Workout`}
                        {type === "swimming" && `Swimming`}
                        {type === "football" && `Football`}
                    </p>

                    <p className="">{timeLeft} left</p>

                    <div
                        className={`${GetTagDesign(
                            designType
                        )} w-fit px-2 py-1 rounded-full mt-1`}
                    >
                        {duration}분 소요
                    </div>
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
