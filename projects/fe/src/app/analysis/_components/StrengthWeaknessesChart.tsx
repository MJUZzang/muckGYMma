"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";

const StrengthWeaknessesChart = () => {
    return (
        <div className="border-2 rounded-lg">
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
