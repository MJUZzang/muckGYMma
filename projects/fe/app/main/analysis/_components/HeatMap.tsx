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
        <div className="rounded-lg bg-app-bg shadow-[0px_0px_9px_1px_rgba(0,0,0,0.1)] backdrop-blur-lg">
            <p className="inline-block p-5 w-full text-center text-base pb-5 text-app-font-3 font-semibold">
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
                                style: {
                                    color: "#595959",
                                },
                            },
                            xaxis: {
                                labels: {
                                    style: {
                                        colors: "#595959",
                                    },
                                },
                            },
                            yaxis: {
                                labels: {
                                    style: {
                                        colors: "#595959",
                                    },
                                },
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
