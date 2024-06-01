import React from "react";

interface ArrowUpProps {
    className?: string;
}

function ArrowUp({ className }: ArrowUpProps) {
    return (
        <svg
            className={`${className}`}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18.07 9.57L12 3.5L5.93 9.57"
                stroke="#171717"
                strokeWidth="1.5"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 20.5V3.67004"
                stroke="#171717"
                strokeWidth="1.5"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default ArrowUp;
