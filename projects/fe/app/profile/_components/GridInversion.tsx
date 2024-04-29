import React from "react";

interface Props {
    className?: string;
    size?: number;
    color?: string;
}

function GridInversion({ size = 24, className, color }: Props) {
    return (
        <svg
            width="39"
            height="39"
            viewBox={`0 0 23 23`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7.75 2V7.8H2C2 4.19 4.15 2.02 7.75 2Z" fill={color} />
            <path d="M22 7.8H16.25V2C19.85 2.02 22 4.19 22 7.8Z" fill={color} />
            <path
                d="M22 16.3C21.96 19.85 19.82 21.98 16.25 22V16.3H22Z"
                fill={color}
            />
            <path
                d="M7.75 16.3V22C4.18 21.98 2.04 19.85 2 16.3H7.75Z"
                fill={color}
            />
            <path d="M7.75 9.29999H2V14.8H7.75V9.29999Z" fill={color} />
            <path d="M22 9.29999H16.25V14.8H22V9.29999Z" fill={color} />
            <path d="M14.75 9.29999H9.25V14.8H14.75V9.29999Z" fill={color} />
            <path d="M14.75 2H9.25V7.8H14.75V2Z" fill={color} />
            <path d="M14.75 16.3H9.25V22H14.75V16.3Z" fill={color} />
        </svg>
    );
}

export default GridInversion;
