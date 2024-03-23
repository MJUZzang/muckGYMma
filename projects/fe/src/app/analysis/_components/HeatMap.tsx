"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";

const HeatMap = () => {
    return (
        <div className="border-2 rounded-lg">
            <ReactApexChart
                options={{
                    chart: {
                        height: 350,
                        type: "heatmap",
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    colors: ["#008FFB"],
                    title: {
                        text: "2023-2024",
                    },
                }}
                series={[
                    {
                        name: "Mon",
                        data: [30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61, 61],
                    },
                    {
                        name: "Tues",
                        data: [30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61, 61],
                    },
                    {
                        name: "Weds",
                        data: [30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61, 61],
                    },
                    {
                        name: "Thurs",
                        data: [30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61, 61],
                    },
                    {
                        name: "Fri",
                        data: [30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61, 61],
                    },
                    {
                        name: "Sat",
                        data: [30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61, 61],
                    },
                    {
                        name: "Sun",
                        data: [30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61, 61],
                    },
                ]}
                type="heatmap"
                height={200}
            />
        </div>
    );
};

export default HeatMap;
