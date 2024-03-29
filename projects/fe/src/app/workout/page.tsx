import React from "react";
import Task from "@/app/workout/_components/Task";

const dummyList = [
    {
        type: "health",
        level: "Intermediate",
        duration: 45,
        workoutCnt: 3,
    },
    {
        type: "swimming",
        level: "Beginner",
        duration: 30,
        workoutCnt: 1,
    },
    {
        type: "football",
        level: "Beginner",
        duration: 30,
        workoutCnt: 1,
    },
];

const Workout = () => {
    return (
        <div className="mx-1 space-y-10">
            <div className="border-2 border-gray-700 rounded-lg p-1">
                <p>3 Remanining Tasks</p>
                <p className="text-right text-xs">
                    1h 55mins required to clear all the tasks
                </p>

                <div className="space-y-1">
                    {dummyList.map((task, index) => (
                        <Task
                            key={index}
                            type={task.type}
                            level={task.level}
                            duration={task.duration}
                            workoutCnt={task.workoutCnt}
                        />
                    ))}
                </div>
            </div>

            <div className="border-2 border-gray-700 rounded-lg p-1">
                <p>List of completed tasks in a row!</p>
                <p className="text-right text-xs">1h 55mins spent till now</p>

                <div className="space-y-1">
                    {dummyList.map((task, index) => (
                        <Task
                            key={index}
                            type={task.type}
                            level={task.level}
                            duration={task.duration}
                            workoutCnt={task.workoutCnt}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Workout;
