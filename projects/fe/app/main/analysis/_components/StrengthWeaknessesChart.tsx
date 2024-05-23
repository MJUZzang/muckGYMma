"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"));

const StrengthWeaknessesChart = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="bg-white/15 backdrop-blur-lg rounded-lg">
            <p className="inline-block p-5 w-full text-center text-xl pb-5 text-app-blue font-semibold">
                Strengh & Weaknesses
            </p>
            {isClient && (
                <Suspense fallback={<div>Loading...</div>}>
                    <ReactApexChart
                        options={{
                            chart: {
                                height: 350,
                                type: "radar",
                            },
                            title: {
                                text: "",
                            },
                            xaxis: {
                                categories: [
                                    "Back",
                                    "Chest",
                                    "Shoulder",
                                    "Leg",
                                    "Biceps",
                                    "Triceps",
                                    "Core",
                                ],
                            },
                        }}
                        series={[
                            {
                                name: "Series 1",
                                data: [80, 50, 30, 40, 100, 20, 70],
                            },
                        ]}
                        type="radar"
                        height={350}
                        width="100%"
                    />
                </Suspense>
            )}
        </div>
    );
};

export default StrengthWeaknessesChart;
