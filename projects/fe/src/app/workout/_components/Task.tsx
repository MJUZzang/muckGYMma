import React from "react";
import Muscle from "@/app/_images/Muscle";
import NavigateNext from "@/app/_images/NavigateNext";
import Swimming from "@/app/_images/Swimming";
import Football from "@/app/_images/Football";

interface TaskProps {
    className?: string;
    type: string;
    level: string;
    duration: number;
    workoutCnt: number;
}

const Task:React.FC<TaskProps> = ({
    className,
    type,
    level,
    duration,
    workoutCnt
}) => {
    return (
        <div
            className={`border-2 border-xl border-gray-700 rounded-lg py-1 px-2
            flex justify-between items-center gap-2 ${className}`}
        >
            <div>
                {type === "health" && <Muscle />}
                {type === "swimming" && <Swimming />}
                {type === "football" && <Football />}
            </div>

            <div className="basis-full flex justify-between items-center">
                <div className="flex flex-col justify-center">
                    <p className="text-black text-nowrap">
                        {type === "health" && `${workoutCnt} types of workouts`}
                        {type === "swimming" && `Swimming`}
                        {type === "football" && `Football`}
                    </p>
                    <p className="text-gray-500 text-xs">Level: {level}</p>
                </div>

                <p>{duration} mins</p>
            </div>

            <NavigateNext width={35} hight={35} />
        </div>
    );
};

export default Task;
