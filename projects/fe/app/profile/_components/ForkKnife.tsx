import React from "react";

interface ForkKnifeProps {
    className?: string;
    size?: number;
    color?: string;
}

function ForkKnife({ className, size = 24, color }: ForkKnifeProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${String(size - 14)} ${String(size - 14)}`}
            className={`${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_1222_6179)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.784668 0.0240479C1.19888 0.0240479 1.53467 0.359834 1.53467 0.774048V3.27405C1.53467 3.73818 1.71904 4.1833 2.04723 4.51148C2.19021 4.65447 2.35539 4.77015 2.53467 4.85519V0.774048C2.53467 0.359834 2.87045 0.0240479 3.28467 0.0240479C3.69888 0.0240479 4.03467 0.359834 4.03467 0.774048V4.85519C4.21542 4.76945 4.38034 4.65325 4.5221 4.51148C4.68461 4.34898 4.81351 4.15606 4.90146 3.94374C4.9894 3.73142 5.03467 3.50386 5.03467 3.27405V0.774048C5.03467 0.359834 5.37045 0.0240479 5.78467 0.0240479C6.19888 0.0240479 6.53467 0.359834 6.53467 0.774048V3.27405C6.53467 3.70084 6.4506 4.12346 6.28728 4.51777C6.12395 4.91208 5.88456 5.27035 5.58277 5.57214C5.28097 5.87394 4.9227 6.11333 4.52839 6.27666C4.44841 6.30979 4.36726 6.33965 4.28516 6.36622V13.0001C4.28516 13.5523 3.83744 14.0001 3.28516 14.0001C2.73287 14.0001 2.28516 13.5523 2.28516 13.0001V6.36654C1.79997 6.20971 1.35384 5.93942 0.986571 5.57214C0.377078 4.96265 0.034668 4.136 0.034668 3.27405V0.774048C0.034668 0.359834 0.370454 0.0240479 0.784668 0.0240479ZM10.8349 0.0240479C9.06308 0.0240479 7.89383 1.75089 7.89383 3.51291C7.89383 4.91717 8.63646 6.29907 9.8349 6.80236V13.0001C9.8349 13.5524 10.2826 14.0001 10.8349 14.0001C11.3872 14.0001 11.8349 13.5524 11.8349 13.0001V6.80238C13.0334 6.29911 13.776 4.91719 13.776 3.51291C13.776 1.75089 12.6068 0.0240479 10.8349 0.0240479Z"
                    fill={color}
                />
            </g>
            <defs>
                <clipPath id="clip0_1222_6179">
                    <rect width={14} height={14} fill={color} />
                </clipPath>
            </defs>
        </svg>
    );
}

export default ForkKnife;
