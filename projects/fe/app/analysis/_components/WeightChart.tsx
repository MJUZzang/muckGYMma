"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";

interface WeightChartProps {
    className?: string;
}

const WeightChart: React.FC<WeightChartProps> = (props) => {
    return (
        <ReactApexChart
            className={`w-full ${props.className}`}
            options={{
                chart: {
                    height: 350,
                    type: "line",
                    dropShadow: {
                        enabled: true,
                        color: "#000",
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ["#77B6EA"],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: "smooth",
                },
                title: {
                    text: "체중",
                    align: "left",
                    style: {
                        color: "#fff",
                    },
                },
                grid: {
                    borderColor: "#e7e7e7",
                    row: {
                        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                        opacity: 0.5,
                    },
                },
                markers: {
                    size: 1,
                },
                xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                    ],
                    title: {
                        text: "월별 기록",
                    },
                    labels: {
                        style: {
                            colors: "#fff",
                        },
                    },
                },
                yaxis: {
                    title: {
                        text: "Weight (kg)",
                        style: {
                            color: "#fff",
                        },
                    },
                    min: 60,
                    max: 70,
                    labels: {
                        style: {
                            colors: "#fff",
                        },
                    },
                },
                legend: {
                    position: "top",
                    horizontalAlign: "right",
                    floating: true,
                    offsetY: -25,
                    offsetX: -5,
                },
            }}
            series={[
                {
                    name: "High - 2013",
                    data: [63, 61, 62, 65, 66, 66, 67],
                },
            ]}
            type="line"
            height={350}
        />
    );
};

export default WeightChart;
