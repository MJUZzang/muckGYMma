import React from "react";

interface ArrowDownProps {
    className?: string;
}

const ArrowDown: React.FC<ArrowDownProps> = (props) => {
    return (
        <svg
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
        >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
    );
};

export default ArrowDown;
