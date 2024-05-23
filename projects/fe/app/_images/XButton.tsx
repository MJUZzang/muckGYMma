import React from "react";

interface XButtonProps {
    className?: string;
    size?: number;
    onClick?: () => void;
}
function XButton({
    className = "stroke-[#222222]",
    size = 24,
    onClick = () => {},
}: Readonly<XButtonProps>) {
    return (
        <svg
            onClick={onClick}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18 6L6 18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
            />
            <path
                d="M6 6L18 18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
            />
        </svg>
    );
}

export default XButton;
