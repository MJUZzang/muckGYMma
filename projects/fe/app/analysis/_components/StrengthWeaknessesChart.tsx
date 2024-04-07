"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";

const StrengthWeaknessesChart = () => {
    return (
        <div className="bg-white/15 backdrop-blur-lg rounded-lg">
            <p className="inline-block p-5 w-full text-center text-xl pb-5 text-fluorescent font-semibold">Strengh & Weaknesses</p>
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
            />
        </div>
    );
};

export default StrengthWeaknessesChart;
