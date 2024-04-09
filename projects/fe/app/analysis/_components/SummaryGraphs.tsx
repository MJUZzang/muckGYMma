"use client";

import React, { useEffect, useState } from "react";
import WeightChart from "@/analysis/_components/WeightChart";
import CalorieChart from "@/analysis/_components/CalorieChart";
import TimeChart from "@/analysis/_components/TimeGraph";

const SummaryGraphs = () => {
    const [selectedGraph, setSelectedGraph] = useState("Weight");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <div className="flex flex-col items-center rounded-lg bg-white/15 backdrop-blur-lg">
                <p className="inline-block text-xl p-5 text-fluorescent font-semibold">
                    7-Day Summary
                </p>
                <div className="flex items-center rounded-full border-[1.5px] border-white/75 w-[260px] text-base">
                    <span
                        className={`w-1/3 h-full text-center py-1 px-3 rounded-full text-nowrap
                        ${
                            selectedGraph === "Weight" &&
                            "bg-fluorescent text-black/85 font-semibold"
                        }`}
                        onClick={() => setSelectedGraph("Weight")}
                    >
                        체중
                    </span>
                    <span
                        className={`w-1/3 h-full text-center py-1 px-3 rounded-full text-nowrap
                        ${
                            selectedGraph === "Calorie" &&
                            "bg-fluorescent text-black/85 font-semibold"
                        }`}
                        onClick={() => setSelectedGraph("Calorie")}
                    >
                        칼로리
                    </span>
                    <span
                        className={`w-1/3 h-full text-center py-1 px-3 rounded-full text-nowrap
                        ${
                            selectedGraph === "Time" &&
                            "bg-fluorescent text-black/85 font-semibold"
                        }`}
                        onClick={() => setSelectedGraph("Time")}
                    >
                        운동시간
                    </span>
                </div>

                {isClient && (
                    <>
                        <WeightChart
                            className={`${
                                selectedGraph !== "Weight" && "hidden"
                            }`}
                        />
                        {/* <CalorieChart
                    className={`${selectedGraph !== "Calorie" && "hidden"}`}
                />
                <TimeChart
                    className={`${selectedGraph !== "Time" && "hidden"}`}
                /> */}
                    </>
                )}
            </div>
        </>
    );
};

export default SummaryGraphs;
