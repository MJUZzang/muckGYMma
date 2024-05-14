import React from "react";

interface HashProps {
    className?: string;
    size?: number;
}

function Hash({ className, size = 24 }: HashProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${String(size)} ${String(size)}`}
            className={`${className}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 16H4M20 8H4M6.66667 20L9.33333 4M14.6667 20L17.3333 4"
                strokeWidth={1.8}
                strokeLinecap="round"
            />
        </svg>
    );
}

export default Hash;
