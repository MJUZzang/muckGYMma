"use client";

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"));

const HeatMap = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="rounded-lg bg-white/15 backdrop-blur-lg">
            <p className="inline-block p-5 w-full text-center text-xl pb-5 text-app-blue font-semibold">
                Streak Chart
            </p>
            {isClient && (
                <Suspense fallback={<div>Loading...</div>}>
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
                                data: [
                                    30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61,
                                    61,
                                ],
                            },
                            {
                                name: "Tues",
                                data: [
                                    30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61,
                                    61,
                                ],
                            },
                            {
                                name: "Weds",
                                data: [
                                    30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61,
                                    61,
                                ],
                            },
                            {
                                name: "Thurs",
                                data: [
                                    30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61,
                                    61,
                                ],
                            },
                            {
                                name: "Fri",
                                data: [
                                    30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61,
                                    61,
                                ],
                            },
                            {
                                name: "Sat",
                                data: [
                                    30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61,
                                    61,
                                ],
                            },
                            {
                                name: "Sun",
                                data: [
                                    30, 61, 62, 65, 66, 66, 67, 61, 61, 61, 61,
                                    61,
                                ],
                            },
                        ]}
                        type="heatmap"
                        height={200}
                        width="100%"
                    />
                </Suspense>
            )}
        </div>
    );
};

export default HeatMap;
