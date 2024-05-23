"use client";

import React, { useEffect, useState } from "react";
import WeightChart from "@/main/analysis/_components/WeightChart";
import CalorieChart from "@/main/analysis/_components/CalorieChart";
import TimeChart from "@/main/analysis/_components/TimeGraph";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

function getButtonStyle(selectedGraph: string, graphName: string) {
    return `w-1/3 h-full text-center py-1 px-3 rounded-full text-nowrap
    ${
        selectedGraph === graphName
            ? "bg-app-blue text-app-inverted-font-1 font-semibold"
            : ""
    }`;
}

const SummaryGraphs = () => {
    const [selectedGraph, setSelectedGraph] = useState("Weight");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <div
                className={`flex flex-col items-center rounded-xl bg-app-bg-1 shadow-lg ${notoSansKr.className}`}
            >
                <p className="inline-block text-lg p-5 text-blue-400 font-semibold">
                    최근 30일 요약
                </p>
                <div
                    className="flex items-center rounded-full border-[1.5px] border-white/75 
                    bg-app-bg-1 shadow-md w-[260px] text-base"
                >
                    <span
                        className={`w-1/3 h-full text-center py-1 px-3 rounded-full text-nowrap transition-colors duration-500
                        ${getButtonStyle(selectedGraph, "Weight")}`}
                        onClick={() => setSelectedGraph("Weight")}
                    >
                        체중
                    </span>
                    <span
                        className={`w-1/3 h-full text-center py-1 px-3 rounded-full text-nowrap transition-colors duration-500
                        ${getButtonStyle(selectedGraph, "Calorie")}`}
                        onClick={() => setSelectedGraph("Calorie")}
                    >
                        칼로리
                    </span>
                    <span
                        className={`w-1/3 h-full text-center py-1 px-3 rounded-full text-nowrap transition-colors duration-500
                        ${getButtonStyle(selectedGraph, "Time")}`}
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
                        <CalorieChart
                            className={`${
                                selectedGraph !== "Calorie" && "hidden"
                            }`}
                        />
                        <TimeChart
                            className={`${
                                selectedGraph !== "Time" && "hidden"
                            }`}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default SummaryGraphs;
