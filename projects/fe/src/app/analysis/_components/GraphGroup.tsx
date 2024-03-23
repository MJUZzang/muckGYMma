"use client";

import React, { useState } from "react";
import WeightChart from "@/app/analysis/_components/WeightChart";
import CalorieChart from "./CalorieChart";
import TimeChart from "./TimeGraph";

const GraphGroup = () => {
    const [selectedGraph, setSelectedGraph] = useState("Weight");

    return (
        <>
            <div className="flex flex-col items-center border-2 pt-5 rounded-lg">
                <div className="flex justify-center rounded-full border-2 w-fit text-base">
                    <span
                        className={`py-1 px-3 rounded-full
                        ${selectedGraph === "Weight" && "bg-gray-300"}`}
                        onClick={() => setSelectedGraph("Weight")}
                    >
                        Weight
                    </span>
                    <span
                        className={`py-1 px-3 rounded-full
                        ${selectedGraph === "Calorie" && "bg-gray-300"}`}
                        onClick={() => setSelectedGraph("Calorie")}
                    >
                        Calorie
                    </span>
                    <span
                        className={`py-1 px-3 rounded-full
                        ${selectedGraph === "Time" && "bg-gray-300"}`}
                        onClick={() => setSelectedGraph("Time")}
                    >
                        Time
                    </span>
                </div>
                <WeightChart
                    className={`${selectedGraph !== "Weight" && "hidden"}`}
                />
                <CalorieChart
                    className={`${selectedGraph !== "Calorie" && "hidden"}`}
                />
                <TimeChart
                    className={`${selectedGraph !== "Time" && "hidden"}`}
                />
            </div>
        </>
    );
};

export default GraphGroup;
