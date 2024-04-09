import React from "react";
import Task from "@/workout/_components/Task";

// const currentDate = new Date(); // 현재 로컬 시간

// const dummyList = [
//     {
//         type: "health",
//         level: "Intermediate",
//         duration: 45,
//         workoutCnt: 3,
//         dueDate: new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 3))
//     },
//     {
//         type: "swimming",
//         level: "Beginner",
//         duration: 20,
//         workoutCnt: 1,
//         dueDate: new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 3))
//     },
//     {
//         type: "football",
//         level: "Beginner",
//         duration: 60,
//         workoutCnt: 1,
//         dueDate: new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 3))
//     },
//     {
//         type: "football",
//         level: "Beginner",
//         duration: 60,
//         workoutCnt: 1,
//         dueDate: new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 3))
//     },
//     {
//         type: "football",
//         level: "Beginner",
//         duration: 60,
//         workoutCnt: 1,
//         dueDate: new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 3))
//     },
// ];

const page = () => {
    return (
        <>
            <p className="text-fluorescent font-bold mt-10">
                3 Remanining Tasks
            </p>
            <p className="text-left text-xs text-white">
                1h 55mins required to clear all the tasks
            </p>

            {/* <div className="space-y-2 mt-3 mb-6">
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
            </div> */}
        </>
    );
};

export default page;
