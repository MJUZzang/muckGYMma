import React from "react";
import Task from "@/app/workout/_components/Task";
import Workout from "../_images/Workout";

const dummyList = [
    {
        type: "health",
        level: "Intermediate",
        duration: 45,
        workoutCnt: 3,
        dueDate: new Date(new Date().getTime() + 30 * 60000),
    },
    {
        type: "swimming",
        level: "Beginner",
        duration: 20,
        workoutCnt: 1,
        dueDate: new Date(new Date().getTime() + 30 * 60000),
    },
    {
        type: "football",
        level: "Beginner",
        duration: 60,
        workoutCnt: 1,
        dueDate: new Date(new Date().getTime() + 3 * 30 * 60000),
    },
    {
        type: "football",
        level: "Beginner",
        duration: 60,
        workoutCnt: 1,
        dueDate: new Date(new Date().getTime() + 25 * 60 * 60000),
    },
    {
        type: "football",
        level: "Beginner",
        duration: 60,
        workoutCnt: 1,
        dueDate: new Date(new Date().getTime() + 55 * 60 * 60000),
    },
];

const page = () => {
    return (
        <>
            <Workout 
            className="mt-7 mb-10"
            />
            <p className="text-gray-800">3 Remanining Tasks</p>
            <p className="text-left text-xs">
                1h 55mins required to clear all the tasks
            </p>

            <div className="space-y-3 mt-3 bg-white mb-6">
                {dummyList.map((task, index) => (
                    <Task
                        key={index}
                        type={task.type}
                        level={task.level}
                        duration={task.duration}
                        workoutCnt={task.workoutCnt}
                        dueDate={task.dueDate}
                    />
                ))}
            </div>
        </>
    );
};

export default page;
