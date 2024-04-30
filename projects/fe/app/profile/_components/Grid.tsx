import React from "react";

interface GridProps {
    className?: string;
    size?: number;
    color?: string;
}

function Grid({ size = 24, className, color }: GridProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${String(size - 6)} ${String(size - 6)}`}
            className={`${className}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                fill={color}
            />
            <path
                d="M22 9.25H2.03C1.62 9.25 1.28 8.91 1.28 8.5C1.28 8.09 1.62 7.75 2.03 7.75H22C22.41 7.75 22.75 8.09 22.75 8.5C22.75 8.91 22.41 9.25 22 9.25Z"
                fill={color}
            />
            <path
                d="M22 16.25H2.03C1.62 16.25 1.28 15.91 1.28 15.5C1.28 15.09 1.62 14.75 2.03 14.75H22C22.41 14.75 22.75 15.09 22.75 15.5C22.75 15.91 22.41 16.25 22 16.25Z"
                fill={color}
            />
            <path
                d="M8.50999 22.74C8.09999 22.74 7.75999 22.4 7.75999 21.99V2.00999C7.75999 1.59999 8.09999 1.25999 8.50999 1.25999C8.91999 1.25999 9.25999 1.59999 9.25999 2.00999V21.98C9.25999 22.4 8.92999 22.74 8.50999 22.74Z"
                fill={color}
            />
            <path
                d="M15.51 22.74C15.1 22.74 14.76 22.4 14.76 21.99V2.00999C14.76 1.59999 15.1 1.25999 15.51 1.25999C15.92 1.25999 16.26 1.59999 16.26 2.00999V21.98C16.26 22.4 15.93 22.74 15.51 22.74Z"
                fill={color}
            />
        </svg>
    );
}

export default Grid;
