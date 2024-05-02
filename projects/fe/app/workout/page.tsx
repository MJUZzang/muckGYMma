"use client";

import React, { useEffect } from "react";
import Task from "@/workout/_components/Task";

const currentDate = new Date(); // 현재 로컬 시간

const dummyList = [
    {
        type: "health",
        level: "Intermediate",
        duration: 45,
        workoutCnt: 3,
        dueDate: new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 3
            )
        ),
    },
    {
        type: "swimming",
        level: "Beginner",
        duration: 20,
        workoutCnt: 1,
        dueDate: new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 3
            )
        ),
    },
    {
        type: "football",
        level: "Beginner",
        duration: 60,
        workoutCnt: 1,
        dueDate: new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 3
            )
        ),
    },
    {
        type: "football",
        level: "Beginner",
        duration: 60,
        workoutCnt: 1,
        dueDate: new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 3
            )
        ),
    },
    {
        type: "football",
        level: "Beginner",
        duration: 60,
        workoutCnt: 1,
        dueDate: new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 3
            )
        ),
    },
    {
        type: "football",
        level: "Beginner",
        duration: 60,
        workoutCnt: 1,
        dueDate: new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 3
            )
        ),
    },
    {
        type: "football",
        level: "Beginner",
        duration: 60,
        workoutCnt: 1,
        dueDate: new Date(
            Date.UTC(
                currentDate.getUTCFullYear(),
                currentDate.getUTCMonth(),
                currentDate.getUTCDate() + 3
            )
        ),
    },
];

function GetBgColor(index: number) {
    const remain = index % 3;
    if (remain === 0) return "bg-[#13231d]";
    if (remain === 1) return "bg-white/45";
    return "bg-fluorescent/20";
}

function GetZIndex(index: number) {
    const remain = index % 3;
    if (remain === 0) return "z-[10]";
    if (remain === 1) return "z-[20]";
    return "z-[30]";
}

const Page = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-show-task");
                }
            });
        });

        const taskElements = document.querySelectorAll(".task");
        taskElements.forEach((element) => {
            observer.observe(element);
        });
    }, []);

    return (
        <div>
            <div className="space-y-3 mt-3 mb-6 h-full">
                {dummyList.map((task, index) => (
                    <Task
                        key={index}
                        type={task.type}
                        level={task.level}
                        duration={task.duration}
                        workoutCnt={task.workoutCnt}
                        dueDate={task.dueDate}
                        designType={index % 3}
                        className={`task py-6 translate-x-[-100%] opacity-0 blur-[5px] ${GetBgColor(
                            index
                        )} ${GetZIndex(index)}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
