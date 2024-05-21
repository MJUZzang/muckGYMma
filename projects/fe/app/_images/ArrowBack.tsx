import React from "react";

interface ArrowBackProps {
    className?: string;
    onClick?: () => void;
    size?: number;
}

const ArrowBack: React.FC<ArrowBackProps> = ({
    className,
    onClick = () => {},
    size = 25,
}: ArrowBackProps) => {
    return (
        <svg
            onClick={onClick}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height={size}
            width={size}
        >
            <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
    );
};

export default ArrowBack;
