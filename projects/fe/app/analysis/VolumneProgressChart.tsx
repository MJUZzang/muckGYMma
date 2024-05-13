"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"));

const VolumneProgressChart = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="bg-white/15 backdrop-blur-lg rounded-lg">
            <p className="inline-block p-5 w-full text-center text-xl pb-5 text-app-blue font-semibold">
                Volumne Progress
            </p>
            {isClient && (
                <Suspense fallback={<div>Loading...</div>}>
                    <ReactApexChart
                        options={{
                            chart: {
                                type: "bar",
                                height: 350,
                            },
                            plotOptions: {
                                bar: {
                                    horizontal: false,
                                    columnWidth: "55%",
                                },
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            stroke: {
                                show: true,
                                width: 2,
                                colors: ["transparent"],
                            },
                            xaxis: {
                                categories: [
                                    "Back",
                                    "Chest",
                                    "Shoulder",
                                    "Leg",
                                ],
                            },
                            yaxis: {
                                title: {
                                    text: "$ (thousands)",
                                },
                            },
                            fill: {
                                opacity: 1,
                            },
                            tooltip: {
                                y: {
                                    formatter: function (val) {
                                        return "$ " + val + " thousands";
                                    },
                                },
                            },
                        }}
                        series={[
                            {
                                name: "2 weeks ago",
                                data: [44, 55, 57, 56],
                            },
                            {
                                name: "1 week ago",
                                data: [76, 85, 101, 98],
                            },
                            {
                                name: "This week",
                                data: [35, 41, 36, 26],
                            },
                        ]}
                        type="bar"
                        width="100%"
                        height={350}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default VolumneProgressChart;
