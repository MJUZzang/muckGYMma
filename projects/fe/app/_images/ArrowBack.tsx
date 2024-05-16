import React from "react";

interface ArrowBackProps {
    className?: string;
    onClick?: () => void;
}

const ArrowBack: React.FC<ArrowBackProps> = (props) => {
    return (
        <svg
            onClick={props.onClick}
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height="25"
            width="25"
        >
            <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
    );
};

export default ArrowBack;
