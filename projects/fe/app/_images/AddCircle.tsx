import React from "react";

interface AddCircleProps {
    className?: string;
    size?: number;
}

function AddCircle({
    className = "stroke-[#171717]",
    size = 24,
}: AddCircleProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 12H16"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 16V8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default AddCircle;
