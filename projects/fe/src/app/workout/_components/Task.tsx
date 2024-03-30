import React from "react";
import Muscle from "@/app/_images/Muscle";
import NavigateNext from "@/app/_images/NavigateNext";
import Swimming from "@/app/_images/Swimming";
import Football from "@/app/_images/Football";
import Tags from "@/app/workout/_components/Tags";

interface TaskProps {
    className?: string;
    type: string;
    level: string;
    duration: number;
    workoutCnt: number;
    dueDate: Date;
}

const Task: React.FC<TaskProps> = ({
    className,
    type,
    level,
    duration,
    workoutCnt,
    dueDate,
}) => {
    return (
        <div
            className={`py-2 px-2 rounded-xl paper-shadow
            flex justify-between gap-2 ${className}`}
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
                    <p className="text-gray-500 text-xs">
                        {duration} mins required to finish
                    </p>

                    <Tags time={dueDate} className="mt-2" />
                </div>
            </div>

            <NavigateNext
                width={35}
                hight={35}
                className="fill-orange1 my-auto"
            />
        </div>
    );
};

export default Task;
